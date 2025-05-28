# StreetSmart - Tour Guide App

A React Native Expo tour guide application that helps users discover landmarks, save favorites, and get directions to interesting places.

## Features

- 🗺️ **Interactive Maps**: View landmarks on maps with location markers
- ⭐ **Favorites System**: Save and manage favorite landmarks
- 🧭 **Directions**: Get directions to any landmark
- 🔍 **Search**: Search for destinations using Google Places API
- 📍 **Location Services**: Current location detection and display
- 🎨 **Modern UI**: Clean, responsive design with Tailwind CSS

## Mock Data

The app currently uses mock data for development purposes. The mock landmarks are stored in `constants/mockData.ts` and include:

### Sample Landmarks

1. **Central Park**
   - Category: Park
   - Location: New York, NY 10024
   - Rating: 4.6/5
   - Hours: 6:00 AM - 1:00 AM

2. **Statue of Liberty**
   - Category: Monument
   - Location: New York, NY 10004
   - Rating: 4.8/5
   - Hours: 9:00 AM - 5:00 PM
   - Entrance Fee: $25

3. **Brooklyn Bridge**
   - Category: Bridge
   - Location: New York, NY
   - Rating: 4.7/5
   - Hours: 24/7

4. **Times Square**
   - Category: Entertainment
   - Location: Manhattan, NY 10036
   - Rating: 4.2/5
   - Hours: 24/7

5. **Empire State Building**
   - Category: Architecture
   - Location: 350 5th Ave, New York, NY 10118
   - Rating: 4.5/5
   - Hours: 8:00 AM - 2:00 AM
   - Entrance Fee: $44

### Landmark Data Structure

```typescript
interface Landmark {
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
```

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_key_here
EXPO_PUBLIC_PLACES_API_KEY=your_google_places_api_key_here
EXPO_PUBLIC_GEOAPIFY_API_KEY=your_geoapify_api_key_here
EXPO_PUBLIC_DIRECTIONS_API_KEY=your_google_directions_api_key_here
```

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npx expo start
   ```

3. Run on your device:
   - Scan the QR code with Expo Go app
   - Or press `i` for iOS simulator
   - Or press `a` for Android emulator

## Tech Stack

- **React Native** with Expo
- **TypeScript** for type safety
- **Tailwind CSS** (NativeWind) for styling
- **Zustand** for state management
- **Clerk** for authentication
- **Google Places API** for location search
- **Geoapify API** for static maps
- **Expo Location** for GPS services

## Project Structure

```
app/
  (auth)/          # Authentication screens
  (root)/          # Main app screens
    tabs/          # Tab navigation screens
components/        # Reusable components
constants/         # Constants and mock data
lib/              # Utility functions
store/            # State management
types/            # TypeScript type definitions
```

## Development Notes

- Mock data is used for development and testing
- API integration is prepared but commented out
- Maps functionality requires API keys to be configured
- Location permissions are handled automatically
