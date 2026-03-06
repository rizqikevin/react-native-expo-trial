import { Link } from "expo-router";
import React from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const register = () => {
  return (
    <SafeAreaView className="items-center justify-center flex-1 px-8">
      <View className="items-center">
        <Text className="text-[32px] font-RobotoRegular text-primary">
          Create Account
        </Text>
        <Text className=" text-[14px] text-gray-800 font-RobotoRegular">
          Sharing your moment with the world
        </Text>
      </View>
      <View className="flex w-full gap-4 mt-6">
        <TextInput
          placeholder="Username"
          className="px-4 py-2 text-base bg-gray-200 rounded-xl font-RobotoRegular"
        />
        <TextInput
          placeholder="Fullname"
          className="px-4 py-2 text-base bg-gray-200 rounded-xl font-RobotoRegular"
        />
        <TextInput
          placeholder="Email"
          className="px-4 py-2 text-base bg-gray-200 rounded-xl font-RobotoRegular"
        />
        <TextInput
          placeholder="Password"
          className="px-4 py-2 text-base bg-gray-200 font-RobotoRegular rounded-xl"
        />
      </View>
      <TouchableOpacity className="w-full p-4 mt-5 bg-primary rounded-2xl">
        <Link href="/(tabs)" className="text-base text-center text-white">
          Create Account
        </Link>
      </TouchableOpacity>
      <View className="flex-row items-center justify-center mt-4">
        <Text className="text-sm font-light text-gray-800">
          Already have an account?
        </Text>
        <TouchableOpacity>
          <Link href="/(auth)" className="ml-2 text-sm font-bold text-primary">
            Login
          </Link>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default register;
