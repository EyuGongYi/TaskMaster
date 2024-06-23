import { View, Text, StyleSheet, ActivityIndicator, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as WebBrowser from "expo-web-browser"
import * as AuthSession from "expo-auth-session"
import * as Linking from "expo-linking"
import { router } from "expo-router";

WebBrowser.maybeCompleteAuthSession();
const Server_URL = process.env.EXPO_PUBLIC_PORTURL;

export default function index() {
  const [val, setVal] = useState(null);
  
  useEffect(() => {
    const handleRedirect = async (event: {url: string}) => {
      const data = Linking.parse(event.url);
      if (data.queryParams) {
        const token = data.queryParams.message;
        console.log(token);
      }
    };
    const subscription = Linking.addEventListener('url', handleRedirect);
    return () => subscription.remove();
  }, []);

  const handleLogin = async() => {
    const redirectURI = AuthSession.makeRedirectUri({
      native: "taskmaster://"
    })
    const authURL =  Server_URL+ `/api/auth/google`;
    console.log(redirectURI);
    await WebBrowser.openAuthSessionAsync(authURL, redirectURI);
  };

  const handleRegister = () => {
    router.navigate('register');
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={handleLogin}>
        <Text style={styles.text}>G</Text>
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
  },
  text: {
    fontWeight: "bold",
    fontSize: 30,
    color: "white",
    backgroundColor: "green",
    borderRadius: 50,
    paddingVertical: 15,
    paddingHorizontal: 20,
    textAlign: "center",
  },
  dateText: {
    color: "black",
    fontSize: 18,
    alignSelf: "center",
    marginTop: 20,
  }
});