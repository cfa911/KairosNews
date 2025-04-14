import React, {useEffect, useRef} from 'react';
import {Animated, View} from 'react-native';
import type {PropsWithChildren} from 'react';
import type {ViewStyle} from 'react-native';

type FadeInViewProps = PropsWithChildren<{style?: ViewStyle}>;

const FadeInView: React.FC<FadeInViewProps> = ({style, children}) => {
  const fadeAnim = useRef(new Animated.Value(0.2)).current; // Use useRef to persist Animated.Value

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

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

type WrapperProps = PropsWithChildren<{style?: ViewStyle}>;

const FadeInViewWrapper: React.FC<WrapperProps> = ({style, children}) => {
  return (
    <View style={style}>
      <FadeInView style={style}>{children}</FadeInView>
    </View>
  );
};

export default FadeInViewWrapper;