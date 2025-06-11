# Task 17: Test on multiple iOS device sizes

## Priority: Medium

## Description
Thoroughly test the app on various iOS devices to ensure consistent experience.

## Test Devices

### iPhones
- iPhone SE (4.7") - Smallest screen
- iPhone 13 (6.1") - Standard size
- iPhone 15 Pro Max (6.7") - Largest
- iPhone 12 mini (5.4") - Compact

### iPads
- iPad mini (8.3")
- iPad Air (10.9")
- iPad Pro 12.9"

## Test Scenarios

### Layout Testing
- [ ] Card grids fit properly on all screens
- [ ] No text truncation or overlap
- [ ] Buttons are appropriately sized
- [ ] Safe areas respected
- [ ] Landscape orientation (iPad)

### Performance Testing
- [ ] Smooth animations on older devices
- [ ] Quick load times
- [ ] Responsive touch on all devices
- [ ] Memory usage acceptable

### Visual Testing
- [ ] Images display at correct resolution
- [ ] Text is readable on all sizes
- [ ] Touch targets meet minimum size
- [ ] No layout breaking

## Specific Checks
1. **Small Screens**: Ensure 4x5 grid is playable
2. **Large Screens**: Cards don't become too large
3. **Notch Devices**: Content not obscured
4. **iPad**: Consider split-screen support

## Bug Categories
- **Critical**: Crashes or unplayable states
- **Major**: Layout issues affecting gameplay
- **Minor**: Visual inconsistencies

## Acceptance Criteria
- [ ] Playable on all test devices
- [ ] No critical or major bugs
- [ ] Consistent experience across devices
- [ ] Performance acceptable on older devices