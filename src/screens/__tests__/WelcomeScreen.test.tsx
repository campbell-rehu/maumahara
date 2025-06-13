import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import WelcomeScreen from '../WelcomeScreen';

// Mock navigation
const mockNavigate = jest.fn();
jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: mockNavigate,
    }),
  };
});

describe('WelcomeScreen', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it('renders correctly with all required elements', () => {
    const { getByText } = render(
      <NavigationContainer>
        <WelcomeScreen />
      </NavigationContainer>
    );

    // Check for title
    expect(getByText('Maumahara')).toBeTruthy();
    
    // Check for description
    expect(getByText('Te Reo Māori Memory Match Game')).toBeTruthy();
    
    // Check for play button
    expect(getByText('Start')).toBeTruthy();
  });

  it('opens difficulty modal when play button is pressed', async () => {
    const { getByText, queryByText } = render(
      <NavigationContainer>
        <WelcomeScreen />
      </NavigationContainer>
    );

    // Initially modal should not be visible
    expect(queryByText('Choose Difficulty')).toBeNull();

    // Press play button
    const playButton = getByText('Start');
    fireEvent.press(playButton);

    // Modal should now be visible
    await waitFor(() => {
      expect(getByText('Choose Difficulty')).toBeTruthy();
      expect(getByText('Easy')).toBeTruthy();
      expect(getByText('Medium')).toBeTruthy();
      expect(getByText('Hard')).toBeTruthy();
    });
  });

  it('navigates to game screen with easy difficulty', async () => {
    const { getByText } = render(
      <NavigationContainer>
        <WelcomeScreen />
      </NavigationContainer>
    );

    // Open modal
    const playButton = getByText('Start');
    fireEvent.press(playButton);

    // Select easy difficulty
    await waitFor(() => {
      const easyButton = getByText('Easy');
      fireEvent.press(easyButton);
    });

    // Wait for navigation delay and check navigation was called
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('Game', { difficulty: 'easy' });
    }, { timeout: 500 });
  });

  it('navigates to game screen with medium difficulty', async () => {
    const { getByText } = render(
      <NavigationContainer>
        <WelcomeScreen />
      </NavigationContainer>
    );

    // Open modal
    const playButton = getByText('Start');
    fireEvent.press(playButton);

    // Select medium difficulty
    await waitFor(() => {
      const mediumButton = getByText('Medium');
      fireEvent.press(mediumButton);
    });

    // Wait for navigation delay and check navigation was called
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('Game', { difficulty: 'medium' });
    }, { timeout: 500 });
  });

  it('navigates to game screen with hard difficulty', async () => {
    const { getByText } = render(
      <NavigationContainer>
        <WelcomeScreen />
      </NavigationContainer>
    );

    // Open modal
    const playButton = getByText('Start');
    fireEvent.press(playButton);

    // Select hard difficulty
    await waitFor(() => {
      const hardButton = getByText('Hard');
      fireEvent.press(hardButton);
    });

    // Wait for navigation delay and check navigation was called
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('Game', { difficulty: 'hard' });
    }, { timeout: 500 });
  });

  it('closes difficulty modal when cancel is pressed', async () => {
    const { getByText, queryByText } = render(
      <NavigationContainer>
        <WelcomeScreen />
      </NavigationContainer>
    );

    // Open modal
    const playButton = getByText('Start');
    fireEvent.press(playButton);

    // Press cancel
    await waitFor(() => {
      const cancelButton = getByText('Cancel');
      fireEvent.press(cancelButton);
    });

    // Modal should be closed
    expect(queryByText('Choose Difficulty')).toBeNull();
  });

  it('has proper accessibility labels', () => {
    const { getByLabelText } = render(
      <NavigationContainer>
        <WelcomeScreen />
      </NavigationContainer>
    );

    // Check play button accessibility
    const playButton = getByLabelText('Start game button');
    expect(playButton).toBeTruthy();
  });
});