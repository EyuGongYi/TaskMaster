import { Stack } from "expo-router";

export default function CanvasPageLayout() {
  return (
    <Stack screenOptions={{headerShown: false}}>
      <Stack.Screen name="index" />
    </Stack>
  );
}