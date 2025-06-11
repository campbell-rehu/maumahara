import React, { useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../constants/colors';
import { ANIMALS, Animal } from '../constants/animals';
import MemoryCard from './MemoryCard';
import { useGameState, useCardMatching, useSoundEffects } from '../hooks';

interface GameBoardProps {
  difficulty: 'easy' | 'medium' | 'hard';
  onGameComplete: (score: number, time: number, mistakes: number) => void;
}

// Card interface is now imported from hooks

interface GridConfig {
  rows: number;
  cols: number;
  totalCards: number;
  pairs: number;
}

const GRID_CONFIGS: Record<string, GridConfig> = {
  easy: { rows: 2, cols: 3, totalCards: 6, pairs: 3 },
  medium: { rows: 4, cols: 4, totalCards: 16, pairs: 8 },
  hard: { rows: 4, cols: 5, totalCards: 20, pairs: 10 },
};

const { width, height } = Dimensions.get('window');

export default function GameBoard({ difficulty, onGameComplete }: GameBoardProps) {
  const navigation = useNavigation();
  const gridConfig = GRID_CONFIGS[difficulty];
  
  // Custom hooks
  const { gameState, actions, derived } = useGameState();
  const { handleCardPress, checkForMatch } = useCardMatching();
  const { playSound } = useSoundEffects();

  // Initialize cards for the game
  const initializeCards = useCallback(() => {
    actions.initializeGame(ANIMALS, gridConfig);
  }, [actions, gridConfig]);

  // Initialize cards when component mounts or difficulty changes
  useEffect(() => {
    initializeCards();
  }, [initializeCards]);

  // Timer is now handled by useGameState hook

  // Check for game completion
  useEffect(() => {
    if (gameState.gamePhase === 'completed') {
      playSound('gameComplete');
      setTimeout(() => {
        onGameComplete(derived.score, gameState.timeElapsed, gameState.mistakes);
      }, 1000);
    }
  }, [gameState.gamePhase, derived.score, gameState.timeElapsed, gameState.mistakes, onGameComplete, playSound]);

  // Handle card press with enhanced logic
  const onCardPress = useCallback((cardId: string) => {
    const canFlip = derived.canFlipCard(cardId);
    
    if (!canFlip) {
      return;
    }

    playSound('cardFlip');
    actions.flipCard(cardId);
    
    // Check for match when second card is flipped
    if (gameState.flippedCards.length === 1) {
      actions.setProcessing(true);
      
      setTimeout(() => {
        const newFlippedCards = [...gameState.flippedCards, cardId];
        const matchResult = checkForMatch(newFlippedCards, gameState.cards);
        
        if (matchResult.isMatch) {
          playSound('match');
          actions.addMatch(matchResult.matchedCardIds);
        } else {
          playSound('mismatch');
          actions.addMistake();
        }
        
        actions.setProcessing(false);
      }, 1000);
    }
  }, [
    derived, playSound, actions, gameState.flippedCards, 
    gameState.cards, checkForMatch
  ]);

  // Calculate card dimensions based on screen size
  const getCardDimensions = () => {
    const availableWidth = width - 40; // 20px padding on each side
    const availableHeight = height - 200; // Space for header and other UI
    
    const cardWidth = (availableWidth - (gridConfig.cols - 1) * 10) / gridConfig.cols;
    const cardHeight = (availableHeight - (gridConfig.rows - 1) * 10) / gridConfig.rows;
    
    // Ensure cards are not too small or too large
    const minSize = 60;
    const maxSize = 120;
    const size = Math.min(Math.max(Math.min(cardWidth, cardHeight), minSize), maxSize);
    
    return { width: size, height: size };
  };

  const cardDimensions = getCardDimensions();

  // Format time display
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Render card
  const renderCard = (card: any) => {
    const isFlipped = gameState.flippedCards.includes(card.id) || gameState.matchedCards.includes(card.id);
    const isMatched = gameState.matchedCards.includes(card.id);
    
    return (
      <MemoryCard
        key={card.id}
        cardId={card.id}
        animal={card.animal}
        isFlipped={isFlipped}
        isMatched={isMatched}
        onPress={() => onCardPress(card.id)}
        cardWidth={cardDimensions.width}
        cardHeight={cardDimensions.height}
        disabled={gameState.isProcessing}
      />
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.leftButtons}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => {
              playSound('buttonPress');
              navigation.goBack();
            }}
          >
            <Text style={styles.backButtonText}>← Back</Text>
          </TouchableOpacity>
          
          {gameState.gamePhase === 'playing' && (
            <TouchableOpacity
              style={[styles.backButton, { marginLeft: 8 }]}
              onPress={() => {
                playSound('buttonPress');
                actions.pauseGame();
              }}
            >
              <Text style={styles.backButtonText}>⏸️ Pause</Text>
            </TouchableOpacity>
          )}
          
          {gameState.gamePhase === 'paused' && (
            <TouchableOpacity
              style={[styles.backButton, { marginLeft: 8 }]}
              onPress={() => {
                playSound('buttonPress');
                actions.resumeGame();
              }}
            >
              <Text style={styles.backButtonText}>▶️ Resume</Text>
            </TouchableOpacity>
          )}
        </View>
        
        <View style={styles.statsContainer}>
          <Text style={styles.statsText}>Time: {formatTime(gameState.timeElapsed)}</Text>
          <Text style={styles.statsText}>Mistakes: {gameState.mistakes}</Text>
          <Text style={[styles.statsText, { fontSize: 12, opacity: 0.7 }]}>
            {gameState.gamePhase === 'paused' ? 'PAUSED' : 
             gameState.gamePhase === 'completed' ? 'COMPLETED' : 
             gameState.gamePhase === 'waiting' ? 'Tap to start' : 'Playing'}
          </Text>
        </View>
      </View>

      {/* Game Board */}
      <View style={styles.gameBoard}>
        <View style={[
          styles.grid,
          {
            width: gridConfig.cols * cardDimensions.width + (gridConfig.cols - 1) * 10,
            height: gridConfig.rows * cardDimensions.height + (gridConfig.rows - 1) * 10,
          }
        ]}>
          {gameState.cards.map(renderCard)}
        </View>
      </View>

      {/* Difficulty indicator */}
      <View style={styles.difficultyContainer}>
        <Text style={[styles.difficultyText, { color: COLORS[difficulty] }]}>
          {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)} Mode
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
  },
  leftButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    backgroundColor: COLORS.secondary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  backButtonText: {
    color: COLORS.textLight,
    fontSize: 16,
    fontWeight: '600',
  },
  statsContainer: {
    alignItems: 'flex-end',
  },
  statsText: {
    fontSize: 16,
    color: COLORS.text,
    fontWeight: '600',
    marginBottom: 4,
  },
  gameBoard: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignContent: 'space-between',
    gap: 10,
  },
  difficultyContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  difficultyText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});