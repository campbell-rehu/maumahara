# Task 01: Set up React Native project with Expo

## Priority: High

## Description
Initialize a new React Native project using Expo for rapid development and deployment of the Maumahara memory game.

## Steps
1. Install Expo CLI globally if not already installed
2. Create new Expo project with TypeScript template
3. Configure project name and display name as "Maumahara"
4. Set up basic folder structure for components, screens, and assets
5. Verify project runs on iOS simulator

## Acceptance Criteria
- [ ] Expo project successfully created
- [ ] Project runs on iOS simulator
- [ ] TypeScript configured
- [ ] Basic folder structure in place
- [ ] Git repository properly initialized

## Technical Notes
- Use Expo SDK 50 or latest stable version
- Enable TypeScript for better type safety
- Configure app.json with proper bundle identifier
- Set up .gitignore for React Native/Expo projects

## Commands
```bash
# Install Expo CLI
npm install -g expo-cli

# Create new project
expo init maumahara --template expo-template-blank-typescript

# Run project
cd maumahara
npx expo start
```