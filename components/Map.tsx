import React, { useEffect, useState } from "react";
import { ActivityIndicator, Text, View, StyleSheet } from "react-native";
import MapView, { Marker, PROVIDER_DEFAULT } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";

import { icons } from "@/constants";
import { mockLandmarks } from "@/constants/mockData";
import {
  calculateRegion,
  generateMarkersFromLandmarks,
} from "@/lib/map";
import { useLandmarkStore, useLocationStore } from "@/store";
import { Landmark, LandmarkMarkerData } from "@/types/type";

const directionsAPI = process.env.EXPO_PUBLIC_DIRECTIONS_API_KEY;

const Map = () => {
  const {
    userLongitude,
    userLatitude,
    destinationLatitude,
    destinationLongitude,
  } = useLocationStore();
  const { selectedLandmark, setLandmarks } = useLandmarkStore();

  // Using mock data for landmarks
  const landmarks: Landmark[] = mockLandmarks;
  const loading = false;
  const error = null;

  const [markers, setMarkers] = useState<LandmarkMarkerData[]>([]);

  useEffect(() => {
    if (Array.isArray(landmarks)) {
      const newMarkers = generateMarkersFromLandmarks({
        data: landmarks,
      });

      setMarkers(newMarkers);
      setLandmarks(newMarkers);
    }
  }, [landmarks, setLandmarks]);

  const region = calculateRegion({
    userLatitude,
    userLongitude,
    destinationLatitude,
    destinationLongitude,
  });

  // Debug logging
  console.log("Map component rendering with:", {
    userLatitude,
    userLongitude,
    region,
    markersCount: markers.length,
    loading,
    error
  });

  // Only show loading if there's an actual loading state, not just missing user location
  if (loading)
    return (
      <View className="flex justify-between items-center w-full">
        <ActivityIndicator size="small" color="#000" />
      </View>
    );

  if (error)
    return (
      <View className="flex justify-between items-center w-full">
        <Text>Error: {error}</Text>
      </View>
    );

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_DEFAULT}
        style={styles.map}
        mapType="standard"
        showsPointsOfInterest={false}
        initialRegion={region}
        showsUserLocation={true}
        userInterfaceStyle="light"
        onMapReady={() => console.log("Map is ready!")}
        onRegionChange={(region) => console.log("Region changed:", region)}
      >
        {markers.map((marker, index) => (
          <Marker
            key={marker.id}
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude,
            }}
            title={marker.title}
            description={marker.description}
            pinColor={selectedLandmark === +marker.id ? "red" : "blue"}
          />
        ))}

        {destinationLatitude && destinationLongitude && (
          <>
            <Marker
              key="destination"
              coordinate={{
                latitude: destinationLatitude,
                longitude: destinationLongitude,
              }}
              title="Destination"
              pinColor="green"
            />
            {userLatitude && userLongitude && (
              <MapViewDirections
                origin={{
                  latitude: userLatitude,
                  longitude: userLongitude,
                }}
                destination={{
                  latitude: destinationLatitude,
                  longitude: destinationLongitude,
                }}
                apikey={directionsAPI!}
                strokeColor="#0286FF"
                strokeWidth={2}
              />
            )}
          </>
        )}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 12,
    overflow: 'hidden',
  },
  map: {
    width: '100%',
    height: '100%',
  },
});

export default Map;