import { Tabs } from "expo-router";
import { Image, ImageSourcePropType, View, Text } from "react-native";

import { icons } from "@/constants";

const TabIcon = ({
  source,
  focused,
  title,
}: {
  source: ImageSourcePropType;
  focused: boolean;
  title: string;
}) => (
  <View className="flex items-center justify-center gap-1">
    <View
      className={`w-6 h-6 items-center justify-center ${
        focused ? "opacity-100" : "opacity-60"
      }`}
    >
      <Image
        source={source}
        tintColor={focused ? "white" : "#A0A0A0"}
        resizeMode="contain"
        className="w-6 h-6"
      />
    </View>
    <Text
      className={`text-[10px] font-medium ${
        focused ? "text-white" : "text-white opacity-60"
      }`}
    >
      {title}
    </Text>
  </View>
);

export default function Layout() {
  return (
    <Tabs
      initialRouteName="home"
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#1A1A1A",
          borderTopWidth: 0,
          paddingTop: 12,
          paddingBottom: 12,
          paddingHorizontal: 20,
          height: 70,
          width: "100%",
          position: "absolute",
          bottom: 0,
          left: 0,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: -2,
          },
          shadowOpacity: 0.3,
          shadowRadius: 8,
          elevation: 10,
        },
        tabBarItemStyle: {
          flex: 1,
          marginHorizontal: 30,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon source={icons.home} focused={focused} title="Home" />
          ),
        }}
      />
      <Tabs.Screen
        name="wishlist"
        options={{
          title: "Wishlist",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon source={icons.wishlist} focused={focused} title="Wishlist" />
          ),
        }}
      />
      <Tabs.Screen
        name="notifications"
        options={{
          title: "Notifications",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon source={icons.notification} focused={focused} title="Alerts" />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon source={icons.profile} focused={focused} title="Profile" />
          ),
        }}
      />
      <Tabs.Screen
        name="Directions"
        options={{
          title: "Directions",
          headerShown: false,
          href: null,
        }}
      />
    </Tabs>
  );
}