# Task 02: Create project structure and basic navigation

## Priority: High

## Description
Set up the foundational project structure and implement the simple three-screen navigation flow.

## Steps
1. Create folder structure for screens, components, and utilities
2. Set up React Navigation for screen transitions
3. Create placeholder screens for Welcome, Game, and Celebration
4. Implement basic navigation flow between screens
5. Add TypeScript interfaces for core data types

## Folder Structure
```
src/
├── screens/
│   ├── WelcomeScreen.tsx
│   ├── GameScreen.tsx
│   └── CelebrationScreen.tsx
├── components/
│   ├── MemoryCard.tsx
│   ├── GameBoard.tsx
│   └── DifficultyModal.tsx
├── types/
│   └── game.types.ts
├── constants/
│   └── animals.ts
└── utils/
    └── gameLogic.ts
```

## Acceptance Criteria
- [x] Folder structure created and organized
- [x] React Navigation installed and configured
- [x] Three screens created with basic layouts
- [x] Navigation flow working (Welcome → Game → Celebration → Welcome)
- [x] TypeScript types defined for game data

## Dependencies
```bash
npm install @react-navigation/native @react-navigation/stack
npx expo install react-native-screens react-native-safe-area-context
```