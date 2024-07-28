import { View, Text, StyleSheet, ActivityIndicator, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as WebBrowser from "expo-web-browser"
import * as AuthSession from "expo-auth-session"
import * as Linking from "expo-linking"
import { router } from "expo-router";
import {WebView} from "react-native-webview";
import * as SecureStore from "expo-secure-store";
import { useAuth } from '@/hooks/authContext'
import { GoogleSignin } from '@react-native-google-signin/google-signin'
import {auth} from "../../../firebaseConfig"

WebBrowser.maybeCompleteAuthSession();
const Server_URL = process.env.EXPO_PUBLIC_PORTURL;

export default function index() {
  const [val, setVal] = useState(null);
  const context = useAuth();
  
  useEffect(() => {
    const handleRedirect = async (event: {url: string}) => {
      const data = Linking.parse(event.url);
      if (data.queryParams) {
        const token = data.queryParams.message;
      }
    };
    const subscription = Linking.addEventListener('url', handleRedirect);
    return () => subscription.remove();
  }, []);

  const handleLogin = async() => {
    const logout = async() => {
      try {
        context.signOut();
        await GoogleSignin.revokeAccess();
        await GoogleSignin.signOut();
      } catch (e) {
        console.log(e);
      }
      

    };
    await logout();
  };

  

  return (
    <View style={styles.container}>
      <Pressable onPress={handleLogin}>
        <Text style={styles.text}>Login Out</Text>
      </Pressable>
      <Text>{val}</Text>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#FAF3F3'
  },
  text: {
    fontWeight: "bold",
    fontSize: 30,
    color: "white",
    backgroundColor: "black",
    borderRadius: 50,
    paddingVertical: 15,
    paddingHorizontal: 20,
    textAlign: "center",
  },
});