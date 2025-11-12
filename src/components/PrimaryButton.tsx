import React from 'react';
import { Pressable, Text, ActivityIndicator, ViewStyle, TextStyle } from 'react-native';
import { cva, type VariantProps } from 'class-variance-authority';
import { colors, radii } from '../theme/tokens';

const buttonStyles = cva([], {
  variants: {
    variant: {
      solid: [],
      outline: [],
      ghost: [],
    },
    size: {
      sm: [],
      md: [],
      lg: [],
    },
  },
  defaultVariants: {
    variant: 'solid',
    size: 'md',
  },
});

type ButtonProps = {
  title: string;
  onPress?: () => void;
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  accessibilityLabel?: string;
} & VariantProps<typeof buttonStyles>;

export const PrimaryButton: React.FC<ButtonProps> = ({
  title,
  onPress,
  disabled,
  loading,
  style,
  textStyle,
  leftIcon,
  rightIcon,
  variant = 'solid',
  size = 'md',
  accessibilityLabel,
}) => {
  const base: ViewStyle = {
    paddingVertical: size === 'lg' ? 14 : size === 'sm' ? 8 : 12,
    paddingHorizontal: 16,
    borderRadius: radii.md,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    borderWidth: variant === 'outline' ? 1 : 0,
    borderColor: colors.primary,
    backgroundColor:
      variant === 'solid' ? colors.primary : variant === 'outline' ? 'transparent' : 'transparent',
    opacity: disabled ? 0.6 : 1,
  };

  const textBase: TextStyle = {
    color: variant === 'solid' ? 'white' : colors.primary,
    fontWeight: '600',
  };

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel || title}
      disabled={disabled || loading}
      onPress={onPress}
      style={[base, style]}
    >
      {leftIcon}
      {loading ? <ActivityIndicator color={textBase.color as string} /> : <Text style={[textBase, textStyle]}>{title}</Text>}
      {rightIcon}
    </Pressable>
  );
};

