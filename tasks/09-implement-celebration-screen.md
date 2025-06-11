# Task 09: Design and implement CelebrationScreen

## Priority: High

## Description
Create an engaging celebration screen that appears when players complete the game, featuring cultural elements and positive reinforcement.

## Screen Elements
- Congratulations message in Te Reo and English
- "Ka pai!" (Well done!) as primary message
- "You matched all the animals!" as secondary
- Animated celebration effects
- Play Again button
- Simple stats (optional): time taken or moves made

## Cultural Animation Ideas
- Floating koru (spiral) patterns
- Gentle particle effects in earth tones
- Pulsing congratulations text
- Māori-inspired celebration visuals

## Implementation
```typescript
interface CelebrationScreenProps {
  difficulty: 'Easy' | 'Medium' | 'Hard';
  moveCount?: number;
  onPlayAgain: () => void;
}
```

## Visual Design
- Warm, celebratory color scheme
- Large "Ka pai!" text with animation
- Confetti or star effects in earth tones
- Play Again button prominent at bottom
- Child-friendly, joyful atmosphere

## Acceptance Criteria
- [ ] Screen displays immediately on game completion
- [ ] Animations are smooth and celebratory
- [ ] Te Reo Māori message is prominent
- [ ] Play Again navigates back to welcome screen
- [ ] Visual effects enhance celebration feel
- [ ] Screen is visually rewarding for children

## Animation Timing
- Immediate appearance with fade-in
- Text animations: 0.5s delay, bounce effect
- Particle effects: continuous for 3-4 seconds
- All animations at 60fps