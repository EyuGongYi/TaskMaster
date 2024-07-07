import { router, Stack } from "expo-router";

export default function SyncLayout() {
  return (
    <Stack screenOptions={{headerShown: false}}>
      <Stack.Screen name="index" options={{headerShown:true, headerSearchBarOptions: { onChangeText:(e) =>{
          router.setParams({q: e.nativeEvent.text});
      },}, headerTitle: "Sync with users"}} />
    </Stack>
  );
}