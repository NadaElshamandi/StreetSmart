import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledText = styled(Text);

export default function App() {
  return (
    <StyledView className="flex-1 items-center justify-center bg-red-500">
      <StyledText className="text-white text-2xl font-bold">Hello NativeWind!</StyledText>
      <StatusBar style="auto" />
    </StyledView>
  );
}
