import React, { useEffect } from 'react';
import { View, StyleSheet, Text} from 'react-native';
import {GoogleSignin, GoogleSigninButton, User } from "@react-native-google-signin/google-signin";
import { auth } from '@/firebaseConfig';
import { GoogleAuthProvider, signInWithCredential, updateProfile } from 'firebase/auth';
import { createUserCalendar, setOfflineToken } from '@/scripts/googleApi';
import { useAuth } from '@/hooks/authContext';



const LoginScreen = () => {
  const {user} = useAuth();
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: process.env.EXPO_PUBLIC_WEB_CLIENT_ID,
      offlineAccess: true,
      scopes: [`https://www.googleapis.com/auth/calendar`],
      forceCodeForRefreshToken:true,
    });
  },[]); 
  

  const handleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const User = await GoogleSignin.signIn();
      await signInWithCredential(auth, GoogleAuthProvider.credential(User.idToken));
      updateProfile(auth.currentUser!, {photoURL: GoogleSignin.getCurrentUser()!.user.photo})
      .then(() => console.log("updated"))
      .catch(e => console.log(e));
      await createUserCalendar(auth.currentUser!);
      await setOfflineToken(auth.currentUser!.providerData[0].uid);
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