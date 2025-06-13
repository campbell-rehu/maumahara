import { renderHook } from '@testing-library/react-native';
import { useSoundEffects, getSoundEffectForGameEvent, SOUND_FILES } from '../useSoundEffects';

// Mock console.log to test dev logging
const mockConsoleLog = jest.spyOn(console, 'log').mockImplementation();

describe('useSoundEffects', () => {
  beforeEach(() => {
    mockConsoleLog.mockClear();
  });

  afterAll(() => {
    mockConsoleLog.mockRestore();
  });

  describe('Hook Interface', () => {
    it('should return the correct interface', () => {
      const { result } = renderHook(() => useSoundEffects());
      
      expect(result.current).toHaveProperty('playSound');
      expect(result.current).toHaveProperty('preloadSounds');
      expect(result.current).toHaveProperty('setSoundEnabled');
      expect(result.current).toHaveProperty('isSoundEnabled');
      
      expect(typeof result.current.playSound).toBe('function');
      expect(typeof result.current.preloadSounds).toBe('function');
      expect(typeof result.current.setSoundEnabled).toBe('function');
      expect(typeof result.current.isSoundEnabled).toBe('boolean');
    });

    it('should have sound enabled by default', () => {
      const { result } = renderHook(() => useSoundEffects());
      
      expect(result.current.isSoundEnabled).toBe(true);
    });
  });

  describe('playSound', () => {
    it('should log sound effects in development mode', () => {
      const { result } = renderHook(() => useSoundEffects());
      
      result.current.playSound('cardFlip');
      result.current.playSound('match');
      result.current.playSound('mismatch');
      result.current.playSound('gameComplete');
      result.current.playSound('buttonPress');
      
      expect(mockConsoleLog).toHaveBeenCalledWith('[Sound Effect] Playing: cardFlip');
      expect(mockConsoleLog).toHaveBeenCalledWith('[Sound Effect] Playing: match');
      expect(mockConsoleLog).toHaveBeenCalledWith('[Sound Effect] Playing: mismatch');
      expect(mockConsoleLog).toHaveBeenCalledWith('[Sound Effect] Playing: gameComplete');
      expect(mockConsoleLog).toHaveBeenCalledWith('[Sound Effect] Playing: buttonPress');
    });

    it('should handle all sound effect types', () => {
      const { result } = renderHook(() => useSoundEffects());
      
      const soundEffects = ['cardFlip', 'match', 'mismatch', 'gameComplete', 'buttonPress'] as const;
      
      soundEffects.forEach(effect => {
        expect(() => result.current.playSound(effect)).not.toThrow();
      });
    });

    it('should be callable multiple times', () => {
      const { result } = renderHook(() => useSoundEffects());
      
      result.current.playSound('cardFlip');
      result.current.playSound('cardFlip');
      result.current.playSound('match');
      
      expect(mockConsoleLog).toHaveBeenCalledTimes(3);
    });
  });

  describe('preloadSounds', () => {
    it('should return a resolved promise', async () => {
      const { result } = renderHook(() => useSoundEffects());
      
      await expect(result.current.preloadSounds()).resolves.toBeUndefined();
    });

    it('should log preloading message in development mode', async () => {
      const { result } = renderHook(() => useSoundEffects());
      
      await result.current.preloadSounds();
      
      expect(mockConsoleLog).toHaveBeenCalledWith('[Sound Effects] Preloading sounds...');
    });
  });

  describe('setSoundEnabled', () => {
    it('should log sound enable/disable messages', () => {
      const { result } = renderHook(() => useSoundEffects());
      
      result.current.setSoundEnabled(true);
      expect(mockConsoleLog).toHaveBeenCalledWith('[Sound Effects] Sound enabled');
      
      result.current.setSoundEnabled(false);
      expect(mockConsoleLog).toHaveBeenCalledWith('[Sound Effects] Sound disabled');
    });

    it('should be callable with boolean values', () => {
      const { result } = renderHook(() => useSoundEffects());
      
      expect(() => result.current.setSoundEnabled(true)).not.toThrow();
      expect(() => result.current.setSoundEnabled(false)).not.toThrow();
    });
  });

  describe('Hook Stability', () => {
    it('should maintain function references between renders', () => {
      const { result, rerender } = renderHook(() => useSoundEffects());
      
      const initialPlaySound = result.current.playSound;
      const initialPreloadSounds = result.current.preloadSounds;
      const initialSetSoundEnabled = result.current.setSoundEnabled;
      
      rerender({});
      
      expect(result.current.playSound).toBe(initialPlaySound);
      expect(result.current.preloadSounds).toBe(initialPreloadSounds);
      expect(result.current.setSoundEnabled).toBe(initialSetSoundEnabled);
    });
  });
});

describe('getSoundEffectForGameEvent', () => {
  it('should map game events to correct sound effects', () => {
    expect(getSoundEffectForGameEvent('card_flipped')).toBe('cardFlip');
    expect(getSoundEffectForGameEvent('cards_matched')).toBe('match');
    expect(getSoundEffectForGameEvent('cards_mismatched')).toBe('mismatch');
    expect(getSoundEffectForGameEvent('game_completed')).toBe('gameComplete');
    expect(getSoundEffectForGameEvent('button_pressed')).toBe('buttonPress');
  });

  it('should return null for unknown events', () => {
    expect(getSoundEffectForGameEvent('unknown_event')).toBeNull();
    expect(getSoundEffectForGameEvent('')).toBeNull();
    expect(getSoundEffectForGameEvent('random_string')).toBeNull();
  });

  it('should handle case sensitivity', () => {
    expect(getSoundEffectForGameEvent('CARD_FLIPPED')).toBeNull();
    expect(getSoundEffectForGameEvent('Card_Flipped')).toBeNull();
    expect(getSoundEffectForGameEvent('card_flipped')).toBe('cardFlip');
  });
});

describe('SOUND_FILES', () => {
  it('should have correct file mappings', () => {
    expect(SOUND_FILES.cardFlip).toBe('card-flip.wav');
    expect(SOUND_FILES.match).toBe('match-success.wav');
    expect(SOUND_FILES.mismatch).toBe('match-fail.wav');
    expect(SOUND_FILES.gameComplete).toBe('game-complete.wav');
    expect(SOUND_FILES.buttonPress).toBe('button-press.wav');
  });

  it('should have all required sound effect mappings', () => {
    const requiredSounds = ['cardFlip', 'match', 'mismatch', 'gameComplete', 'buttonPress'];
    
    requiredSounds.forEach(sound => {
      expect(SOUND_FILES).toHaveProperty(sound);
      expect(typeof SOUND_FILES[sound as keyof typeof SOUND_FILES]).toBe('string');
      expect(SOUND_FILES[sound as keyof typeof SOUND_FILES]).toMatch(/\.wav$/);
    });
  });

  it('should have consistent naming convention', () => {
    const soundFiles = Object.values(SOUND_FILES);
    
    soundFiles.forEach(filename => {
      expect(filename).toMatch(/^[a-z-]+\.wav$/);
    });
  });
});