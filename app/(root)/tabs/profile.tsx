import { useUser } from "@clerk/clerk-expo";
import { Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import InputField from "@/components/InputField";

const Profile = () => {
  const { user } = useUser();

  // Default profile picture URL
  const defaultProfileImage = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView
        className="px-6 py-4"
        contentContainerStyle={{ paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      >

        <View className="flex items-center justify-center my-8 w-full">
          <Image
            source={{
              uri: user?.externalAccounts[0]?.imageUrl ?? user?.imageUrl ?? defaultProfileImage,
            }}
            style={{ 
              width: 110, 
              height: 110, 
              borderRadius: 55,
              alignSelf: 'center'
            }}
            className="rounded-full border-[3px] border-white shadow-sm shadow-neutral-300"
          />
        </View>

        <View className="flex flex-col items-start justify-center bg-white rounded-lg shadow-sm shadow-neutral-300 px-6 py-6 mx-2">
          <View className="flex flex-col items-start justify-start w-full">
            <InputField
              label="First name"
              placeholder={user?.firstName || "Not Found"}
              containerStyle={{ width: "100%", marginBottom: 20 }}
              inputStyle={{ padding: 14 }}
              editable={false}
            />

            <InputField
              label="Last name"
              placeholder={user?.lastName || "Not Found"}
              containerStyle={{ width: "100%", marginBottom: 20 }}
              inputStyle={{ padding: 14 }}
              editable={false}
            />

            <InputField
              label="Email"
              placeholder={
                user?.primaryEmailAddress?.emailAddress || "Not Found"
              }
              containerStyle={{ width: "100%", marginBottom: 20 }}
              inputStyle={{ padding: 14 }}
              editable={false}
            />

            <InputField
              label="Phone"
              placeholder={user?.primaryPhoneNumber?.phoneNumber || "Not Found"}
              containerStyle={{ width: "100%", marginBottom: 0 }}
              inputStyle={{ padding: 14 }}
              editable={false}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;