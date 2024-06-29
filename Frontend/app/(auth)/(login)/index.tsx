import React, { useEffect } from 'react';
import { View, StyleSheet, Text} from 'react-native';
import {GoogleSignin, GoogleSigninButton } from "@react-native-google-signin/google-signin";
import { auth } from '@/firebaseConfig';
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import { useAuth } from '@/hooks/authContext';

const LoginScreen = () => {
  const {user,signOut, setTokens} = useAuth();
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: process.env.EXPO_PUBLIC_WEB_CLIENT_ID,
      offlineAccess: true,
      scopes: [`https://www.googleapis.com/auth/calendar`],
    });
  },[]); 
  

  const handleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const user = await GoogleSignin.signIn();
      await signInWithCredential(auth, GoogleAuthProvider.credential(user.idToken));
    } catch (e) {
      console.log(e);
    }
  }


  return (
    <View style={styles.container}>
      <Text style={styles.header}>TaskMaster</Text>
      <GoogleSigninButton style={{alignSelf:"center", margin: 150}} size={GoogleSigninButton.Size.Standard} color={GoogleSigninButton.Color.Dark} onPress={handleSignIn}></GoogleSigninButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: "center",
    padding: 16,
  },
  header: {
    alignSelf: "center",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 30,
    backgroundColor: "#16a5fc",
    borderRadius: 10,
    paddingHorizontal: 10,
    color: "white",
  },
  
});

export default LoginScreen;