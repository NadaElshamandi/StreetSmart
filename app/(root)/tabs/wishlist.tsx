import React from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const wishlist = () => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 justify-center items-center">
        <Text className="text-2xl font-JakartaBold">wishlist</Text>
        <Text className="text-gray-500 mt-2">Your ride history will appear here</Text>
      </View>
    </SafeAreaView>
  );
};

export default wishlist; 