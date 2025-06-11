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

    // Check for cultural greeting
    expect(getByText('Kia ora! Haere mai ki Maumahara')).toBeTruthy();
    expect(getByText('Welcome to Memory')).toBeTruthy();
    
    // Check for title
    expect(getByText('Maumahara')).toBeTruthy();
    
    // Check for description
    expect(getByText('Match animals with their Te Reo Māori names')).toBeTruthy();
    
    // Check for play button
    expect(getByText('Tīmata | Start')).toBeTruthy();
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
    const playButton = getByText('Tīmata | Start');
    fireEvent.press(playButton);

    // Modal should now be visible
    await waitFor(() => {
      expect(getByText('Choose Difficulty')).toBeTruthy();
      expect(getByText('Māmā')).toBeTruthy(); // Māori text for Easy
      expect(getByText('Rōpū')).toBeTruthy(); // Māori text for Medium
      expect(getByText('Uaua')).toBeTruthy(); // Māori text for Hard
    });
  });

  it('navigates to game screen with easy difficulty', async () => {
    const { getByText } = render(
      <NavigationContainer>
        <WelcomeScreen />
      </NavigationContainer>
    );

    // Open modal
    const playButton = getByText('Tīmata | Start');
    fireEvent.press(playButton);

    // Select easy difficulty using Māori text
    await waitFor(() => {
      const easyButton = getByText('Māmā');
      fireEvent.press(easyButton);
    });

    // Check navigation was called
    expect(mockNavigate).toHaveBeenCalledWith('Game', { difficulty: 'easy' });
  });

  it('navigates to game screen with medium difficulty', async () => {
    const { getByText } = render(
      <NavigationContainer>
        <WelcomeScreen />
      </NavigationContainer>
    );

    // Open modal
    const playButton = getByText('Tīmata | Start');
    fireEvent.press(playButton);

    // Select medium difficulty using Māori text
    await waitFor(() => {
      const mediumButton = getByText('Rōpū');
      fireEvent.press(mediumButton);
    });

    // Check navigation was called
    expect(mockNavigate).toHaveBeenCalledWith('Game', { difficulty: 'medium' });
  });

  it('navigates to game screen with hard difficulty', async () => {
    const { getByText } = render(
      <NavigationContainer>
        <WelcomeScreen />
      </NavigationContainer>
    );

    // Open modal
    const playButton = getByText('Tīmata | Start');
    fireEvent.press(playButton);

    // Select hard difficulty using Māori text
    await waitFor(() => {
      const hardButton = getByText('Uaua');
      fireEvent.press(hardButton);
    });

    // Check navigation was called
    expect(mockNavigate).toHaveBeenCalledWith('Game', { difficulty: 'hard' });
  });

  it('closes difficulty modal when cancel is pressed', async () => {
    const { getByText, queryByText } = render(
      <NavigationContainer>
        <WelcomeScreen />
      </NavigationContainer>
    );

    // Open modal
    const playButton = getByText('Tīmata | Start');
    fireEvent.press(playButton);

    // Press cancel using bilingual text
    await waitFor(() => {
      const cancelButton = getByText('Whakakore | Cancel');
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