import { AuthProvider } from "@/hooks/authContext";
import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Slot, Stack } from "expo-router";
import { useColorScheme } from "react-native";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  return (
    <ThemeProvider value={colorScheme === "dark" ? DefaultTheme: DefaultTheme}>
      <AuthProvider>
        <Slot/>
      </AuthProvider>
    </ThemeProvider>
  );
}