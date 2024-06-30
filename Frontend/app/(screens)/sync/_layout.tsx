import { Stack } from "expo-router";

export default function SyncLayout() {
  return (
    <Stack screenOptions={{headerShown: false}}>
      <Stack.Screen name="index" options={{headerShown:true, headerSearchBarOptions: {}, headerTitle: "Sync with users"}} />
    </Stack>
  );
}