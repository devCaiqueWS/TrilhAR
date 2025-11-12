import React from 'react';
import Svg, { Circle } from 'react-native-svg';

type Props = { size?: number; stroke?: number; progress: number; color?: string; bg?: string };

export const ProgressRing: React.FC<Props> = ({ size = 64, stroke = 6, progress, color = '#26A699', bg = '#E5E7EB' }) => {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - Math.max(0, Math.min(1, progress)) * circumference;
  return (
    <Svg width={size} height={size}>
      <Circle cx={size / 2} cy={size / 2} r={radius} stroke={bg} strokeWidth={stroke} fill="transparent" />
      <Circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke={color}
        strokeWidth={stroke}
        fill="transparent"
        strokeDasharray={`${circumference}, ${circumference}`}
        strokeDashoffset={offset}
        strokeLinecap="round"
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
    </Svg>
  );
};

