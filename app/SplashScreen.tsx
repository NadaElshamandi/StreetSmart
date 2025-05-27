import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { styled } from 'nativewind';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Logo from '../assets/images/Logo.svg';

// Define the navigation param list type
type RootStackParamList = {
  Welcome: undefined;
  Splash: undefined;
  // Add other screens here as needed
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Splash'>;

const StyledView = styled(View);
const StyledText = styled(Text);

export default function SplashScreen(): React.JSX.Element {
  const navigation = useNavigation<NavigationProp>();

  useEffect(() => {
    // Navigate to Welcome screen after 2 seconds
    const timer = setTimeout(() => {
      navigation.replace('Welcome');
    }, 2000);

    // Cleanup timer
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <StyledView className="flex-1 bg-primary-100 items-center justify-center">
      <Logo width={128} height={128} className="mb-4" />
      <StyledText className="text-3xl font-JakartaBold text-primary-900">
        StreetSmart
      </StyledText>
    </StyledView>
  );
} 