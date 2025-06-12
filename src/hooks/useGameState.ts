import { useState, useCallback, useRef, useEffect } from 'react';
import { Animal } from '../constants/animals';

export type GamePhase = 'waiting' | 'playing' | 'paused' | 'completed';

export interface Card {
  id: string;
  animal: Animal;
  isFlipped: boolean;
  isMatched: boolean;
}

export interface GameState {
  cards: Card[];
  flippedCards: string[];
  matchedCards: string[];
  mistakes: number;
  timeElapsed: number;
  gamePhase: GamePhase;
  isProcessing: boolean;
  moveCount: number;
  firstSelection: string | null;
  secondSelection: string | null;
}

export interface GameConfig {
  rows: number;
  cols: number;
  totalCards: number;
  pairs: number;
}

export interface UseGameStateReturn {
  gameState: GameState;
  actions: {
    initializeGame: (animals: Animal[], config: GameConfig) => void;
    flipCard: (cardId: string) => void;
    pauseGame: () => void;
    resumeGame: () => void;
    resetGame: () => void;
    setProcessing: (processing: boolean) => void;
    addMatch: (cardIds: string[]) => void;
    addMistake: () => void;
    completeGame: () => void;
  };
  derived: {
    isGameWon: boolean;
    canFlipCard: (cardId: string) => boolean;
    score: number;
  };
}

const INITIAL_GAME_STATE: GameState = {
  cards: [],
  flippedCards: [],
  matchedCards: [],
  mistakes: 0,
  timeElapsed: 0,
  gamePhase: 'waiting',
  isProcessing: false,
  moveCount: 0,
  firstSelection: null,
  secondSelection: null,
};

// Fisher-Yates shuffle algorithm
const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export function useGameState(): UseGameStateReturn {
  const [gameState, setGameState] = useState<GameState>(INITIAL_GAME_STATE);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Timer management
  const startTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    timerRef.current = setInterval(() => {
      setGameState(prev => 
        prev.gamePhase === 'playing' 
          ? { ...prev, timeElapsed: prev.timeElapsed + 1 }
          : prev
      );
    }, 1000);
  }, []);

  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => stopTimer();
  }, [stopTimer]);

  // Start/stop timer based on game phase
  useEffect(() => {
    if (gameState.gamePhase === 'playing') {
      startTimer();
    } else {
      stopTimer();
    }
  }, [gameState.gamePhase, startTimer, stopTimer]);

  const actions = {
    initializeGame: useCallback((animals: Animal[], config: GameConfig) => {
      const selectedAnimals = animals.slice(0, config.pairs);
      const cardPairs: Card[] = [];

      selectedAnimals.forEach((animal) => {
        // Create first card of the pair
        cardPairs.push({
          id: `${animal.id}-1`,
          animal,
          isFlipped: false,
          isMatched: false,
        });

        // Create second card of the pair
        cardPairs.push({
          id: `${animal.id}-2`,
          animal,
          isFlipped: false,
          isMatched: false,
        });
      });

      // Shuffle the cards
      const shuffledCards = shuffleArray(cardPairs);
      
      setGameState({
        ...INITIAL_GAME_STATE,
        cards: shuffledCards,
        gamePhase: 'waiting',
      });
    }, []),

    flipCard: useCallback((cardId: string) => {
      setGameState(prev => {
        // Start game if it's the first card flipped
        const newGamePhase = prev.gamePhase === 'waiting' ? 'playing' : prev.gamePhase;
        
        // Update flipped cards
        const newFlippedCards = prev.flippedCards.includes(cardId) 
          ? prev.flippedCards 
          : [...prev.flippedCards, cardId];

        // Increment move count when flipping second card
        const newMoveCount = newFlippedCards.length === 2 && !prev.flippedCards.includes(cardId)
          ? prev.moveCount + 1
          : prev.moveCount;

        // Update selection tracking
        let firstSelection = prev.firstSelection;
        let secondSelection = prev.secondSelection;
        
        if (!prev.flippedCards.includes(cardId)) {
          if (prev.flippedCards.length === 0) {
            firstSelection = cardId;
            secondSelection = null;
          } else if (prev.flippedCards.length === 1) {
            secondSelection = cardId;
          }
        }

        return {
          ...prev,
          flippedCards: newFlippedCards,
          gamePhase: newGamePhase,
          moveCount: newMoveCount,
          firstSelection,
          secondSelection,
        };
      });
    }, []),

    pauseGame: useCallback(() => {
      setGameState(prev => ({ ...prev, gamePhase: 'paused' }));
    }, []),

    resumeGame: useCallback(() => {
      setGameState(prev => ({ ...prev, gamePhase: 'playing' }));
    }, []),

    resetGame: useCallback(() => {
      setGameState(prev => ({
        ...INITIAL_GAME_STATE,
        cards: prev.cards.map(card => ({
          ...card,
          isFlipped: false,
          isMatched: false,
        })),
      }));
    }, []),

    setProcessing: useCallback((processing: boolean) => {
      setGameState(prev => ({ ...prev, isProcessing: processing }));
    }, []),

    addMatch: useCallback((cardIds: string[]) => {
      setGameState(prev => ({
        ...prev,
        matchedCards: [...prev.matchedCards, ...cardIds],
        flippedCards: [],
        firstSelection: null,
        secondSelection: null,
      }));
    }, []),

    addMistake: useCallback(() => {
      setGameState(prev => ({
        ...prev,
        mistakes: prev.mistakes + 1,
        flippedCards: [],
        firstSelection: null,
        secondSelection: null,
      }));
    }, []),

    completeGame: useCallback(() => {
      setGameState(prev => ({ ...prev, gamePhase: 'completed' }));
    }, []),
  };

  const derived = {
    isGameWon: gameState.matchedCards.length === gameState.cards.length && gameState.cards.length > 0,
    
    canFlipCard: useCallback((cardId: string) => {
      return !gameState.isProcessing 
        && !gameState.flippedCards.includes(cardId) 
        && !gameState.matchedCards.includes(cardId)
        && gameState.flippedCards.length < 2
        && gameState.gamePhase !== 'paused'
        && gameState.gamePhase !== 'completed';
    }, [gameState]),

    score: Math.max(1000 - gameState.mistakes * 50 - gameState.timeElapsed * 2, 100),
  };

  // Auto-complete game when all cards are matched
  useEffect(() => {
    if (derived.isGameWon && gameState.gamePhase === 'playing') {
      actions.completeGame();
    }
  }, [derived.isGameWon, gameState.gamePhase, actions]);

  return {
    gameState,
    actions,
    derived,
  };
}