
import { useEffect } from 'react'
import { isLoggedIn } from '@/scripts/auth'
import { router } from 'expo-router';
import Index from './(screens)/(home)';
import { Text, View } from 'react-native';

export default function index() {
    useEffect(() => {
      const loginCheck = async () => {
        const name = await isLoggedIn();
        name ? router.replace("(screens)"): router.replace("(auth)")
      }
      loginCheck();
    },[]);
    return (
      <View>
        <Text>Loading</Text>
      </View>
    )
  }