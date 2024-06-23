
import { useEffect } from 'react'
import { isLoggedIn } from '@/scripts/auth'
import { router } from 'expo-router';
import Index from './(screens)/(home)';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

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
        <Text style={{textAlign: "center"}}>Connecting to server...</Text>
        <ActivityIndicator size="large"/>
      </View>
    )
  }
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    }, 
    textStyle: {
      textAlign: "center",
      fontWeight: "bold",
      fontSize: 24,
    },
  });