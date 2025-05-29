import React, { useEffect, useRef } from "react";
import { Text, View, Animated, Dimensions, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

import Map from "@/components/Map";
import GoogleTextInput from "@/components/GoogleTextInput";
import { useLocationStore } from "@/store";
import { icons } from "@/constants";

const { height: screenHeight } = Dimensions.get('window');

const Directions = () => {
  const {
    userAddress,
    destinationAddress,
    setDestinationLocation,
    setUserLocation,
  } = useLocationStore();

  const slideAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Start the animation after a short delay
    const timer = setTimeout(() => {
      Animated.timing(slideAnim, {
        toValue: -screenHeight * 0.6, // Move up by 60% of screen height
        duration: 1000,
        useNativeDriver: true,
      }).start();
    }, 500);

    return () => clearTimeout(timer);
  }, [slideAnim]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#ffffff' }}>
      {/* Full Screen Map Background */}
      <View style={{ 
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1,
      }}>
        <Map />
      </View>

      {/* Back Button */}
      <View style={{
        position: 'absolute',
        top: 60,
        left: 20,
        zIndex: 10,
      }}>
        <TouchableOpacity onPress={() => router.back()}>
          <View style={{
            width: 40,
            height: 40,
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            borderRadius: 20,
            alignItems: 'center',
            justifyContent: 'center',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          }}>
            <Image
              source={icons.back}
              resizeMode="contain"
              style={{ width: 24, height: 24 }}
            />
          </View>
        </TouchableOpacity>
      </View>

      {/* Animated Input Container */}
      <Animated.View 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 5,
          transform: [{ translateY: slideAnim }],
          backgroundColor: '#ffffff',
          paddingTop: 120,
          paddingBottom: 40,
          paddingHorizontal: 20,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        }}
      >
        <Text style={{ 
          fontSize: 24, 
          fontWeight: 'bold', 
          marginBottom: 30, 
          color: '#000',
          textAlign: 'center'
        }}>
          Directions
        </Text>

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
      </Animated.View>
    </SafeAreaView>
  );
};

export default Directions;
