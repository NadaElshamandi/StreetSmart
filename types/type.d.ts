import { TextInputProps, TouchableOpacityProps, TextStyle, ViewStyle, ImageStyle } from "react-native";

// Tour Guide Types
declare interface Landmark {
  id: number;
  name: string;
  description: string;
  category: string;
  latitude: number;
  longitude: number;
  address: string;
  image_url?: string;
  rating: number;
  is_favorite: boolean;
  created_at: string;
  opening_hours?: string;
  entrance_fee?: string;
  website?: string;
}

declare interface LandmarkCardProps {
  item: Landmark;
  onPress: (landmark: Landmark) => void;
  onFavoritePress: (landmark: Landmark) => void;
}

declare interface FavoritesStore {
  favorites: Landmark[];
  addToFavorites: (landmark: Landmark) => void;
  removeFromFavorites: (landmarkId: number) => void;
  isFavorite: (landmarkId: number) => boolean;
}

// Map marker data for landmarks
declare interface LandmarkMarkerData {
  latitude: number;
  longitude: number;
  id: number;
  title: string;
  name: string;
  description: string;
  category: string;
  address: string;
  rating: number;
  is_favorite: boolean;
}

declare interface MapProps {
  destinationLatitude?: number;
  destinationLongitude?: number;
  selectedLandmark?: number | null;
  onMapReady?: () => void;
}

declare interface ButtonProps extends TouchableOpacityProps {
  title: string;
  bgVariant?: "primary" | "secondary" | "danger" | "outline" | "success";
  textVariant?: "primary" | "default" | "secondary" | "danger" | "success";
  IconLeft?: React.ComponentType<any>;
  IconRight?: React.ComponentType<any>;
  className?: string;
}

declare interface GoogleInputProps {
  icon?: string;
  initialLocation?: string;
  containerStyle?: string;
  textInputBackgroundColor?: string;
  handlePress: ({
    latitude,
    longitude,
    address,
  }: {
    latitude: number;
    longitude: number;
    address: string;
  }) => void;
}

declare interface InputFieldProps extends TextInputProps {
  label: string;
  icon?: any;
  secureTextEntry?: boolean;
  labelStyle?: TextStyle;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  iconStyle?: ImageStyle;
  className?: string;
}

declare interface LocationStore {
  userLatitude: number | null;
  userLongitude: number | null;
  userAddress: string | null;
  destinationLatitude: number | null;
  destinationLongitude: number | null;
  destinationAddress: string | null;
  setUserLocation: ({
    latitude,
    longitude,
    address,
  }: {
    latitude: number;
    longitude: number;
    address: string;
  }) => void;
  setDestinationLocation: ({
    latitude,
    longitude,
    address,
  }: {
    latitude: number;
    longitude: number;
    address: string;
  }) => void;
}

declare interface LandmarkStore {
  landmarks: LandmarkMarkerData[];
  selectedLandmark: number | null;
  setSelectedLandmark: (landmarkId: number) => void;
  setLandmarks: (landmarks: LandmarkMarkerData[]) => void;
  clearSelectedLandmark: () => void;
}