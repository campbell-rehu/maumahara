import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../constants/colors';
import { ANIMALS, Animal } from '../constants/animals';

interface GameBoardProps {
  difficulty: 'easy' | 'medium' | 'hard';
  onGameComplete: (score: number, time: number, mistakes: number) => void;
}

interface Card {
  id: string;
  animalId: string;
  type: 'english' | 'maori';
  isFlipped: boolean;
  isMatched: boolean;
}

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
  const [cards, setCards] = useState<Card[]>([]);
  const [flippedCards, setFlippedCards] = useState<string[]>([]);
  const [matchedCards, setMatchedCards] = useState<string[]>([]);
  const [mistakes, setMistakes] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const gridConfig = GRID_CONFIGS[difficulty];

  // Fisher-Yates shuffle algorithm
  const shuffleArray = useCallback(<T,>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }, []);

  // Initialize cards for the game
  const initializeCards = useCallback(() => {
    const selectedAnimals = ANIMALS.slice(0, gridConfig.pairs);
    const cardPairs: Card[] = [];

    selectedAnimals.forEach((animal) => {
      // Create English card
      cardPairs.push({
        id: `${animal.id}-english`,
        animalId: animal.id,
        type: 'english',
        isFlipped: false,
        isMatched: false,
      });

      // Create Māori card
      cardPairs.push({
        id: `${animal.id}-maori`,
        animalId: animal.id,
        type: 'maori',
        isFlipped: false,
        isMatched: false,
      });
    });

    // Shuffle the cards
    const shuffledCards = shuffleArray(cardPairs);
    setCards(shuffledCards);
    setFlippedCards([]);
    setMatchedCards([]);
    setMistakes(0);
    setTimeElapsed(0);
    setGameStarted(false);
    setIsProcessing(false);
  }, [gridConfig.pairs, shuffleArray]);

  // Initialize cards when component mounts or difficulty changes
  useEffect(() => {
    initializeCards();
  }, [initializeCards]);

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (gameStarted && matchedCards.length < gridConfig.totalCards) {
      interval = setInterval(() => {
        setTimeElapsed((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [gameStarted, matchedCards.length, gridConfig.totalCards]);

  // Check for game completion
  useEffect(() => {
    if (matchedCards.length === gridConfig.totalCards && matchedCards.length > 0) {
      const score = Math.max(1000 - mistakes * 50 - timeElapsed * 2, 100);
      setTimeout(() => {
        onGameComplete(score, timeElapsed, mistakes);
      }, 1000);
    }
  }, [matchedCards.length, gridConfig.totalCards, mistakes, timeElapsed, onGameComplete]);

  // Handle card press
  const handleCardPress = useCallback((cardId: string) => {
    if (isProcessing || flippedCards.includes(cardId) || matchedCards.includes(cardId)) {
      return;
    }

    if (!gameStarted) {
      setGameStarted(true);
    }

    if (flippedCards.length === 0) {
      setFlippedCards([cardId]);
    } else if (flippedCards.length === 1) {
      setFlippedCards([...flippedCards, cardId]);
      setIsProcessing(true);

      // Check for match after a delay
      setTimeout(() => {
        const firstCard = cards.find(c => c.id === flippedCards[0]);
        const secondCard = cards.find(c => c.id === cardId);

        if (firstCard && secondCard && firstCard.animalId === secondCard.animalId) {
          // Match found
          setMatchedCards(prev => [...prev, firstCard.id, secondCard.id]);
        } else {
          // No match
          setMistakes(prev => prev + 1);
        }

        setFlippedCards([]);
        setIsProcessing(false);
      }, 1000);
    }
  }, [cards, flippedCards, matchedCards, isProcessing, gameStarted]);

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

  // Get card text
  const getCardText = (card: Card) => {
    const animal = ANIMALS.find(a => a.id === card.animalId);
    if (!animal) return '';
    return card.type === 'english' ? animal.english : animal.maori;
  };

  // Render card
  const renderCard = (card: Card) => {
    const isFlipped = flippedCards.includes(card.id) || matchedCards.includes(card.id);
    
    return (
      <Pressable
        key={card.id}
        testID={`card-${card.id}`}
        style={[
          styles.card,
          {
            width: cardDimensions.width,
            height: cardDimensions.height,
            backgroundColor: isFlipped ? COLORS.cardFront : COLORS.cardBack,
          },
          matchedCards.includes(card.id) && styles.matchedCard,
        ]}
        onPress={() => handleCardPress(card.id)}
        disabled={isProcessing}
      >
        <Text style={[
          styles.cardText,
          {
            color: isFlipped ? COLORS.text : 'transparent',
            fontSize: cardDimensions.width * 0.15,
          }
        ]}>
          {isFlipped ? getCardText(card) : '?'}
        </Text>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        
        <View style={styles.statsContainer}>
          <Text style={styles.statsText}>Time: {formatTime(timeElapsed)}</Text>
          <Text style={styles.statsText}>Mistakes: {mistakes}</Text>
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
          {cards.map(renderCard)}
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
  },
  card: {
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    marginRight: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  matchedCard: {
    backgroundColor: COLORS.success,
    opacity: 0.8,
  },
  cardText: {
    fontWeight: 'bold',
    textAlign: 'center',
    flexWrap: 'wrap',
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