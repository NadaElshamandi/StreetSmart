import React from "react";
import { useUser, useAuth } from "@clerk/clerk-expo";
import * as Location from "expo-location";
import { router } from "expo-router";
import { useState, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import GoogleTextInput from "@/components/GoogleTextInput";
import Map from "@/components/Map";
import LandmarkCard from "@/components/LandmarkCard";
import { icons } from "@/constants";
import { mockLandmarks } from "@/constants/mockData";
import { useLocationStore, useFavoritesStore } from "@/store";
import { Landmark } from "@/types/type";

const Home = () => {
  const { user, isLoaded } = useUser();
  const { signOut, isSignedIn } = useAuth();

  const { setUserLocation, setDestinationLocation } = useLocationStore();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavoritesStore();

  // Debug user data with more detailed logging
  useEffect(() => {
    console.log("=== HOME SCREEN DEBUG ===");
    console.log("isLoaded:", isLoaded);
    console.log("isSignedIn:", isSignedIn);
    console.log("user exists:", !!user);
    
    if (isLoaded && user) {
      console.log("User data:", {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        fullName: user.fullName,
        emailAddress: user.primaryEmailAddress?.emailAddress,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      });
    } else if (isLoaded && !user) {
      console.log("User is loaded but no user data available");
    } else {
      console.log("User data is still loading...");
    }
  }, [isLoaded, user, isSignedIn]);

  const handleSignOut = async () => {
    try {
      await signOut();
      router.replace("/(auth)/welcome");
    } catch (error) {
      console.error("Sign out error:", error);
      // Force navigation even if sign out fails
      router.replace("/(auth)/welcome");
    }
  };

  const [hasPermission, setHasPermission] = useState<boolean>(false);

  // Temporarily disable API calls until backend is set up
  // const {
  //   data: landmarks,
  //   loading,
  //   error,
  // } = useFetch<Landmark[]>(`/(api)/landmarks`);

  // Mock data for development
  const landmarks: Landmark[] = mockLandmarks;
  const loading = false;

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setHasPermission(false);
        return;
      }

      let location = await Location.getCurrentPositionAsync({});

      const address = await Location.reverseGeocodeAsync({
        latitude: location.coords?.latitude!,
        longitude: location.coords?.longitude!,
      });

      setUserLocation({
        latitude: location.coords?.latitude,
        longitude: location.coords?.longitude,
        address: `${address[0].name}, ${address[0].region}`,
      });
    })();
  }, [setUserLocation]);

  const handleDestinationPress = (location: {
    latitude: number;
    longitude: number;
    address: string;
  }) => {
    setDestinationLocation(location);
    // Navigate to directions/map view instead of find-ride
    router.push("/(root)/FindDirections");
  };

  const handleLandmarkPress = (landmark: Landmark) => {
    // Set the landmark as destination and navigate to directions
    setDestinationLocation({
      latitude: landmark.latitude,
      longitude: landmark.longitude,
      address: landmark.address,
    });
    router.push("/(root)/FindDirections");
  };

  const handleFavoritePress = (landmark: Landmark) => {
    if (isFavorite(landmark.id)) {
      removeFromFavorites(landmark.id);
    } else {
      addToFavorites(landmark);
    }
  };

  // Get the user's name for welcome message with better debugging
  const getUserName = () => {
    console.log("getUserName called - isLoaded:", isLoaded, "user:", !!user);
    
    if (!isLoaded) {
      console.log("User data not loaded yet");
      return "...";
    }
    
    if (!user) {
      console.log("No user data available");
      return "there";
    }
    
    // Try firstName first, then fallback to fullName, then email
    if (user.firstName) {
      console.log("Using firstName:", user.firstName);
      return user.firstName;
    } else if (user.fullName) {
      const firstName = user.fullName.split(' ')[0];
      console.log("Using first part of fullName:", firstName);
      return firstName;
    } else if (user.primaryEmailAddress?.emailAddress) {
      const emailName = user.primaryEmailAddress.emailAddress.split('@')[0];
      console.log("Using email username:", emailName);
      return emailName;
    }
    
    console.log("No name found, using fallback");
    return "there";
  };

  // Show loading state while user data is loading
  if (!isLoaded) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#F6F8FA', justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#3B82F6" />
        <Text style={{ marginTop: 16, fontSize: 16, color: '#6B7280' }}>Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F6F8FA' }}>
      <FlatList
        data={landmarks?.slice(0, 5)}
        renderItem={({ item }) => (
          <LandmarkCard
            item={{ ...item, is_favorite: isFavorite(item.id) }}
            onPress={handleLandmarkPress}
            onFavoritePress={handleFavoritePress}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          paddingBottom: 100,
        }}
        ListEmptyComponent={() => (
          <View style={{
            flex: 1,
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop: 40,
          }}>
            {!loading ? (
              <>
                <Text style={{
                  fontSize: 18,
                  fontWeight: 'bold',
                  color: '#9CA3AF',
                  marginTop: 40,
                }}>
                  No landmarks found
                </Text>
                <Text style={{
                  fontSize: 14,
                  color: '#6B7280',
                  marginTop: 8,
                }}>
                  Discover amazing places around you!
                </Text>
              </>
            ) : (
              <ActivityIndicator size="small" color="#000" />
            )}
          </View>
        )}
        ListHeaderComponent={
          <>
            {/* Enhanced Header with Welcome and Sign Out */}
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginVertical: 20,
              marginHorizontal: 20,
            }}>
              <View style={{ flex: 1 }}>
                <Text style={{
                  fontSize: 28,
                  fontWeight: '800',
                  color: '#111827',
                  marginBottom: 4,
                }}>
                  Welcome {getUserName()}! 👋
                </Text>
                <Text style={{
                  fontSize: 16,
                  color: '#6B7280',
                  fontWeight: '500',
                }}>
                  Ready to explore amazing places?
                </Text>
              </View>
              <TouchableOpacity
                onPress={handleSignOut}
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: 'white',
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 1,
                  },
                  shadowOpacity: 0.2,
                  shadowRadius: 2,
                  elevation: 3,
                }}
              >
                <Text style={{
                  color: '#EF4444',
                  fontWeight: 'bold',
                  fontSize: 16,
                }}>×</Text>
              </TouchableOpacity>
            </View>

            {/* Search Input */}
            <View style={{ marginHorizontal: 20, marginBottom: 20 }}>
              <GoogleTextInput
                icon={icons.search}
                handlePress={handleDestinationPress}
              />
            </View>

            {/* Current Location Section */}
            <View style={{ marginHorizontal: 20 }}>
              <Text style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: '#111827',
                marginTop: 20,
                marginBottom: 12,
              }}>
                Your current location
              </Text>
              
              <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: 'transparent',
                height: 300,
                borderRadius: 12,
                overflow: 'hidden',
              }}>
                <Map />
              </View>
            </View>

            {/* Popular Landmarks Section */}
            <Text style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: '#111827',
              marginTop: 20,
              marginBottom: 12,
              marginHorizontal: 20,
            }}>
              Popular destinations
            </Text>
          </>
        }
      />
    </SafeAreaView>
  );
};

export default Home;