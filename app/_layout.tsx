import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { View } from "react-native";
import "../global.css";

export default function RootLayout() {
  const [fontLoaded] = useFonts({
    CookieRegular: require("../assets/fonts/Cookie-Regular.ttf"),
    RobotoRegular: require("../assets/fonts/Roboto-Regular.ttf"),
    RobotoBold: require("../assets/fonts/Roboto-Bold.ttf"),
  });

  if (!fontLoaded) {
    return <View />;
  }
  return (
    <Stack>
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
