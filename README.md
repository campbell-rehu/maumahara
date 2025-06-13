# Maumahara

An iOS memory match game that teaches Te Reo Māori animal names to children (ages 5-12) through engaging card-matching gameplay.

![Maumahara Game Demo](./gameplay-demo.gif)

## About

Maumahara (meaning "remember" in Te Reo Māori) pairs English animal names with their Te Reo Māori translations in a fun, educational memory game. Children learn while playing through three difficulty levels with beautiful AI-generated animal illustrations.

## Features

- **Three difficulty levels**: Easy (2×3), Medium (4×4), Hard (4×5)
- **Bilingual learning**: English and Te Reo Māori animal names
- **Cultural design**: Māori-inspired patterns and earth-tone color palette
- **Three-screen flow**: Welcome → Game → Celebration
- **Score tracking**: Timer and mistake counter
- **Offline-first**: All assets bundled for use without internet

## Technology Stack

- **React Native** with Expo for cross-platform development
- **TypeScript** for type safety
- **React Navigation** for screen navigation
- **React Native Reanimated** for smooth animations
- **AsyncStorage** for persistent high scores

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- Expo CLI
- iOS Simulator or physical iOS device

### Installation

1. Clone the repository:
```bash
git clone https://github.com/campbell-rehu/maumahara.git
cd maumahara
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npx expo start
```

4. Run on iOS:
```bash
npx expo run:ios
```

## Project Structure

```
src/
├── screens/           # Main app screens
│   ├── WelcomeScreen.tsx
│   ├── GameScreen.tsx
│   └── CelebrationScreen.tsx
├── components/        # Reusable components
├── constants/         # App constants and data
│   ├── animals.ts     # Animal names and translations
│   └── colors.ts      # Color scheme
├── types/             # TypeScript type definitions
└── utils/             # Utility functions
```

## Animals Included

The game features 11 animals with their Te Reo Māori translations:

- Dog (Kurī)
- Cat (Ngeru)
- Horse (Hōiho)
- Sheep (Hipi)
- Cow (Kau)
- Pig (Poaka)
- Kiwi (Kiwi)
- Pukeko (Pūkeko)
- Tui (Tūī)
- Butterfly (Pēpepe)
- Snail (Pupu)

## Development Status

✅ **Phase 1**: Foundation & Setup
- React Native Expo project setup
- Project structure and navigation
- Basic screens implemented

✅ **Phase 2**: Core Game Implementation (COMPLETED)
- Welcome screen with Māori greeting and cultural design
- Difficulty modal with three levels (Māmā, Rōpū, Uaua)
- Game board component with responsive grid layouts
- Memory card component with 3D flip animations
- Complete matching logic and game state management
- Score tracking with timer and mistake counter
- "Ōrite!" celebration with rainbow borders

🚧 **Phase 3**: Enhancement & Polish (In Progress)
- Touch feedback and animations ✅
- Error boundaries for better stability ✅
- Performance optimization ✅
- Sound effects implementation (hook ready)

📋 **Phase 4**: App Store Preparation (Planned)
- App icon and launch screen
- Accessibility features ✅
- Device testing
- App Store metadata and screenshots

## Cultural Considerations

This app was developed with respect for Te Reo Māori language and Māori culture. All translations have been carefully reviewed for accuracy and cultural appropriateness.

## Contributing

This project follows a structured development approach with 23 planned tasks. See the `/tasks` directory for detailed implementation plans.

## License

MIT License - see LICENSE file for details
