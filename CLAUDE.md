# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Maumahara is an iOS memory match game that teaches Te Reo Māori animal names to children (ages 5-12). The game pairs English animal names with their Te Reo Māori translations through engaging card-matching gameplay.

## Development Status

Currently in pre-development phase with comprehensive documentation (PRD). No code implementation exists yet.

## Technology Stack

### Phase 1 (MVP - Current Focus)
- React Native with Expo for cross-platform development
- React Native Reanimated for card flip animations
- React useState for game state management
- AsyncStorage for persistent high scores

### Phase 2 (Production)
- Native Swift implementation planned for enhanced performance

## Key Features to Implement

1. **Three-screen flow**: Welcome → Game → Celebration
2. **Three difficulty levels**: Easy (2x3), Medium (4x4), Hard (4x5)
3. **Memory matching gameplay** with English-Māori animal pairs
4. **Score tracking** with timer and mistake counter
5. **AI-generated flat design animal illustrations**

## Development Commands

Once React Native/Expo is set up, typical commands will include:
```bash
# Install dependencies
npm install

# Start development server
npx expo start

# Run on iOS simulator
npx expo run:ios

# Run on Android emulator
npx expo run:android

# Build for production
eas build --platform ios
```

## Architecture Guidelines

- Keep components simple and focused (Welcome, Game, Celebration screens)
- Store game logic in custom hooks for reusability
- Use React Native's built-in components where possible
- Implement offline-first design (all assets bundled)
- Follow React Native best practices for performance

## Cultural Considerations

- Respect Te Reo Māori language and cultural elements
- Use Māori-inspired design patterns as specified in PRD
- Ensure accurate pronunciation guides for Māori words
- Consider cultural sensitivity in all design decisions