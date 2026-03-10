import { colors } from "@/constant/color";
import { useAuth } from "@clerk/expo";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Redirect, Tabs } from "expo-router";
import { Dimensions, View } from "react-native";

export default function TabsLayout() {
  const { isLoaded, isSignedIn } = useAuth();
  const { width, height } = Dimensions.get("window");

  if (!isLoaded) {
    return null;
  }

  if (!isSignedIn) {
    return <Redirect href="/(auth)/sign-in" />;
  }

  const buttonSize = width / 0.18;

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: colors.background,
          paddingTop: height * 0.02,
          marginHorizontal: width * 0.05,
          bottom: height * 0.04,
          borderRadius: buttonSize / 4,
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "",
          tabBarIcon: ({ size, focused }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={size}
              color={focused ? colors.primary : colors.secondary}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "",
          tabBarIcon: ({ size, focused }) => (
            <Ionicons
              name={focused ? "search" : "search-outline"}
              size={size}
              color={focused ? colors.primary : colors.secondary}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="add"
        options={{
          title: "",
          tabBarIcon: ({ size, focused }) => (
            <View
              style={{
                width: width * 0.14,
                height: width * 0.14,
                borderRadius: buttonSize / 2,
                justifyContent: "center",
                backgroundColor: colors.secondary,
                alignItems: "center",
              }}
            >
              <Ionicons
                name={focused ? "add" : "add-outline"}
                size={size}
                color={focused ? colors.third : "white"}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          title: "",
          tabBarIcon: ({ size, focused }) => (
            <Ionicons
              name={focused ? "create" : "create-outline"}
              size={size}
              color={focused ? colors.primary : colors.secondary}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "",
          tabBarIcon: ({ size, focused }) => (
            <Ionicons
              name={focused ? "person-circle" : "person-circle-outline"}
              size={size}
              color={focused ? colors.primary : colors.secondary}
            />
          ),
        }}
      />
    </Tabs>
  );
}
