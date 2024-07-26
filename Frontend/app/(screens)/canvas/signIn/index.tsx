import React from 'react';
import { View, Text, StyleSheet, Pressable, Alert } from 'react-native';
import { authorize } from 'react-native-app-auth';
import { router } from 'expo-router';
import * as Keychain from 'react-native-keychain';
import { moodleConfig } from '@/app/moodleApi';

const LoginPage: React.FC = () => {
  const handleLogin = async () => {
    try {
      const authState = await authorize(moodleConfig);
      await Keychain.setGenericPassword('token', authState.accessToken);
      router.replace("/canvasPage");
    } catch (error) {
      Alert.alert('Login Error', 'Failed to authenticate with Moodle.');
      console.error('Authentication error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={handleLogin}>
        <Text style={styles.loginButton}>Login with Moodle</Text>
      </Pressable>
    </View>
  );
};

export default LoginPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    justifyContent: "center",
  },
  loginButton: {
    fontWeight: "bold",
    fontSize: 30,
    color: "white",
    backgroundColor: "orange",
    borderRadius: 50,
    paddingVertical: 15,
    paddingHorizontal: 20,
    textAlign: "center",
  },
});