import React, {useEffect, useRef} from 'react';
import {Animated, View} from 'react-native';
import type {PropsWithChildren} from 'react';
import type {ViewStyle} from 'react-native';

type FadeInViewProps = PropsWithChildren<{
  style?: ViewStyle;
  duration?: number; // Add a duration prop
  cycle?: boolean; // Add a cycle prop
}>;

const FadeInView: React.FC<FadeInViewProps> = ({style, children, duration = 2000, cycle = false}) => {
  const fadeAnim = useRef(new Animated.Value(0.2)).current; // Use useRef to persist Animated.Value

  useEffect(() => {
    const fadeIn = Animated.timing(fadeAnim, {
      toValue: 1,
      duration, // Use the duration prop
      useNativeDriver: true,
    });

    const fadeOut = Animated.timing(fadeAnim, {
      toValue: 0.2,
      duration, // Use the duration prop
      useNativeDriver: true,
    });

    if (cycle) {
      Animated.loop(
        Animated.sequence([fadeIn, fadeOut]) // Cycle between fadeIn and fadeOut
      ).start();
    } else {
      fadeIn.start(); // Run the fade-in animation once
    }
  }, [fadeAnim, duration, cycle]);

  return (
    <Animated.View
      style={{
        ...style,
        opacity: fadeAnim, // Bind opacity to animated value
      }}>
      {children}
    </Animated.View>
  );
};

type WrapperProps = PropsWithChildren<{
  style?: ViewStyle;
  duration?: number; // Pass duration to the wrapper as well
  cycle?: boolean; // Pass cycle to the wrapper as well
}>;

const FadeInViewWrapper: React.FC<WrapperProps> = ({style, children, duration, cycle}) => {
  return (
    <View style={style}>
      <FadeInView style={style} duration={duration} cycle={cycle}>
        {children}
      </FadeInView>
    </View>
  );
};

export default FadeInViewWrapper;