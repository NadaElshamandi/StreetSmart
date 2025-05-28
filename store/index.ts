import { create } from "zustand";

import { DriverStore, LocationStore, MarkerData, FavoritesStore, Landmark } from "@/types/type";

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

    // if driver is selected and now new location is set, clear the selected driver
    const { selectedDriver, clearSelectedDriver } = useDriverStore.getState();
    if (selectedDriver) clearSelectedDriver();
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

    // if driver is selected and now new location is set, clear the selected driver
    const { selectedDriver, clearSelectedDriver } = useDriverStore.getState();
    if (selectedDriver) clearSelectedDriver();
  },
}));

export const useDriverStore = create<DriverStore>((set) => ({
  drivers: [] as MarkerData[],
  selectedDriver: null,
  setSelectedDriver: (driverId: number) =>
    set(() => ({ selectedDriver: driverId })),
  setDrivers: (drivers: MarkerData[]) => set(() => ({ drivers })),
  clearSelectedDriver: () => set(() => ({ selectedDriver: null })),
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