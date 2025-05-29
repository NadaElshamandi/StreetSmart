import React from "react";
import { Text, View, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

import LandmarkCard from "@/components/LandmarkCard";
import { useFavoritesStore, useLocationStore } from "@/store";
import { Landmark } from "@/types/type";

const Wishlist = () => {
  const { favorites, removeFromFavorites, isFavorite } = useFavoritesStore();
  const { setDestinationLocation } = useLocationStore();

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
    // Remove from favorites when pressed in wishlist
    removeFromFavorites(landmark.id);
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="flex-1">
        {/* Header */}
        <View className="bg-white border-b border-gray-200">
          <Text style={{
            fontSize: 20,
            fontWeight: 'bold',
            color: '#111827',
            marginTop: 20,
            marginBottom: 12,
            marginHorizontal: 20,
          }}>
            Your Wishlist
          </Text>
        </View>

        {/* Favorites List */}
        <FlatList
          data={favorites}
          renderItem={({ item }) => (
            <LandmarkCard
              item={{ ...item, is_favorite: isFavorite(item.id) }}
              onPress={handleLandmarkPress}
              onFavoritePress={handleFavoritePress}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{
            paddingBottom: 100,
            flexGrow: 1,
          }}
          ListEmptyComponent={() => (
            <View className="flex-1 justify-center items-center px-8">
              <Text style={{
                fontSize: 18,
                fontWeight: '600',
                color: '#6B7280',
                textAlign: 'center',
                marginBottom: 8,
              }}>
                You have not added any destinations to your wishlist yet!
              </Text>
              <Text style={{
                fontSize: 14,
                color: '#6B7280',
                textAlign: 'center',
              }}>
                Tap the heart icon on any destination to save it here
              </Text>
            </View>
          )}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};

export default Wishlist; 