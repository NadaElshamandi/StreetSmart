import { useAuth } from "@clerk/clerk-expo";
import { Redirect } from "expo-router";

const Home = () => {
  const { isSignedIn, isLoaded } = useAuth();

  // Wait for Clerk to load
  if (!isLoaded) {
    return null;
  }

  // Redirect based on authentication state
  if (isSignedIn) {
    return <Redirect href="/(root)/tabs/home" />;
  } else {
    return <Redirect href="/(auth)/welcome" />;
  }
};

export default Home;