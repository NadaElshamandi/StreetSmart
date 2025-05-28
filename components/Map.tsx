import React from "react";
import { Text, View } from "react-native";
import { MapProps } from "@/types/type";

const Map = ({ 
  destinationLatitude, 
  destinationLongitude, 
  onDriverTimesCalculated, 
  onMapReady 
}: MapProps) => {
  return (
    <View className="w-full h-full rounded-2xl bg-gray-200 flex justify-center items-center">
      <Text className="text-gray-500 text-center">
        Map functionality temporarily disabled
      </Text>
      <Text className="text-gray-400 text-sm text-center mt-2">
        Configure react-native-maps to enable
      </Text>
      {destinationLatitude && destinationLongitude && (
        <Text className="text-gray-400 text-xs text-center mt-2">
          Destination: {destinationLatitude.toFixed(4)}, {destinationLongitude.toFixed(4)}
        </Text>
      )}
    </View>
  );
};

export default Map;