import React, { useEffect, useState } from 'react';
import { Animated, Text } from 'react-native';

type Props = { message: string; visible: boolean; onHide?: () => void };

export const Toast: React.FC<Props> = ({ message, visible, onHide }) => {
  const [opacity] = useState(new Animated.Value(0));
  useEffect(() => {
    if (visible) {
      Animated.timing(opacity, { toValue: 1, duration: 200, useNativeDriver: true }).start(() => {
        setTimeout(() => {
          Animated.timing(opacity, { toValue: 0, duration: 200, useNativeDriver: true }).start(onHide);
        }, 1500);
      });
    }
  }, [visible]);
  if (!visible) return null;
  return (
    <Animated.View style={{ position: 'absolute', bottom: 32, left: 16, right: 16, padding: 12, borderRadius: 8, backgroundColor: '#111827', opacity }}>
      <Text style={{ color: 'white', textAlign: 'center' }}>{message}</Text>
    </Animated.View>
  );
};

