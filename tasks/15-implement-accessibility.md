# Task 15: Implement VoiceOver accessibility support

## Priority: Medium

## Description
Ensure the app is fully accessible with VoiceOver for users with visual impairments.

## Accessibility Requirements

### Screen Readers
- **Welcome Screen**: 
  - Read greeting in both languages
  - Clear button labels
  - Navigation hints

### Game Cards
- **Face Down**: "Card face down, double tap to flip"
- **Face Up**: "[Animal] in Māori is [Te Reo name]"
- **Matched**: "[Animal] matched successfully"

### Game States
- Announce when two cards are flipped
- Announce match/no match results
- Announce game completion

### Implementation
```typescript
// Accessibility props
accessibilityLabel="Kurī - Dog"
accessibilityHint="Double tap to flip card"
accessibilityRole="button"
accessibilityState={{ selected: isFlipped }}
```

## Additional Considerations
- **High Contrast**: Support iOS high contrast mode
- **Font Scaling**: Support dynamic type sizes
- **Focus Management**: Logical tab order
- **Announcements**: Use accessibility announcements

## Testing Checklist
- [ ] All interactive elements are focusable
- [ ] Labels are descriptive and helpful
- [ ] Game is fully playable with VoiceOver
- [ ] No accessibility warnings in Xcode
- [ ] Tested with actual VoiceOver users

## Acceptance Criteria
- [ ] VoiceOver navigation works logically
- [ ] All content is announced correctly
- [ ] Te Reo Māori names pronounced properly
- [ ] Game state changes are announced
- [ ] No unlabeled buttons or images