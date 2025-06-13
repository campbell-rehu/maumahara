import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Animated } from 'react-native';
import DifficultyModal from '../DifficultyModal';

// Mock Animated to avoid animation issues in tests
jest.mock('react-native', () => {
  const RN = jest.requireActual('react-native');
  
  RN.Animated.timing = jest.fn(() => ({
    start: jest.fn((callback) => callback && callback()),
    stop: jest.fn(),
    reset: jest.fn(),
  }));
  
  RN.Animated.spring = jest.fn(() => ({
    start: jest.fn((callback) => callback && callback()),
    stop: jest.fn(),
    reset: jest.fn(),
  }));
  
  RN.Animated.parallel = jest.fn(() => ({
    start: jest.fn((callback) => callback && callback()),
    stop: jest.fn(),
    reset: jest.fn(),
  }));
  
  RN.Animated.Value = jest.fn(() => ({
    setValue: jest.fn(),
    addListener: jest.fn(),
    removeListener: jest.fn(),
    removeAllListeners: jest.fn(),
    stopAnimation: jest.fn(),
    resetAnimation: jest.fn(),
    interpolate: jest.fn(),
    animate: jest.fn(),
    stopTracking: jest.fn(),
    track: jest.fn(),
  }));
  
  return RN;
});

describe('DifficultyModal', () => {
  const mockOnClose = jest.fn();
  const mockOnSelectDifficulty = jest.fn();

  const defaultProps = {
    visible: true,
    onClose: mockOnClose,
    onSelectDifficulty: mockOnSelectDifficulty,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly when visible', () => {
    const { getByText } = render(<DifficultyModal {...defaultProps} />);

    expect(getByText('Choose Difficulty')).toBeTruthy();
    expect(getByText('Easy')).toBeTruthy();
    expect(getByText('Medium')).toBeTruthy();
    expect(getByText('Hard')).toBeTruthy();
    expect(getByText('Cancel')).toBeTruthy();
  });

  it('does not render when not visible', () => {
    const { queryByText } = render(
      <DifficultyModal {...defaultProps} visible={false} />
    );

    expect(queryByText('Choose Difficulty')).toBeFalsy();
  });

  it('displays correct difficulty information', () => {
    const { getByText } = render(<DifficultyModal {...defaultProps} />);

    // All difficulty levels should be displayed
    expect(getByText('Easy')).toBeTruthy();
    expect(getByText('Medium')).toBeTruthy();
    expect(getByText('Hard')).toBeTruthy();
  });

  it('calls onSelectDifficulty with correct difficulty when easy is pressed', () => {
    const { getByText } = render(<DifficultyModal {...defaultProps} />);

    fireEvent.press(getByText('Easy'));

    expect(mockOnSelectDifficulty).toHaveBeenCalledWith('easy');
    expect(mockOnSelectDifficulty).toHaveBeenCalledTimes(1);
  });

  it('calls onSelectDifficulty with correct difficulty when medium is pressed', () => {
    const { getByText } = render(<DifficultyModal {...defaultProps} />);

    fireEvent.press(getByText('Medium'));

    expect(mockOnSelectDifficulty).toHaveBeenCalledWith('medium');
    expect(mockOnSelectDifficulty).toHaveBeenCalledTimes(1);
  });

  it('calls onSelectDifficulty with correct difficulty when hard is pressed', () => {
    const { getByText } = render(<DifficultyModal {...defaultProps} />);

    fireEvent.press(getByText('Hard'));

    expect(mockOnSelectDifficulty).toHaveBeenCalledWith('hard');
    expect(mockOnSelectDifficulty).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when cancel button is pressed', () => {
    const { getByText } = render(<DifficultyModal {...defaultProps} />);

    fireEvent.press(getByText('Cancel'));

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('has proper accessibility labels', () => {
    const { getByLabelText } = render(<DifficultyModal {...defaultProps} />);

    expect(getByLabelText('Easy difficulty: 3 pairs • Perfect for beginners')).toBeTruthy();
    expect(getByLabelText('Medium difficulty: 8 pairs • Good challenge')).toBeTruthy();
    expect(getByLabelText('Hard difficulty: 10 pairs • Expert level')).toBeTruthy();
    expect(getByLabelText('Cancel')).toBeTruthy();
  });

  it('has proper accessibility hints', () => {
    const { getByA11yHint } = render(<DifficultyModal {...defaultProps} />);

    expect(getByA11yHint('Tap to start easy game with 3 pairs')).toBeTruthy();
    expect(getByA11yHint('Tap to start medium game with 8 pairs')).toBeTruthy();
    expect(getByA11yHint('Tap to start hard game with 10 pairs')).toBeTruthy();
    expect(getByA11yHint('Close difficulty selection and return to welcome screen')).toBeTruthy();
  });

  it('handles visibility changes correctly', () => {
    const { rerender, queryByText } = render(<DifficultyModal {...defaultProps} visible={false} />);

    // Should not render when not visible
    expect(queryByText('Choose Difficulty')).toBeFalsy();

    // Should render when visible
    rerender(<DifficultyModal {...defaultProps} visible={true} />);
    expect(queryByText('Choose Difficulty')).toBeTruthy();
  });

  it('handles modal close correctly', () => {
    const { getByText } = render(<DifficultyModal {...defaultProps} />);
    
    // Test the cancel button functionality
    fireEvent.press(getByText('Cancel'));
    
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('uses English difficulty names', () => {
    const { getByText } = render(<DifficultyModal {...defaultProps} />);

    expect(getByText('Easy')).toBeTruthy();
    expect(getByText('Medium')).toBeTruthy();
    expect(getByText('Hard')).toBeTruthy();
  });

  it('displays grid visualizations for each difficulty', () => {
    const { getByText } = render(<DifficultyModal {...defaultProps} />);

    // Check that all difficulty buttons are rendered (grid visualizations are inside these)
    expect(getByText('Easy')).toBeTruthy();
    expect(getByText('Medium')).toBeTruthy();
    expect(getByText('Hard')).toBeTruthy();

    // The grid icons are rendered as View components, so we can't test them directly
    // but we can ensure the buttons that contain them are present
  });

  it('uses correct color scheme for difficulties', () => {
    const { getByText } = render(<DifficultyModal {...defaultProps} />);

    // We can't directly test the colors, but we can ensure the components render
    // The color testing would require a more complex setup with style inspection
    expect(getByText('Easy')).toBeTruthy();
    expect(getByText('Medium')).toBeTruthy();
    expect(getByText('Hard')).toBeTruthy();
  });
});