import React, { useEffect, useState } from 'react';
import { Text, View, StyleProp, TextStyle, ViewStyle } from 'react-native';

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
    const interval = setInterval(() => {
      setDisplayedText((prev) => prev + text.charAt(index));
      index++;
      if (index === text.length) {
        clearInterval(interval);
        if (onComplete) onComplete();
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed, onComplete]);

  return (
    <View style={containerStyle}>
      <Text style={textStyle}>{displayedText}</Text>
    </View>
  );
};

export default Typewriter;