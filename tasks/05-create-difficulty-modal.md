# Task 05: Create DifficultyModal component ✅ COMPLETED

## Priority: High

## Description
Implement a simple modal that appears after pressing Play, allowing users to select difficulty level.

## Difficulty Levels
- **Easy**: 2x3 grid (3 pairs) - Kurī, Ngeru, Hipi
- **Medium**: 4x4 grid (8 pairs) - Adds Kau, Poaka, Hōiho, Kākā, Kekeno
- **Hard**: 4x5 grid (10 pairs) - Adds Tūī, Kererū

## Design Requirements
- Modal overlay with semi-transparent background
- Three large, colorful buttons for difficulty selection
- Visual indicators for each level (grid icons or animal count)
- Child-friendly button design with clear labels
- Smooth animation for modal appearance

## Implementation
```typescript
interface DifficultyLevel {
  name: 'Easy' | 'Medium' | 'Hard';
  gridSize: { rows: number; cols: number };
  pairs: number;
  animals: string[];
  color: string; // Theme color for button
}
```

## Acceptance Criteria
- [x] ~~Modal appears smoothly after Play button press~~
- [x] ~~Three difficulty options clearly presented~~
- [x] ~~Visual feedback on button press~~
- [x] ~~Modal dismisses and navigates to game with selected difficulty~~
- [x] ~~Difficulty level passed correctly to GameScreen~~

## Visual Design
- Easy: Green theme, friendly appearance
- Medium: Orange theme, balanced challenge
- Hard: Red/Purple theme, exciting challenge
- Icons or numbers showing pair count
- Large touch targets for child-friendly interaction