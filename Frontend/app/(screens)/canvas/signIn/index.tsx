import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, TextInput, Alert } from 'react-native';
import { router } from 'expo-router';
import * as Keychain from 'react-native-keychain';
import { authenticateUser } from '../../../moodleApi';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const token = await authenticateUser(username, password);
      if (token) {
        await Keychain.setGenericPassword(username, token);
        router.replace("/(screens)/canvas/canvasPage");
      } else {
        Alert.alert('Login failed', 'Invalid username or password');
      }
    } catch (error) {
      Alert.alert('Login failed', 'An error occurred during login');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Pressable onPress={handleLogin}>
        <Text style={styles.loginButton}>Canvas Login</Text>
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
  input: {
    width: '80%',
    padding: 15,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
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
    marginTop: 20,
  },
});