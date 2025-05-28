import { Image, Text, View, TouchableOpacity } from "react-native";

import { icons } from "@/constants";
import { formatDate } from "@/lib/utils";
import { LandmarkCardProps } from "@/types/type";

const LandmarkCard = ({ item, onPress, onFavoritePress }: LandmarkCardProps) => {
  const apiKey = process.env.EXPO_PUBLIC_GEOAPIFY_API_KEY;
  
  // Simplified Geoapify URL without markers first, then we can add them back
  const mapImageUrl = apiKey 
    ? `https://maps.geoapify.com/v1/staticmap?style=osm-bright&width=600&height=400&center=lonlat:${item.longitude},${item.latitude}&zoom=14&apiKey=${apiKey}`
    : null;

  console.log('API Key exists:', !!apiKey);
  console.log('Simplified Map URL:', mapImageUrl);

  return (
    <TouchableOpacity 
      onPress={() => onPress(item)}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        marginHorizontal: 20,
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
      {/* Map Image - Left Side */}
      {mapImageUrl ? (
        <Image
          source={{ uri: mapImageUrl }}
          style={{
            width: 80,
            height: 90,
            borderRadius: 8,
            backgroundColor: '#f3f4f6', // Gray background while loading
          }}
          resizeMode="cover"
          onError={(error) => {
            console.log('Map image load error for', item.name, ':', error.nativeEvent.error);
            console.log('Failed URL:', mapImageUrl);
          }}
          onLoad={() => {
            console.log('Map image loaded successfully for:', item.name);
          }}
          onLoadStart={() => {
            console.log('Map image loading started for:', item.name);
          }}
        />
      ) : (
        <View style={{
          width: 80,
          height: 90,
          borderRadius: 8,
          backgroundColor: '#e5e7eb',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <Image 
            source={icons.location} 
            style={{ 
              width: 32, 
              height: 32, 
              tintColor: '#9CA3AF' 
            }} 
          />
          <Text style={{
            fontSize: 10,
            color: '#6b7280',
            textAlign: 'center',
            marginTop: 4,
          }}>Map</Text>
        </View>
      )}

      {/* Content - Right Side */}
      <View style={{ flex: 1, marginLeft: 16 }}>
        {/* Header with title and favorite button */}
        <View style={{
          flexDirection: 'row',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          marginBottom: 12,
        }}>
          <View style={{ flex: 1 }}>
            <Text style={{
              fontSize: 18,
              fontWeight: 'bold',
              color: '#111827',
              marginBottom: 4,
            }} numberOfLines={1}>
              {item.name}
            </Text>
            <Text style={{
              fontSize: 14,
              color: '#6b7280',
              lineHeight: 20,
            }} numberOfLines={2}>
              {item.description}
            </Text>
          </View>
          
          <TouchableOpacity
            onPress={() => onFavoritePress(item)}
            style={{
              marginLeft: 8,
              padding: 4,
            }}
          >
            <Image
              source={icons.wishlist}
              style={{
                width: 24,
                height: 24,
                tintColor: item.is_favorite ? "#EF4444" : "#9CA3AF",
              }}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>

        {/* Location and Category */}
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 8,
        }}>
          <Image 
            source={icons.point} 
            style={{ 
              width: 16, 
              height: 16, 
              tintColor: '#6B7280' 
            }} 
          />
          <Text style={{
            fontSize: 14,
            color: '#6b7280',
            marginLeft: 8,
            flex: 1,
          }} numberOfLines={1}>
            {item.address}
          </Text>
        </View>

        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 8,
        }}>
          <Text style={{
            fontSize: 14,
            color: '#6b7280',
          }}>
            {item.category}
          </Text>
          <Text style={{
            fontSize: 14,
            color: '#d1d5db',
            marginHorizontal: 8,
          }}>•</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{
              fontSize: 14,
              color: '#f59e0b',
            }}>★</Text>
            <Text style={{
              fontSize: 14,
              color: '#6b7280',
              marginLeft: 4,
            }}>
              {item.rating.toFixed(1)}
            </Text>
          </View>
        </View>

        {/* Additional Info */}
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          {item.opening_hours && (
            <Text style={{
              fontSize: 12,
              color: '#6b7280',
            }}>
              {item.opening_hours}
            </Text>
          )}
          <Text style={{
            fontSize: 12,
            color: item.entrance_fee ? '#059669' : '#6b7280',
            fontWeight: '500',
          }}>
            {item.entrance_fee || 'Free'}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default LandmarkCard; 