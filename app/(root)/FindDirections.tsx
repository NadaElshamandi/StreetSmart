import { router } from "expo-router";
import { Text, View, TextInput } from "react-native";

import CustomButton from "@/components/CustomButton";
import DirectionsLayout from "@/components/DirectionsLayout";
import { useLocationStore } from "@/store";

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
        <TextInput
          style={{
            height: 50,
            borderWidth: 1,
            borderColor: '#ccc',
            borderRadius: 8,
            paddingHorizontal: 15,
            backgroundColor: '#f5f5f5',
            fontSize: 16,
          }}
          placeholder="Enter starting location"
          value={userAddress || ''}
          onChangeText={(text) => {
            // For now, just update the address text
            // Later we can add geocoding to get coordinates
            setUserLocation({
              latitude: 0,
              longitude: 0,
              address: text,
            });
          }}
        />
      </View>

      <View style={{ marginVertical: 12 }}>
        <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 12, color: '#000' }}>
          To
        </Text>
        <TextInput
          style={{
            height: 50,
            borderWidth: 1,
            borderColor: '#ccc',
            borderRadius: 8,
            paddingHorizontal: 15,
            backgroundColor: '#ffffff',
            fontSize: 16,
          }}
          placeholder="Enter destination"
          value={destinationAddress || ''}
          onChangeText={(text) => {
            // For now, just update the address text
            // Later we can add geocoding to get coordinates
            setDestinationLocation({
              latitude: 0,
              longitude: 0,
              address: text,
            });
          }}
        />
      </View>

      <View style={{ marginTop: 20 }}>
        <CustomButton
          title="Find Now"
          onPress={() => router.push(`/(root)/confirm-directions`)}
          className="mt-5"
        />
      </View>
    </DirectionsLayout>
  );
};

export default FindDirections; 