import { View, Image, Text } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

import { icons } from "@/constants";
import { GoogleInputProps } from "@/types/type";

const googlePlacesApiKey = process.env.EXPO_PUBLIC_GOOGLE_API_KEY;

const GoogleTextInput = ({
  icon,
  initialLocation,
  containerStyle,
  textInputBackgroundColor,
  handlePress,
}: GoogleInputProps) => {
  // Add validation for API key
  if (!googlePlacesApiKey) {
    console.warn("Google Places API key is not configured");
  } else {
    console.log("Google Places API key is configured");
    // Test API connectivity
    console.log("API Key length:", googlePlacesApiKey.length);
  }

  return (
    <View
      className={`flex flex-row items-center justify-center relative rounded-xl ${containerStyle}`}
    >
      <GooglePlacesAutocomplete
        placeholder="Search"
        onPress={(data, details = null) => {
          console.log("=== PLACE SELECTION EVENT ===");
          console.log("Place selected:", data);
          console.log("Details received:", details);
          
          if (details?.geometry?.location) {
            console.log("Using details for coordinates");
            handlePress({
              latitude: details.geometry.location.lat,
              longitude: details.geometry.location.lng,
              address: data.description,
            });
          } else {
            console.log("No details available, using place_id to fetch details");
            // Fallback: if details are not available, we can still use the place data
            // For now, let's just use the description and try to geocode it
            handlePress({
              latitude: 0, // Placeholder - you might want to geocode this
              longitude: 0, // Placeholder - you might want to geocode this
              address: data.description,
            });
          }
        }}
        query={{
          key: googlePlacesApiKey,
          language: 'en',
        }}
        fetchDetails={true}
        enablePoweredByContainer={false}
        styles={{
          container: {
            flex: 1,
            zIndex: 1,
          },
          textInputContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: textInputBackgroundColor || 'white',
            borderRadius: 20,
            paddingHorizontal: 15,
            shadowColor: '#d4d4d4',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          },
          textInput: {
            backgroundColor: 'transparent',
            height: 44,
            borderRadius: 5,
            paddingVertical: 5,
            paddingHorizontal: 10,
            fontSize: 15,
            flex: 1,
          },
          listView: {
            backgroundColor: textInputBackgroundColor || 'white',
            borderRadius: 10,
            marginTop: 5,
            shadowColor: '#d4d4d4',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
            maxHeight: 150,
            position: 'absolute',
            top: 50,
            left: 0,
            right: 0,
            zIndex: 1000,
          },
          row: {
            backgroundColor: 'white',
            padding: 13,
            minHeight: 44,
            flexDirection: 'row',
            alignItems: 'center',
          },
          separator: {
            height: 1,
            backgroundColor: '#c8c7cc',
          },
          description: {
            fontSize: 14,
            color: '#333',
          },
          loader: {
            flexDirection: 'row',
            justifyContent: 'flex-end',
            height: 20,
          },
        }}
        renderLeftButton={() => (
          <View className="justify-center items-center w-6 h-6 mr-2">
            <Image
              source={icon ? icon : icons.search}
              className="w-6 h-6"
              resizeMode="contain"
            />
          </View>
        )}
        textInputProps={{
          placeholderTextColor: "gray",
          placeholder: initialLocation ?? "Where do you want to go?",
          autoCorrect: false,
          autoCapitalize: 'none',
        }}
        debounce={300}
        minLength={2}
        keyboardShouldPersistTaps="handled"
        listViewDisplayed="auto"
        renderRow={(data) => (
          <View style={{ padding: 10 }}>
            <Text style={{ fontSize: 14 }}>{data.description}</Text>
          </View>
        )}
        onFail={(error) => {
          console.log("GooglePlacesAutocomplete error:", error);
        }}
        onNotFound={() => {
          console.log("No results found");
        }}
        onTimeout={() => {
          console.log("Request timeout");
        }}
        timeout={20000}
        keepResultsAfterBlur={false}
        predefinedPlaces={[]}
        currentLocation={false}
        nearbyPlacesAPI="GooglePlacesSearch"
        GooglePlacesDetailsQuery={{
          fields: 'formatted_address,geometry,name,place_id',
        }}
        predefinedPlacesAlwaysVisible={false}
        listUnderlayColor="transparent"
        suppressDefaultStyles={false}
      />
    </View>
  );
};

export default GoogleTextInput;