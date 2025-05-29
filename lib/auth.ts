import * as Linking from "expo-linking";
import * as SecureStore from "expo-secure-store";

import { fetchAPI } from "@/lib/fetch";

export const tokenCache = {
  async getToken(key: string) {
    try {
      const item = await SecureStore.getItemAsync(key);
      if (item) {
        console.log(`${key} was used 🔐 \n`);
      } else {
        console.log("No values stored under key: " + key);
      }
      return item;
    } catch (error) {
      console.error("SecureStore get item error: ", error);
      await SecureStore.deleteItemAsync(key);
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

export const googleOAuth = async (startOAuthFlow: any) => {
  try {
    const { createdSessionId, setActive, signUp, signIn } = await startOAuthFlow({
      redirectUrl: Linking.createURL("/(root)/tabs/home"),
    });

    if (createdSessionId) {
      if (setActive) {
        await setActive({ session: createdSessionId });

        // Handle new user creation
        if (signUp?.createdUserId) {
          try {
            await fetchAPI("/(api)/user", {
              method: "POST",
              body: JSON.stringify({
                name: `${signUp.firstName} ${signUp.lastName}`,
                email: signUp.emailAddress,
                clerkId: signUp.createdUserId,
              }),
            });
          } catch (apiError) {
            console.log("User creation API not available:", apiError);
            // Continue even if API fails
          }
        }

        return {
          success: true,
          code: "success",
          message: `Welcome ${signUp?.firstName || signIn?.firstName || ''}! You have successfully signed in with Google`,
        };
      }
    }

    return {
      success: false,
      message: "An error occurred while signing in with Google",
    };
  } catch (err: any) {
    console.error("Google OAuth error:", err);
    
    // Handle session exists case
    if (err.code === "session_exists") {
      return {
        success: true,
        code: "session_exists",
        message: "Welcome back! Redirecting to home screen.",
      };
    }

    return {
      success: false,
      code: err.code,
      message: err?.errors?.[0]?.longMessage || "An error occurred while signing in with Google",
    };
  }
};