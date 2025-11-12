import React from 'react';
import { View, Text, Image } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { OnboardingStackParamList } from '../../navigation/types';
import { PrimaryButton } from '../../components/PrimaryButton';

type Props = NativeStackScreenProps<OnboardingStackParamList, 'Welcome'>;

export const WelcomeScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24, gap: 24, backgroundColor: '#F2F2F2' }}>
      <Image source={require('../../../assets/logo.png')} style={{ width: 96, height: 96 }} />
      <Text accessibilityRole="header" style={{ fontSize: 22, fontWeight: '800' }}>
        Sua nova rota profissional
      </Text>
      <PrimaryButton title="Começar" onPress={() => navigation.replace('Login')} accessibilityLabel="Começar" />
    </View>
  );
};

