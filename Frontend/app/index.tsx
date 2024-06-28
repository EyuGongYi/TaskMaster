import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/login';
import HomeScreen from './screens/home';
import RegisterScreen from './screens/register';
import Recommendation from './screens/recommendation';
import CalendarScreen from './screens/calendar';
import SyncScreen from './screens/sync';
import AddEventScreen from './screens/addEvent';
import axios from 'axios';

const Stack = createStackNavigator();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const response = await axios.get( process.env.EXPO_PUBLIC_PORTURL+'/api/auth/isLoggedIn' );
        if (response.data.isLoggedIn) {
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error('Error checking if user is logged in:', error);
      }
    };

    checkLoggedIn();
  }, []);

  return (
    <Stack.Navigator initialRouteName="Login" screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Recommend" component={Recommendation} />
      <Stack.Screen name="Calendar" component={CalendarScreen} />
      <Stack.Screen name="Sync" component={SyncScreen} />
      <Stack.Screen name="AddEvent" component={AddEventScreen} />
    </Stack.Navigator>
  );
}