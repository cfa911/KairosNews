import React, { useEffect, useState } from 'react';
import { StyleProp, Text, TextStyle, View, ViewStyle } from 'react-native';

interface TypewriterProps {
  text: string;
  speed?: number;
  onComplete?: () => void;
  containerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

const Typewriter: React.FC<TypewriterProps> = ({
  text,
  speed = 100,
  onComplete,
  containerStyle,
  textStyle,
}) => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    let index = 0;

    const typeCharacter = () => {
      if (index <= text.length) {
        setDisplayedText(text.substring(0, index)); // Use substring to ensure consistency
        index++;
        setTimeout(typeCharacter, speed); // Schedule the next character
      } else if (onComplete) {
        onComplete(); // Call onComplete when typing is finished
      }
    };

    typeCharacter(); // Start typing

    return () => {
      index = text.length; // Cleanup to prevent further updates
    };
  }, [text, speed, onComplete]);

  return (
    <View style={containerStyle}>
      <Text style={textStyle}>{displayedText}</Text>
    </View>
  );
};

export default Typewriter;