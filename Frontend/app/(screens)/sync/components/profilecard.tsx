import { GoogleSignin } from '@react-native-google-signin/google-signin';
import React from 'react';
import { StyleSheet, View, Image, Text, Pressable } from 'react-native';
import User from "@/types/user";
import { useAuth } from '@/hooks/authContext';



export default function ProfileCard(user: User, key : React.Key) {
  const {chosenList} = useAuth();
  function handleProfileButton(user: User) {
    if (chosenList.findIndex(temp => temp.uid == user.uid) == -1) {
      chosenList.push(user);
    }
  }
  return (
        <Pressable key={key} style={styles.profile} onPress={() => {handleProfileButton(user)}}>
          <Image
            alt=""
            source={{
              uri:user.photoURL!
            }}
            style={styles.profileAvatar} />

          <View style= {{flexWrap: "wrap"}}>
            <Text style={styles.profileName}>
                {user?.displayName}
            </Text>
            <Text style={styles.profileHandle}>
              {user?.email}
            </Text>
          </View>
        </Pressable>
  );
}

const styles = StyleSheet.create({
  profile: {
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  profileAvatar: {
    width: 60,
    height: 60,
    borderRadius: 9999,
    marginRight: 12,
  },
  profileName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#292929',
  },
  profileHandle: {
    marginTop: 2,
    fontSize: 16,
    fontWeight: '400',
    color: '#858585',
  },
});