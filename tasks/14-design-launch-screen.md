# Task 14: Design launch screen that transitions smoothly

## Priority: Medium

## Description
Create a launch screen that provides smooth transition from app launch to the welcome screen.

## Launch Screen Requirements
- **Minimal Design**: Match welcome screen aesthetic
- **Instant Display**: No loading indicators
- **Smooth Transition**: Seamless to welcome screen
- **Brand Identity**: Maumahara logo/title
- **Cultural Element**: Subtle Māori pattern

## Design Elements
```
Center:
- "Maumahara" text or logo
- Subtitle: "Memory Game" (optional)

Background:
- Solid color or subtle gradient
- Light Māori-inspired pattern
- Earth tone color palette
```

## Technical Implementation
- Use Expo SplashScreen API
- Match welcome screen background
- Proper safe area handling
- Support all device sizes

## Transition Strategy
1. Launch screen appears instantly
2. App loads in background
3. Fade transition to welcome screen
4. No jarring visual changes

## Acceptance Criteria
- [ ] Launch screen appears immediately
- [ ] Design matches app aesthetic
- [ ] Smooth transition to welcome screen
- [ ] Works on all iOS device sizes
- [ ] No white flash or glitches
- [ ] Follows iOS launch screen guidelines

## Configuration
```json
// app.json
"splash": {
  "image": "./assets/splash.png",
  "resizeMode": "contain",
  "backgroundColor": "#F5E6D3"
}
```