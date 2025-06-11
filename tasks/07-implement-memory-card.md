# Task 07: Implement MemoryCard component with flip animations

## Priority: High

## Description
Create the individual card component with flip animations and dual-language display.

## Card States
1. **Face Down**: Shows card back with Māori pattern
2. **Face Up**: Shows animal illustration with Te Reo and English names
3. **Matched**: Visual indicator of successful match

## Component Structure
```typescript
interface MemoryCardProps {
  animal: {
    id: string;
    english: string;
    maori: string;
    image: ImageSourcePropType;
  };
  isFlipped: boolean;
  isMatched: boolean;
  onPress: () => void;
}
```

## Visual Design
- **Card Back**: Subtle Māori-inspired pattern
- **Card Front**: 
  - Animal illustration (75% of card)
  - Te Reo Māori name (larger, top)
  - English name (smaller, bottom)
- **Matched State**: Gentle glow or checkmark overlay

## Animation Requirements
- Smooth 3D flip animation using React Native Reanimated
- Duration: 400-600ms for natural feel
- Prevent interaction during flip
- Scale feedback on touch

## Acceptance Criteria
- [ ] Card displays both face down and face up states
- [ ] Flip animation is smooth at 60fps
- [ ] Text is readable and properly positioned
- [ ] Animal images display correctly
- [ ] Touch feedback provides immediate response
- [ ] Matched state is visually distinct

## Accessibility
- [ ] Card content readable by VoiceOver
- [ ] Proper accessibility hints for state