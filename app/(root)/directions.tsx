import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { useLocationStore } from "@/store";
import Map from "@/components/Map";

const Directions = () => {
  const { 
    userAddress, 
    destinationAddress, 
    userLatitude, 
    userLongitude,
    destinationLatitude,
    destinationLongitude 
  } = useLocationStore();

  const handleGetDirections = () => {
    // This would integrate with a maps app or show detailed directions
    // For now, we'll just show a placeholder
    console.log("Getting directions from", userAddress, "to", destinationAddress);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1">
        {/* Header */}
        <View className="flex-row items-center justify-between p-5 bg-white shadow-sm">
          <TouchableOpacity
            onPress={() => router.back()}
            className="w-10 h-10 rounded-full bg-gray-100 items-center justify-center"
          >
            <Text className="text-lg font-bold">←</Text>
          </TouchableOpacity>
          <Text className="text-lg font-JakartaBold">Directions</Text>
          <View className="w-10" />
        </View>

        {/* Route Info */}
        <View className="p-5 bg-gray-50">
          <View className="mb-3">
            <Text className="text-sm text-gray-500">From</Text>
            <Text className="text-base font-JakartaMedium">
              {userAddress || "Your current location"}
            </Text>
          </View>
          <View>
            <Text className="text-sm text-gray-500">To</Text>
            <Text className="text-base font-JakartaMedium">
              {destinationAddress || "Select a destination"}
            </Text>
          </View>
        </View>

        {/* Map */}
        <View className="flex-1">
          <Map 
            destinationLatitude={destinationLatitude}
            destinationLongitude={destinationLongitude}
          />
        </View>

        {/* Get Directions Button */}
        <View className="p-5 bg-white">
          <TouchableOpacity
            onPress={handleGetDirections}
            className="bg-blue-500 rounded-lg p-4 items-center"
          >
            <Text className="text-white font-JakartaBold text-lg">
              Get Directions
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Directions; 