import { create } from "zustand";

import { LandmarkStore, LocationStore, LandmarkMarkerData, FavoritesStore, Landmark } from "@/types/type";

// Simple authentication store for managing auth state
interface AuthStore {
  hasCompletedOnboarding: boolean;
  setHasCompletedOnboarding: (completed: boolean) => void;
  isInitializing: boolean;
  setIsInitializing: (initializing: boolean) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  hasCompletedOnboarding: false,
  setHasCompletedOnboarding: (completed: boolean) =>
    set({ hasCompletedOnboarding: completed }),
  isInitializing: true,
  setIsInitializing: (initializing: boolean) =>
    set({ isInitializing: initializing }),
}));

export const useLocationStore = create<LocationStore>((set) => ({
  userLatitude: null,
  userLongitude: null,
  userAddress: null,
  destinationLatitude: null,
  destinationLongitude: null,
  destinationAddress: null,
  setUserLocation: ({
    latitude,
    longitude,
    address,
  }: {
    latitude: number;
    longitude: number;
    address: string;
  }) => {
    set(() => ({
      userLatitude: latitude,
      userLongitude: longitude,
      userAddress: address,
    }));
  },

  setDestinationLocation: ({
    latitude,
    longitude,
    address,
  }: {
    latitude: number;
    longitude: number;
    address: string;
  }) => {
    set(() => ({
      destinationLatitude: latitude,
      destinationLongitude: longitude,
      destinationAddress: address,
    }));
  },
}));

export const useLandmarkStore = create<LandmarkStore>((set) => ({
  landmarks: [] as LandmarkMarkerData[],
  selectedLandmark: null,
  setSelectedLandmark: (landmarkId: number) =>
    set(() => ({ selectedLandmark: landmarkId })),
  setLandmarks: (landmarks: LandmarkMarkerData[]) => set(() => ({ landmarks })),
  clearSelectedLandmark: () => set(() => ({ selectedLandmark: null })),
}));

export const useFavoritesStore = create<FavoritesStore>((set, get) => ({
  favorites: [],
  addToFavorites: (landmark: Landmark) => {
    set((state) => ({
      favorites: [...state.favorites, { ...landmark, is_favorite: true }],
    }));
  },
  removeFromFavorites: (landmarkId: number) => {
    set((state) => ({
      favorites: state.favorites.filter((landmark) => landmark.id !== landmarkId),
    }));
  },
  isFavorite: (landmarkId: number) => {
    const { favorites } = get();
    return favorites.some((landmark) => landmark.id === landmarkId);
  },
}));