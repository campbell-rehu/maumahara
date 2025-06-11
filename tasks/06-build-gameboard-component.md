# Task 06: Build GameBoard component with grid layouts

## Priority: High

## Description
Create the main game board component that dynamically renders card grids based on difficulty level.

## Grid Configurations
- **Easy**: 2 rows × 3 columns = 6 cards (3 pairs)
- **Medium**: 4 rows × 4 columns = 16 cards (8 pairs)
- **Hard**: 4 rows × 5 columns = 20 cards (10 pairs)

## Component Requirements
```typescript
interface GameBoardProps {
  difficulty: 'Easy' | 'Medium' | 'Hard';
  onGameComplete: () => void;
}
```

## Features
- Dynamic grid layout based on difficulty
- Card shuffle algorithm for random placement
- Responsive sizing to fit all screen sizes
- Proper spacing between cards
- State management for flipped/matched cards
- Game completion detection

## Implementation Details
- Use React Native's FlatList or custom grid
- Calculate card size based on screen dimensions
- Implement Fisher-Yates shuffle for randomization
- Track game state (flipped cards, matches, moves)
- Prevent interaction during card flip animations

## Acceptance Criteria
- [ ] Grid renders correctly for all difficulty levels
- [ ] Cards are properly shuffled on each game
- [ ] Layout is responsive on different screen sizes
- [ ] Game state is properly managed
- [ ] Completion detection triggers celebration
- [ ] No layout issues or card overlap

## Performance Considerations
- Optimize re-renders during gameplay
- Efficient card flip state management
- Smooth scrolling if needed on smaller screens