import { useCallback, useRef } from 'react';
import { Card } from './useGameState';

export interface UseCardMatchingReturn {
  handleCardPress: (cardId: string, canFlip: boolean, onFlip: (cardId: string) => void, onMatch: (cardIds: string[]) => void, onMismatch: () => void) => void;
  checkForMatch: (flippedCards: string[], allCards: Card[]) => { isMatch: boolean; matchedCardIds: string[] };
}

export function useCardMatching(): UseCardMatchingReturn {
  const matchCheckTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const checkForMatch = useCallback((flippedCards: string[], allCards: Card[]) => {
    if (flippedCards.length !== 2) {
      return { isMatch: false, matchedCardIds: [] };
    }

    const [firstCardId, secondCardId] = flippedCards;
    const firstCard = allCards.find(c => c.id === firstCardId);
    const secondCard = allCards.find(c => c.id === secondCardId);

    if (!firstCard || !secondCard) {
      return { isMatch: false, matchedCardIds: [] };
    }

    const isMatch = firstCard.animal.id === secondCard.animal.id;
    const matchedCardIds = isMatch ? [firstCardId, secondCardId] : [];

    return { isMatch, matchedCardIds };
  }, []);

  const handleCardPress = useCallback((
    cardId: string,
    canFlip: boolean,
    onFlip: (cardId: string) => void,
    onMatch: (cardIds: string[]) => void,
    onMismatch: () => void
  ) => {
    if (!canFlip) {
      return;
    }

    // Clear any existing timeout
    if (matchCheckTimeoutRef.current) {
      clearTimeout(matchCheckTimeoutRef.current);
    }

    onFlip(cardId);
  }, []);

  return {
    handleCardPress,
    checkForMatch,
  };
}