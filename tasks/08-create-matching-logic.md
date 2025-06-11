# Task 08: Create card matching logic and game state management

## Priority: High

## Description
Implement the core game logic for card matching, state management, and game flow.

## Game Rules
1. Player can flip two cards at a time
2. If cards match (same animal), they stay face up
3. If cards don't match, they flip back after 1 second
4. Game ends when all pairs are matched
5. No scoring system - focus on completion

## State Management
```typescript
interface GameState {
  cards: Card[];
  flippedIndices: number[];
  matchedPairs: string[];
  isChecking: boolean;
  moveCount: number;
  gameComplete: boolean;
}
```

## Core Functions
- `initializeGame()`: Set up cards with random positions
- `handleCardPress(index)`: Process card selection
- `checkForMatch()`: Compare two flipped cards
- `resetFlippedCards()`: Flip back non-matching cards
- `checkGameComplete()`: Detect when all pairs matched

## Game Flow
1. Initialize shuffled card array (each animal appears twice)
2. Handle first card flip
3. Handle second card flip
4. Check for match
5. Update game state
6. Trigger celebration on completion

## Acceptance Criteria
- [ ] Cards can be flipped by tapping
- [ ] Only two cards can be flipped at once
- [ ] Matching logic works correctly
- [ ] Non-matching cards flip back after delay
- [ ] Game completion is detected
- [ ] State updates are smooth and bug-free

## Edge Cases
- Prevent flipping already matched cards
- Prevent flipping during match checking
- Handle rapid tapping
- Ensure proper state reset for new games