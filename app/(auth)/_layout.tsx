import { Redirect, Stack } from 'expo-router'
import { useAuth } from '@clerk/clerk-expo'

export default function AuthLayout() {
  const { isSignedIn, isLoaded } = useAuth()

  // Wait for auth to load before making decisions
  if (!isLoaded) {
    return null;
  }

  if (isSignedIn) {
    return <Redirect href={'/(root)/tabs/home'} />
  }

  return (
    <Stack>
      <Stack.Screen 
        name="welcome" 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="sign-in"
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="sign-up" 
        options={{ headerShown: false }} 
      />
    </Stack>
  );
}
