import { View, Text, StyleSheet, Pressable, SafeAreaView } from 'react-native'
import React from 'react'
import { getCalendarEvents } from '@/scripts/googleApi';
import { auth } from '@/firebaseConfig';


export default function index() {
    const handleLogin = async () => {
      
    };

    return (
      <SafeAreaView style={styles.container}>
        <Pressable onPress={handleLogin}>
          <Text style={styles.loginButton}>Canvas Details, the courses and its assignment , upcoming deadlines</Text>
        </Pressable>
      </SafeAreaView>
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