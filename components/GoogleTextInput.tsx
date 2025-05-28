import { View, Image, Text } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

import { icons } from "@/constants";
import { GoogleInputProps } from "@/types/type";

const googlePlacesApiKey = process.env.EXPO_PUBLIC_PLACES_API_KEY;

const GoogleTextInput = ({
  icon,
  initialLocation,
  containerStyle,
  textInputBackgroundColor,
  handlePress,
}: GoogleInputProps) => {
  // If no API key is provided, show a simple text input placeholder
  if (!googlePlacesApiKey) {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          zIndex: 50,
          borderRadius: 12,
          backgroundColor: 'white',
          padding: 16,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.1,
          shadowRadius: 3.84,
          elevation: 5,
        }}
      >
        <View style={{
          justifyContent: 'center',
          alignItems: 'center',
          width: 24,
          height: 24,
          marginRight: 12,
        }}>
          <Image
            source={icon ? icon : icons.search}
            style={{ width: 24, height: 24 }}
            resizeMode="contain"
          />
        </View>
        <Text style={{
          color: '#6B7280',
          flex: 1,
          fontSize: 16,
        }}>
          Google Places API key not configured
        </Text>
      </View>
    );
  }

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        zIndex: 50,
        borderRadius: 12,
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
      }}
    >
      <GooglePlacesAutocomplete
        fetchDetails={true}
        placeholder="Search destinations..."
        debounce={200}
        enablePoweredByContainer={false}
        suppressDefaultStyles={false}
        styles={{
          container: {
            flex: 1,
          },
          textInputContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: 'white',
            borderRadius: 12,
            paddingHorizontal: 16,
            paddingVertical: 12,
            marginHorizontal: 0,
            borderTopWidth: 0,
            borderBottomWidth: 0,
          },
          textInput: {
            backgroundColor: 'transparent',
            fontSize: 16,
            fontWeight: '400',
            color: '#111827',
            flex: 1,
            marginLeft: 8,
            marginTop: 0,
            marginBottom: 0,
            paddingTop: 0,
            paddingBottom: 0,
            borderRadius: 0,
          },
          listView: {
            backgroundColor: 'white',
            position: 'absolute',
            top: 60,
            left: 0,
            right: 0,
            borderRadius: 8,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.1,
            shadowRadius: 3.84,
            elevation: 5,
            zIndex: 1000,
          },
          row: {
            backgroundColor: 'white',
            padding: 13,
            height: 44,
            flexDirection: 'row',
          },
          separator: {
            height: 0.5,
            backgroundColor: '#E5E7EB',
          },
          description: {
            fontSize: 15,
            color: '#374151',
          },
          loader: {
            flexDirection: 'row',
            justifyContent: 'flex-end',
            height: 20,
          },
        }}
        onPress={(data, details = null) => {
          if (details?.geometry?.location) {
            handlePress({
              latitude: details.geometry.location.lat,
              longitude: details.geometry.location.lng,
              address: data.description,
            });
          }
        }}
        onFail={(error) => {
          console.log("Google Places API Error:", error);
        }}
        query={{
          key: googlePlacesApiKey,
          language: "en",
          types: "geocode",
        }}
        renderLeftButton={() => (
          <View style={{
            justifyContent: 'center',
            alignItems: 'center',
            width: 24,
            height: 24,
          }}>
            <Image
              source={icon ? icon : icons.search}
              style={{ 
                width: 20, 
                height: 20,
                tintColor: '#6B7280',
              }}
              resizeMode="contain"
            />
          </View>
        )}
        textInputProps={{
          placeholderTextColor: "#9CA3AF",
          placeholder: initialLocation ?? "Where do you want to go?",
          autoCapitalize: "none",
          autoCorrect: false,
        }}
      />
    </View>
  );
};

export default GoogleTextInput;