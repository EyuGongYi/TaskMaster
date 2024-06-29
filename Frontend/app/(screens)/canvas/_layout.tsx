import { Stack } from "expo-router";

export default function CanvasLayout() {
  return (
    <Stack screenOptions={{headerShown: false}}>
      <Stack.Screen name="signIn" />
      <Stack.Screen name="canvasPage" />
    </Stack>
  );
}