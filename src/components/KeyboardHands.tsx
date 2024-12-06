import React from 'react';
import { romajiMap } from '../constants/gameConstants';

interface FingerStyle {
  height: string;
  rotate: string;
}

interface FingerPosition {
  hand: 'left' | 'right';
  finger: number;
  key: string;
}

const fingerStyles: Record<number, FingerStyle> = {
  0: { height: 'h-32', rotate: '-rotate-12' },  // Index finger
  1: { height: 'h-36', rotate: '-rotate-6' },   // Middle finger
  2: { height: 'h-34', rotate: 'rotate-0' },    // Ring finger
  3: { height: 'h-30', rotate: 'rotate-6' }     // Pinky finger
};

interface Props {
  highlightedKey: string;
  currentInput: string;
}

const KeyboardHands: React.FC<Props> = ({ highlightedKey, currentInput }) => {
  // Define finger positions for each romaji key
  const fingerMap: Record<string, FingerPosition> = {
    // Left hand - top row
    'Q': { hand: 'left', finger: 3, key: 'Q' },
    'W': { hand: 'left', finger: 2, key: 'W' },
    'E': { hand: 'left', finger: 1, key: 'E' },
    'R': { hand: 'left', finger: 0, key: 'R' },
    'T': { hand: 'left', finger: 0, key: 'T' },
    // Right hand - top row
    'Y': { hand: 'right', finger: 0, key: 'Y' },
    'U': { hand: 'right', finger: 0, key: 'U' },
    'I': { hand: 'right', finger: 1, key: 'I' },
    'O': { hand: 'right', finger: 2, key: 'O' },
    'P': { hand: 'right', finger: 3, key: 'P' },
    // Left hand - home row
    'A': { hand: 'left', finger: 3, key: 'A' },
    'S': { hand: 'left', finger: 2, key: 'S' },
    'D': { hand: 'left', finger: 1, key: 'D' },
    'F': { hand: 'left', finger: 0, key: 'F' },
    'G': { hand: 'left', finger: 0, key: 'G' },
    // Right hand - home row
    'H': { hand: 'right', finger: 0, key: 'H' },
    'J': { hand: 'right', finger: 0, key: 'J' },
    'K': { hand: 'right', finger: 1, key: 'K' },
    'L': { hand: 'right', finger: 2, key: 'L' },
    ';': { hand: 'right', finger: 3, key: ';' },
    // Left hand - bottom row
    'Z': { hand: 'left', finger: 3, key: 'Z' },
    'X': { hand: 'left', finger: 2, key: 'X' },
    'C': { hand: 'left', finger: 1, key: 'C' },
    'V': { hand: 'left', finger: 0, key: 'V' },
    'B': { hand: 'left', finger: 0, key: 'B' },
    // Right hand - bottom row
    'N': { hand: 'right', finger: 0, key: 'N' },
    'M': { hand: 'right', finger: 0, key: 'M' },
    ',': { hand: 'right', finger: 1, key: ',' },
    '.': { hand: 'right', finger: 2, key: '.' },
    '/': { hand: 'right', finger: 3, key: '/' },
  };

  const getFingerPositions = (key: string, input: string): FingerPosition[] => {
    if (!key) return [];
    
    // For direct key mapping
    if (fingerMap[key]) {
      return [fingerMap[key]];
    }

    // For hiragana, get all possible romaji characters
    const romaji = romajiMap[key as keyof typeof romajiMap];
    if (!romaji || !romaji[0]) return [];

    const correctRomaji = romaji[0];
    if (!correctRomaji) return [];

    // If no input yet, show the first character's position
    if (!input) {
      const firstChar = correctRomaji[0];
      return fingerMap[firstChar] ? [fingerMap[firstChar]] : [];
    }

    // Show the next character's position based on current input
    const nextCharIndex = input.length;
    if (nextCharIndex < correctRomaji.length) {
      return fingerMap[correctRomaji[nextCharIndex]] ? [fingerMap[correctRomaji[nextCharIndex]]] : [];
    }

    return [];
  };

  const activeKey = highlightedKey.toUpperCase();
  const fingerPositions = getFingerPositions(activeKey, currentInput);

  return (
    <div className="mt-2 flex justify-center space-x-32 opacity-90 pointer-events-none select-none scale-80">
      {/* Left Hand */}
      <div className="relative w-64 h-72">
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-56 h-32 bg-gray-200/95 rounded-full shadow-xl" />
        <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2 flex space-x-4">
          {[3, 2, 1, 0].map((finger) => (
            <div
              key={`left-${finger}`}
              className={`w-8 h-24 rounded-t-full transition-all duration-200 ${
                fingerPositions.some(pos => pos.hand === 'left' && pos.finger === finger)
                  ? 'bg-blue-500 shadow-lg shadow-blue-500/50 animate-[pulse_1s_ease-in-out_infinite] scale-110 ring-4 ring-blue-300/50'
                  : 'bg-gray-300/90'
              } transform origin-bottom hover:scale-105 ${fingerStyles[finger].height} ${
                finger === 0 ? fingerStyles[0].rotate : 
                finger === 1 ? fingerStyles[1].rotate : 
                finger === 2 ? fingerStyles[2].rotate : 
                fingerStyles[3].rotate
              }`}
            />
          ))}
        </div>
      </div>

      {/* Right Hand */}
      <div className="relative w-64 h-72">
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-56 h-32 bg-gray-200/95 rounded-full shadow-xl" />
        <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2 flex space-x-4">
          {[0, 1, 2, 3].map((finger) => (
            <div
              key={`right-${finger}`}
              className={`w-8 h-24 rounded-t-full transition-all duration-200 ${
                fingerPositions.some(pos => pos.hand === 'right' && pos.finger === finger)
                  ? 'bg-blue-500 shadow-lg shadow-blue-500/50 animate-[pulse_1s_ease-in-out_infinite] scale-110 ring-4 ring-blue-300/50'
                  : 'bg-gray-300/90'
              } transform origin-bottom hover:scale-105 ${fingerStyles[finger].height} ${
                finger === 0 ? '-' + fingerStyles[0].rotate : 
                finger === 1 ? '-' + fingerStyles[1].rotate : 
                finger === 2 ? '-' + fingerStyles[2].rotate : 
                '-' + fingerStyles[3].rotate
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default KeyboardHands;