import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable, Alert, TextInput } from 'react-native';
import { getUserIdByEmail, storeMoodleId } from '@/app/moodleApi';
import { auth, db } from '@/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { router } from 'expo-router';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  useEffect(() => {
    const checkIfLoggedIn = async () => {
      const docSnap = await getDoc(doc(db, "userEvents", auth.currentUser!.providerData[0].uid));
      if (docSnap.exists() && docSnap.data().moodleID) {
        router.push("/(screens)/canvas/canvasPage");
      }
    }
    checkIfLoggedIn();
  },[]);

  const handleLogin = async () => {
    const id = await getUserIdByEmail(email);
    if (id == null) {
      alert("Cannot Find User");
      return ;
    }
    storeMoodleId(id);

    router.push("/(screens)/canvas/canvasPage");
  };

  return (
    <View style={styles.container}>
      <TextInput
          placeholder="email"
          value={email}
          onChangeText={text => setEmail(text)}
          style={styles.input}
        />
      
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
    backgroundColor: '#FAF3F3'
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