import React, { useMemo, useRef } from 'react';
import { View } from 'react-native';
import BottomSheetLib from '@gorhom/bottom-sheet';

type Props = { open: boolean; onClose?: () => void; children?: React.ReactNode };

export const BottomSheet: React.FC<Props> = ({ open, onClose, children }) => {
  const ref = useRef<BottomSheetLib>(null);
  const snapPoints = useMemo(() => ['25%', '50%'], []);
  if (!open) return null;
  return (
    <BottomSheetLib ref={ref} snapPoints={snapPoints} onClose={onClose}>
      <View style={{ padding: 16 }}>{children}</View>
    </BottomSheetLib>
  );
};

