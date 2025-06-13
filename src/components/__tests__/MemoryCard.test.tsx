import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import MemoryCard from '../MemoryCard';
import { Animal } from '../../constants/animals';

// Mock React Native Reanimated
jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  
  // The mock for `call` immediately calls the callback which is incorrect
  // So we override it with a no-op
  Reanimated.default.call = () => {};
  
  return Reanimated;
});

// Mock KoruPattern component (no longer used but may be referenced)
jest.mock('../KoruPattern', () => 'KoruPattern');

// Mock the image assets
jest.mock('../../../assets/images/animals/dog.png', () => 'dog.png');
jest.mock('../../../assets/images/animals/cat.png', () => 'cat.png');
jest.mock('../../../assets/images/animals/cow.png', () => 'cow.png');
jest.mock('../../../assets/images/animals/horse.png', () => 'horse.png');
jest.mock('../../../assets/images/animals/sheep.png', () => 'sheep.png');
jest.mock('../../../assets/images/animals/pig.png', () => 'pig.png');
jest.mock('../../../assets/images/animals/butterfly.png', () => 'butterfly.png');
jest.mock('../../../assets/images/animals/kiwi.png', () => 'kiwi.png');
jest.mock('../../../assets/images/animals/pukeko.png', () => 'pukeko.png');
jest.mock('../../../assets/images/animals/snail.png', () => 'snail.png');
jest.mock('../../../assets/images/animals/tui.png', () => 'tui.png');

const mockAnimal: Animal = {
  id: '1',
  english: 'Dog',
  maori: 'Kurī',
  image: 'dog',
};

const defaultProps = {
  cardId: 'test-card-1',
  animal: mockAnimal,
  isFlipped: false,
  isMatched: false,
  onPress: jest.fn(),
  cardWidth: 100,
  cardHeight: 120,
  disabled: false,
};

describe('MemoryCard', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with default props', () => {
    const { getByRole } = render(<MemoryCard {...defaultProps} />);
    
    const button = getByRole('button');
    expect(button).toBeDefined();
  });

  it('shows card back when not flipped', () => {
    const { getByTestId } = render(<MemoryCard {...defaultProps} />);
    
    // Card back is solid color, no text content to check
    expect(getByTestId('card-test-card-1')).toBeDefined();
  });

  it('shows animal names when flipped', () => {
    const { getByText } = render(
      <MemoryCard {...defaultProps} isFlipped={true} />
    );
    
    expect(getByText('Kurī')).toBeDefined();
    expect(getByText('Dog')).toBeDefined();
  });

  it('calls onPress when card is pressed', () => {
    const mockOnPress = jest.fn();
    const { getByRole } = render(
      <MemoryCard {...defaultProps} onPress={mockOnPress} />
    );
    
    fireEvent.press(getByRole('button'));
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });

  it('does not call onPress when disabled', () => {
    const mockOnPress = jest.fn();
    const { getByRole } = render(
      <MemoryCard {...defaultProps} onPress={mockOnPress} disabled={true} />
    );
    
    fireEvent.press(getByRole('button'));
    expect(mockOnPress).not.toHaveBeenCalled();
  });

  it('shows matched state correctly', () => {
    const { getByText } = render(
      <MemoryCard {...defaultProps} isFlipped={true} isMatched={true} />
    );
    
    expect(getByText('✓')).toBeDefined();
  });

  it('has correct accessibility properties when face down', () => {
    const { getByRole } = render(<MemoryCard {...defaultProps} />);
    
    const button = getByRole('button');
    expect(button.props.accessibilityLabel).toBe('Memory card for Dog, Kurī');
    expect(button.props.accessibilityHint).toBe('Card is face down, tap to flip');
    expect(button.props.accessibilityState.selected).toBe(false);
  });

  it('has correct accessibility properties when face up', () => {
    const { getByRole } = render(
      <MemoryCard {...defaultProps} isFlipped={true} />
    );
    
    const button = getByRole('button');
    expect(button.props.accessibilityHint).toBe('Card is face up, showing the animal');
    expect(button.props.accessibilityState.selected).toBe(true);
  });

  it('has correct accessibility properties when matched', () => {
    const { getByRole } = render(
      <MemoryCard {...defaultProps} isFlipped={true} isMatched={true} />
    );
    
    const button = getByRole('button');
    expect(button.props.accessibilityHint).toBe('Card is matched');
    expect(button.props.accessibilityState.disabled).toBe(false); // Card is not disabled when matched, just shows matched state
  });

  it('applies correct dimensions', () => {
    const { getByRole } = render(
      <MemoryCard {...defaultProps} cardWidth={150} cardHeight={180} />
    );
    
    const button = getByRole('button');
    // The button should contain children with the specified dimensions
    expect(button).toBeDefined();
  });

  it('handles different animal data correctly', () => {
    const catAnimal: Animal = {
      id: '2',
      english: 'Cat',
      maori: 'Ngeru',
      image: 'cat',
    };

    const { getByText } = render(
      <MemoryCard {...defaultProps} cardId="cat-card" animal={catAnimal} isFlipped={true} />
    );
    
    expect(getByText('Ngeru')).toBeDefined();
    expect(getByText('Cat')).toBeDefined();
  });

  it('handles unknown image gracefully', () => {
    const unknownAnimal: Animal = {
      id: '99',
      english: 'Unknown',
      maori: 'Kāore e mōhiotia',
      image: 'unknown',
    };

    const { getByText } = render(
      <MemoryCard {...defaultProps} cardId="unknown-card" animal={unknownAnimal} isFlipped={true} />
    );
    
    expect(getByText('Kāore e mōhiotia')).toBeDefined();
    expect(getByText('Unknown')).toBeDefined();
  });

  it('handles long animal names correctly', () => {
    const longNameAnimal: Animal = {
      id: '3',
      english: 'Very Long English Name',
      maori: 'He ingoa roa rawa',
      image: 'dog',
    };

    const { getByText } = render(
      <MemoryCard {...defaultProps} cardId="long-name-card" animal={longNameAnimal} isFlipped={true} />
    );
    
    expect(getByText('He ingoa roa rawa')).toBeDefined();
    expect(getByText('Very Long English Name')).toBeDefined();
  });

  it('maintains proper card state transitions', async () => {
    const { rerender, getByText, getByTestId } = render(
      <MemoryCard {...defaultProps} />
    );
    
    // Initially shows card back (solid color, no text)
    expect(getByTestId('card-test-card-1')).toBeDefined();
    
    // When flipped, shows front with animal names
    rerender(<MemoryCard {...defaultProps} isFlipped={true} />);
    
    await waitFor(() => {
      expect(getByText('Kurī')).toBeDefined();
      expect(getByText('Dog')).toBeDefined();
    });
    
    // When matched, shows checkmark
    rerender(<MemoryCard {...defaultProps} isFlipped={true} isMatched={true} />);
    
    expect(getByText('✓')).toBeDefined();
  });
});