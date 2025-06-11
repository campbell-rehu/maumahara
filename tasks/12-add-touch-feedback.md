# Task 12: Add touch feedback and visual responses

## Priority: Medium

## Description
Implement immediate visual and haptic feedback for all touch interactions to enhance user experience.

## Touch Feedback Requirements

### Card Interactions
- **Press In**: Scale to 0.95, slight shadow
- **Press Out**: Return to 1.0 scale
- **Disabled State**: Reduced opacity for matched cards
- **Haptic**: Light impact on card flip

### Button Interactions
- **Play Button**: Scale animation + color change
- **Difficulty Buttons**: Highlight selected option
- **Play Again**: Bounce animation on press

### Visual Feedback Types
1. **Scale Animations**: 0.95-1.05 range
2. **Opacity Changes**: 0.7-1.0 for states
3. **Color Shifts**: Darken on press
4. **Shadow Effects**: Elevation changes

## Implementation
```typescript
// Using Pressable component
<Pressable
  onPressIn={() => animateScale(0.95)}
  onPressOut={() => animateScale(1.0)}
  disabled={isMatched}
>
```

## Haptic Feedback (iOS)
- Card flip: `Haptics.impactAsync(Light)`
- Match found: `Haptics.notificationAsync(Success)`
- Game complete: `Haptics.notificationAsync(Success)`

## Acceptance Criteria
- [ ] All interactive elements have touch feedback
- [ ] Feedback is immediate (no delay)
- [ ] Animations are smooth and consistent
- [ ] Disabled states are visually clear
- [ ] Haptic feedback enhances experience
- [ ] No feedback on non-interactive elements