import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/login';
import HomeScreen from './screens/home';
import RegisterScreen from './screens/register';
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
    </Stack.Navigator>
  );
}