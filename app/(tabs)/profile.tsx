import { useAuth } from "@clerk/expo";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfilePage() {
  const { signOut } = useAuth();
  const [isLoading, setIsLoading] = React.useState(false);

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      await signOut();
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 items-center justify-center px-8">
      <View className="w-full max-w-sm gap-4">
        <Text className="text-3xl font-RobotoBold text-center text-gray-900">
          Profile
        </Text>
        <TouchableOpacity
          className="w-full p-4 bg-red-500 rounded-2xl"
          onPress={handleLogout}
          disabled={isLoading}
        >
          <Text className="text-base text-center text-white font-RobotoBold">
            {isLoading ? "Logging out..." : "Logout"}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
