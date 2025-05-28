import React from "react";
import { Text, View } from "react-native";

const Map = () => {
  return (
    <View className="w-full h-full rounded-2xl bg-gray-200 flex justify-center items-center">
      <Text className="text-gray-500 text-center">
        Map functionality temporarily disabled
      </Text>
      <Text className="text-gray-400 text-sm text-center mt-2">
        Configure react-native-maps to enable
      </Text>
    </View>
  );
};

export default Map;