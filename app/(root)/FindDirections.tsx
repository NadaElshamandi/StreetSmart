import { router } from "expo-router";
import { Text, View } from "react-native";

import CustomButton from "@/components/CustomButton";
import DirectionsLayout from "@/components/DirectionsLayout";
import GoogleTextInput from "@/components/GoogleTextInput";
import { useLocationStore } from "@/store";
import { icons } from "@/constants";

const FindDirections = () => {
  const {
    userAddress,
    destinationAddress,
    setDestinationLocation,
    setUserLocation,
  } = useLocationStore();

  return (
    <DirectionsLayout title="Directions">
      <View style={{ marginVertical: 12 }}>
        <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 12, color: '#000' }}>
          From
        </Text>
        <View style={{ height: 50, zIndex: 2 }}>
          <GoogleTextInput
            icon={icons.point}
            initialLocation={userAddress || "Enter starting location"}
            containerStyle=""
            textInputBackgroundColor="#f5f5f5"
            handlePress={({ latitude, longitude, address }) => {
              setUserLocation({
                latitude,
                longitude,
                address,
              });
            }}
          />
        </View>
      </View>

      <View style={{ marginVertical: 12 }}>
        <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 12, color: '#000' }}>
          To
        </Text>
        <View style={{ height: 50, zIndex: 1 }}>
          <GoogleTextInput
            icon={icons.location}
            initialLocation={destinationAddress || "Enter destination"}
            containerStyle=""
            textInputBackgroundColor="#ffffff"
            handlePress={({ latitude, longitude, address }) => {
              setDestinationLocation({
                latitude,
                longitude,
                address,
              });
            }}
          />
        </View>
      </View>

      <View style={{ marginTop: 20 }}>
        <CustomButton
          title="Start"
          onPress={() => router.push(`/(root)/confirm-directions`)}
          className="mt-5"
        />
      </View>
    </DirectionsLayout>
  );
};

export default FindDirections; 