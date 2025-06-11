import { useCallback } from 'react';

export type SoundEffect = 'cardFlip' | 'match' | 'mismatch' | 'gameComplete' | 'buttonPress';

export interface UseSoundEffectsReturn {
  playSound: (effect: SoundEffect) => void;
  preloadSounds: () => Promise<void>;
  setSoundEnabled: (enabled: boolean) => void;
  isSoundEnabled: boolean;
}

// This is a placeholder implementation for future audio system
// When implementing audio, this will be replaced with actual sound playing logic
export function useSoundEffects(): UseSoundEffectsReturn {
  // For now, just log the sound effect (can be replaced with actual audio implementation)
  const playSound = useCallback((effect: SoundEffect) => {
    if (__DEV__) {
      console.log(`[Sound Effect] Playing: ${effect}`);
    }
    
    // Future implementation will include:
    // - Load and play audio files using expo-av or react-native-sound
    // - Handle sound volume and preferences
    // - Implement different sounds for each effect:
    //   - cardFlip: Soft flip sound
    //   - match: Positive chime
    //   - mismatch: Gentle negative sound
    //   - gameComplete: Victory fanfare
    //   - buttonPress: UI click sound
  }, []);

  const preloadSounds = useCallback(async () => {
    if (__DEV__) {
      console.log('[Sound Effects] Preloading sounds...');
    }
    
    // Future implementation will preload all sound files
    // to ensure smooth playback during game
    return Promise.resolve();
  }, []);

  const setSoundEnabled = useCallback((enabled: boolean) => {
    if (__DEV__) {
      console.log(`[Sound Effects] Sound ${enabled ? 'enabled' : 'disabled'}`);
    }
    
    // Future implementation will:
    // - Store preference in AsyncStorage
    // - Update global sound state
  }, []);

  return {
    playSound,
    preloadSounds,
    setSoundEnabled,
    isSoundEnabled: true, // Default to enabled, will be managed by user preferences
  };
}

// Sound effect mapping for future implementation
export const SOUND_FILES = {
  cardFlip: 'card-flip.wav',
  match: 'match-success.wav', 
  mismatch: 'match-fail.wav',
  gameComplete: 'game-complete.wav',
  buttonPress: 'button-press.wav',
} as const;

// Helper function to determine when to play sounds during gameplay
export const getSoundEffectForGameEvent = (event: string): SoundEffect | null => {
  switch (event) {
    case 'card_flipped':
      return 'cardFlip';
    case 'cards_matched':
      return 'match';
    case 'cards_mismatched':
      return 'mismatch';
    case 'game_completed':
      return 'gameComplete';
    case 'button_pressed':
      return 'buttonPress';
    default:
      return null;
  }
};