# Task 10: Add Te Reo Māori and English text to cards

## Priority: High

## Description
Implement bilingual text display on cards with proper typography and cultural emphasis.

## Animal Names Reference
1. Kurī - Dog
2. Ngeru - Cat
3. Hipi - Sheep
4. Kau - Cow
5. Poaka - Pig
6. Hōiho - Horse
7. Kākā - Parrot
8. Kekeno - Seal
9. Tūī - Tui
10. Kererū - Wood pigeon

## Typography Requirements
- Te Reo Māori name: Larger, bold, primary position
- English name: Smaller, secondary position
- Font must support macrons (ā, ē, ī, ō, ū)
- High contrast for readability
- Child-friendly font selection

## Layout Specifications
```
[Animal Image]
   KURĪ        <- Larger, bold
   Dog         <- Smaller, regular
```

## Implementation Details
- Create constants file with all animal data
- Ensure proper Unicode support for macrons
- Test text rendering on different screen sizes
- Verify readability on all card backgrounds

## Acceptance Criteria
- [x] All Te Reo Māori names display correctly with macrons
- [x] Text hierarchy emphasizes Te Reo Māori
- [x] Font is readable for children
- [x] Text doesn't overlap with images
- [x] Consistent styling across all cards
- [x] No spelling errors (double-check against PRD)

## Cultural Validation
- [ ] Te Reo Māori spelling verified
- [ ] Macrons display correctly on all devices
- [ ] Cultural prominence given to Te Reo text