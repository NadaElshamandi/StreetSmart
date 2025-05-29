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
  // Enhanced API key validation
  console.log("=== GOOGLE PLACES API DEBUG ===");
  console.log("API Key exists:", !!googlePlacesApiKey);
  console.log("API Key length:", googlePlacesApiKey?.length || 0);
  console.log("API Key first 10 chars:", googlePlacesApiKey?.substring(0, 10) || "N/A");
  
  if (!googlePlacesApiKey) {
    console.error("❌ Google Places API key is NOT configured!");
    console.log("Please create a .env file in your project root with:");
    console.log("EXPO_PUBLIC_GOOGLE_API_KEY=your_actual_api_key_here");
    return (
      <View style={{
        height: 50,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        backgroundColor: textInputBackgroundColor || '#f5f5f5',
        paddingHorizontal: 15,
        flexDirection: 'row',
        alignItems: 'center',
      }}>
        <Image
          source={icon ? icon : icons.search}
          style={{
            width: 20,
            height: 20,
            marginRight: 10,
          }}
          resizeMode="contain"
        />
        <Text style={{ color: '#999', fontSize: 16 }}>
          Google API key not configured
        </Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
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
            handlePress({
              latitude: 0,
              longitude: 0,
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
            height: 50,
            borderWidth: 1,
            borderColor: '#ccc',
            borderRadius: 8,
            backgroundColor: textInputBackgroundColor || '#f5f5f5',
            paddingHorizontal: 15,
            shadowColor: 'transparent',
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0,
            shadowRadius: 0,
            elevation: 0,
          },
          textInput: {
            backgroundColor: 'transparent',
            height: '100%',
            borderRadius: 0,
            paddingVertical: 0,
            paddingHorizontal: 0,
            fontSize: 16,
            flex: 1,
            color: '#000',
            marginLeft: 10,
          },
          listView: {
            backgroundColor: textInputBackgroundColor || 'white',
            borderRadius: 8,
            marginTop: 5,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
            maxHeight: 150,
            position: 'absolute',
            top: 55,
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
          <Image
            source={icon ? icon : icons.search}
            style={{
              width: 20,
              height: 20,
            }}
            resizeMode="contain"
          />
        )}
        textInputProps={{
          placeholderTextColor: "#666",
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
          console.error("❌ GooglePlacesAutocomplete error:", error);
        }}
        onNotFound={() => {
          console.log("⚠️ No results found");
        }}
        onTimeout={() => {
          console.error("⏰ Request timeout - check your internet connection");
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