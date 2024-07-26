import { View, Text, StyleSheet, Pressable, TextInput } from 'react-native'
import React, { useState } from 'react'
import { router } from 'expo-router';


export default function index() {
  const [username, setUsername] = useState<string>();
  const [password, setPassword] = useState<string>();
  const handleLogin = () => {
    // login to moodle to get usertoken, if successful set auth state to true
    router.replace("/(screens)/canvas/canvasPage");
  };

  return (
    <View style={styles.container}>
      <TextInput
            placeholder="Username"
            value={username}
            onChangeText={text => setUsername(text)}
            style={styles.input}
        />
      <TextInput
            placeholder="Password"
            value={password}
            onChangeText={text => setPassword(text)}
            style={styles.input}
        />
      <Pressable onPress={handleLogin}>
        <Text style={styles.loginButton}>Canvas Login</Text>
      </Pressable>
    </View>
  )
}

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
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
});