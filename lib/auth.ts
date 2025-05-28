import * as Linking from "expo-linking";
import * as SecureStore from "expo-secure-store";

import { fetchAPI } from "../lib/fetch";

export const tokenCache = {
  async getToken(key: string) {
    try {
      const item = await SecureStore.getItemAsync(key);
      if (item) {
        console.log(`${key} was retrieved from secure storage 🔐`);
      } else {
        console.log("No token found for key: " + key);
      }
      return item;
    } catch (error) {
      console.error("SecureStore get item error: ", error);
      // Only delete if the error is related to corrupted data
      if (error instanceof Error && error.message.includes('corrupted')) {
        try {
          await SecureStore.deleteItemAsync(key);
          console.log(`Deleted corrupted token for key: ${key}`);
        } catch (deleteError) {
          console.error("Error deleting corrupted token:", deleteError);
        }
      }
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      await SecureStore.setItemAsync(key, value);
      console.log(`Token saved successfully for key: ${key} 🔐`);
      return;
    } catch (err) {
      console.error("SecureStore save item error: ", err);
      throw err;
    }
  },
  async deleteToken(key: string) {
    try {
      await SecureStore.deleteItemAsync(key);
      console.log(`Token deleted for key: ${key}`);
    } catch (error) {
      console.error("SecureStore delete item error: ", error);
    }
  },
};

export const googleOAuth = async (startOAuthFlow: any) => {
  try {
    const { createdSessionId, setActive, signUp } = await startOAuthFlow({
      redirectUrl: Linking.createURL("/(root)/tabs/home"),
    });

    if (createdSessionId) {
      if (setActive) {
        await setActive({ session: createdSessionId });

        if (signUp.createdUserId) {
          await fetchAPI("/(api)/user", {
            method: "POST",
            body: JSON.stringify({
              name: `${signUp.firstName} ${signUp.lastName}`,
              email: signUp.emailAddress,
              clerkId: signUp.createdUserId,
            }),
          });
        }

        return {
          success: true,
          code: "success",
          message: "You have successfully signed in with Google",
        };
      }
    }

    return {
      success: false,
      message: "An error occurred while signing in with Google",
    };
  } catch (err: any) {
    console.error(err);
    return {
      success: false,
      code: err.code,
      message: err?.errors[0]?.longMessage,
    };
  }
};