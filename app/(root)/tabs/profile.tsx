import React from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Profile = () => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 justify-center items-center">
        <Text className="text-2xl font-JakartaBold">Profile</Text>
        <Text className="text-gray-500 mt-2">User profile information</Text>
      </View>
    </SafeAreaView>
  );
};

export default Profile; 