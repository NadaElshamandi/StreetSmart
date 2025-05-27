import { useAuth } from "@clerk/clerk-expo";
import { Redirect, useRootNavigationState } from "expo-router";
import { useEffect, useState } from "react";

const Home = () => {
  const { isSignedIn } = useAuth();
  const rootNavigationState = useRootNavigationState();
  const [isNavigationReady, setIsNavigationReady] = useState(false);

  useEffect(() => {
    // Check if the root navigation state is available and ready
    if (rootNavigationState?.routes?.length > 0 && rootNavigationState?.index > -1) {
      setIsNavigationReady(true);
    }
  }, [rootNavigationState]);

  // Wait for navigation to be ready
  if (!isNavigationReady) {
    return null; // Or a loading indicator
  }

  // Once navigation is ready, perform the redirect based on auth status
  if (isSignedIn) {
    return <Redirect href="/(root)/(tabs)/home" />;
  }

  return <Redirect href="/(auth)/welcome" />;
};

export default Home;