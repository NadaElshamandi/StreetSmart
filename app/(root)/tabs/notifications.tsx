import React from "react";
import { Text, View, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const notifications = () => {
  // For now, we'll use an empty array to simulate no notifications
  // This can be replaced with actual notification data from a store later
  const notificationsList: any[] = [];

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
            Notifications
          </Text>
        </View>

        {/* Notifications List */}
        <FlatList
          data={notificationsList}
          renderItem={({ item }) => (
            // This will be used when we have actual notifications
            <View className="bg-white mx-4 my-2 p-4 rounded-lg border border-gray-200">
              <Text className="text-gray-900 font-medium">{item.title}</Text>
              <Text className="text-gray-600 text-sm mt-1">{item.message}</Text>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
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
                You have no notifications.
              </Text>
              <Text style={{
                fontSize: 14,
                color: '#6B7280',
                textAlign: 'center',
              }}>
                When you receive notifications, they will appear here
              </Text>
            </View>
          )}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};

export default notifications; 