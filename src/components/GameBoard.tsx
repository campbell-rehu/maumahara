import React, { useEffect, useCallback, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { COLORS } from "../constants/colors";
import { ANIMALS, Animal } from "../constants/animals";
import MemoryCard from "./MemoryCard";
import MaoriWordDisplay from "./MaoriWordDisplay";
import { useGameState, useCardMatching, useSoundEffects } from "../hooks";
import { GRID_CONFIGS, calculateCardDimensions, GridConfig } from "../utils/gridUtils";

interface GameBoardProps {
  difficulty: "easy" | "medium" | "hard";
  onGameComplete: (score: number, time: number, mistakes: number) => void;
}

// Card interface is now imported from hooks

export default function GameBoard({
  difficulty,
  onGameComplete,
}: GameBoardProps) {
  const navigation = useNavigation();
  const gridConfig = GRID_CONFIGS[difficulty];
  
  // State to track when to show "Ōrite!" message
  const [showMatchMessage, setShowMatchMessage] = useState(false);

  // Custom hooks
  const { gameState, actions, derived } = useGameState();
  const { handleCardPress, checkForMatch } = useCardMatching();
  const { playSound } = useSoundEffects();

  // Initialize cards when component mounts or difficulty changes
  useEffect(() => {
    actions.initializeGame(ANIMALS, gridConfig);
  }, [difficulty]); // Only re-initialize when difficulty changes

  // Timer is now handled by useGameState hook

  // Check for game completion
  useEffect(() => {
    if (gameState.gamePhase === "completed") {
      playSound("gameComplete");
      setTimeout(() => {
        onGameComplete(
          derived.score,
          gameState.timeElapsed,
          gameState.mistakes,
        );
      }, 1000);
    }
  }, [
    gameState.gamePhase,
    derived.score,
    gameState.timeElapsed,
    gameState.mistakes,
    onGameComplete,
    playSound,
  ]);

  // Handle card press with enhanced logic
  const onCardPress = useCallback(
    (cardId: string) => {
      const canFlip = derived.canFlipCard(cardId);

      if (!canFlip) {
        return;
      }

      playSound("cardFlip");
      actions.flipCard(cardId);

      // Check for match when second card is flipped
      if (gameState.flippedCards.length === 1) {
        actions.setProcessing(true);

        setTimeout(() => {
          const newFlippedCards = [...gameState.flippedCards, cardId];
          const matchResult = checkForMatch(newFlippedCards, gameState.cards);

          if (matchResult.isMatch) {
            playSound("match");
            setShowMatchMessage(true);
            actions.addMatch(matchResult.matchedCardIds);
            
            // Hide match message after 2 seconds
            setTimeout(() => {
              setShowMatchMessage(false);
            }, 2000);
          } else {
            playSound("mismatch");
            actions.addMistake();
          }

          actions.setProcessing(false);
        }, 1000);
      }
    },
    [
      derived,
      playSound,
      actions,
      gameState.flippedCards,
      gameState.cards,
      checkForMatch,
    ],
  );

  // Calculate card dimensions using utility function
  const cardDimensions = calculateCardDimensions(gridConfig);

  // Get Māori words for display
  const getMaoriWords = () => {
    const leftWord = gameState.firstSelection
      ? gameState.cards.find((c) => c.id === gameState.firstSelection)?.animal
          .maori
      : undefined;
    const rightWord = gameState.secondSelection
      ? gameState.cards.find((c) => c.id === gameState.secondSelection)?.animal
          .maori
      : undefined;

    return { leftWord, rightWord };
  };

  // Check if current selections are matched
  const areSelectionsMatched = () => {
    return Boolean(
      gameState.firstSelection &&
        gameState.secondSelection &&
        gameState.matchedCards.includes(gameState.firstSelection) &&
        gameState.matchedCards.includes(gameState.secondSelection),
    );
  };

  // Render card - memoized to prevent recreation on every render
  const renderCard = useCallback((card: any) => {
    const isFlipped =
      gameState.flippedCards.includes(card.id) ||
      gameState.matchedCards.includes(card.id);
    const isMatched = gameState.matchedCards.includes(card.id);

    // Determine selection order
    let selectionOrder: "first" | "second" | null = null;
    if (card.id === gameState.firstSelection) {
      selectionOrder = "first";
    } else if (card.id === gameState.secondSelection) {
      selectionOrder = "second";
    }

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
        selectionOrder={selectionOrder}
      />
    );
  }, [
    gameState.flippedCards,
    gameState.matchedCards,
    gameState.firstSelection,
    gameState.secondSelection,
    gameState.isProcessing,
    cardDimensions.width,
    cardDimensions.height,
    onCardPress,
  ]);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => {
            playSound("buttonPress");
            navigation.goBack();
          }}
        >
          <Text style={styles.backButtonText}>‹</Text>
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Maumahara</Text>

        <View style={styles.placeholder} />
      </View>

      {/* Māori Word Display */}
      <MaoriWordDisplay
        leftWord={getMaoriWords().leftWord}
        rightWord={getMaoriWords().rightWord}
        leftBorderColor={COLORS.firstSelection}
        rightBorderColor={COLORS.secondSelection}
        isMatched={showMatchMessage}
      />

      {/* Game Board */}
      <View style={styles.gameBoard}>
        <View
          style={[
            styles.grid,
            {
              width:
                gridConfig.cols * cardDimensions.width +
                (gridConfig.cols - 1) * 10,
              height:
                gridConfig.rows * cardDimensions.height +
                (gridConfig.rows - 1) * 10,
            },
          ]}
        >
          {gameState.cards.map(renderCard)}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  backButtonText: {
    color: COLORS.text,
    fontSize: 32,
    fontWeight: "300",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: COLORS.text,
  },
  placeholder: {
    width: 40,
  },
  gameBoard: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 50,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignContent: "space-between",
    gap: 10,
  },
});

