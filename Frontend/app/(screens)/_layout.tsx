import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: 'green', headerShown: false}}>
      <Tabs.Screen
        name = "(home)"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="calendar"
       options={{
          title: 'Calendar',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="calendar" color={color} />,
        }}
      />
      <Tabs.Screen
        name="canvas"
        options={{
          title: 'Canvas',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="book" color={color} />,
        }}
      />
      <Tabs.Screen
        name="sync"
        options={{
          title: 'Sync',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="arrow-circle-down" color={color} />,
        }}
      />
      <Tabs.Screen
        name="recommendation"
        options={{
          title: 'Recommendations',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="calendar-plus-o" color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="cog" color={color} />,
        }}
      />
    </Tabs>
    
  );
}