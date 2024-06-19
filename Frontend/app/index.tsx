
import { useEffect } from 'react'
import { isLoggedIn } from '@/scripts/auth'
import { Redirect, router } from 'expo-router';
import { Text, View } from 'react-native';
import Linking from "expo-linking";


export default function index() {
    useEffect(() => {
      const loginCheck = async () => {
        await isLoggedIn() ? router.push("/(screens)"): router.push("/(auth)")
        
      }
      loginCheck();
    },[]);
    return (
      <View>
        <Text>Loading</Text>
      </View>
    )
  }