import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, TouchableOpacity } from 'react-native';
import {login} from '@/scripts/auth';
import { router } from 'expo-router';
import * as AuthSession from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";
import * as Linking from "expo-linking";

WebBrowser.maybeCompleteAuthSession();
const SERVER_URL = process.env.EXPO_PUBLIC_PORTURL;

const LoginScreen = () => {
  const [sessionToken, setSessionToken] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const handleRedirect = async (event: {url: string}) => {
      const data = Linking.parse(event.url);
      if (data.queryParams && data.queryParams.session_token) {
        const token = data.queryParams.session_token as string;
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
    const authURL = SERVER_URL + `/api/auth/google?redirect_uri=${redirectURI}`;
    console.log(redirectURI);
    await WebBrowser.openAuthSessionAsync(authURL, redirectURI);
  };

  const handleRegister = () => {
    router.navigate('register');
  };

  return (
    <View style={styles.container}>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <Button title="Login" onPress={handleLogin} />
      <TouchableOpacity onPress={handleRegister}>
        <Text style={styles.registerText}>Don't have an account? Register here</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    padding: 8,
  },
  errorText: {
    color: 'red',
    marginBottom: 12,
  },
  registerText: {
    color: 'blue',
    marginTop: 12,
    textAlign: 'center',
  },
});

export default LoginScreen;