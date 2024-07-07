

import { GoogleSignin } from '@react-native-google-signin/google-signin';
import React from 'react';
import { StyleSheet, View, Image, Text, Pressable } from 'react-native';
import User from "@/types/user";

function handleProfileButton(user: User) {
    console.log(user);
}

export default function ProfileCard(user: User) {
    const image = GoogleSignin.getCurrentUser()!.user.photo;
  return (
        <Pressable style={styles.profile} onPress={() => {handleProfileButton(user)}}>
          <Image
            alt=""
            source={{
              uri:image!
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
  /** Profile */
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

