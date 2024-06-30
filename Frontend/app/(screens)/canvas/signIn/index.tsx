import { View, Text, StyleSheet, Pressable } from 'react-native'
import React from 'react'
import { router } from 'expo-router';


export default function index() {
  const handleLogin = () => {
    router.replace("/(screens)/canvas/canvasPage");
  };

  return (
    <View style={styles.container}>
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
});