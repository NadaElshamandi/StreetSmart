import { Text, View } from "react-native";
import { Link } from "expo-router";

export default function Index() {
  return (
    <View className="flex-1 justify-center items-center">
      <Text className="font-bold text-lg my-10">Welcome to ReState</Text>

      <Link href="/sign-in">
        <Text className="text-blue-500">Sign In</Text>
      </Link>
      <Link href="/explore">
        <Text className="text-blue-500">Explore</Text>
      </Link>
      <Link href="/profile">
        <Text className="text-blue-500">Profile</Text>
      </Link>
      <Link href="/properties/1">
        <Text className="text-blue-500">Property</Text>
      </Link>
    </View>
  );
}
