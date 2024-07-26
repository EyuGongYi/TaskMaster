import { View, Text, Pressable, StyleSheet, Image } from 'react-native'
import React from 'react'
import User from '@/types/user'
import { useAuth } from '@/hooks/authContext'

export default function ChosenProfile(user: User, key: React.Key) {
    const {chosenList, setChosenList} = useAuth();
    function handleButton() {
        const index = chosenList.findIndex(temp => temp.uid == user.uid);
        chosenList.splice(index, 1);
        
    }
  return (
    <Pressable key={key} onPress={() => handleButton()}>
        <Image
            alt=""
            source={{
              uri:user.photoURL!
            }}
            style={styles.profileAvatar} />
    </Pressable>
  )
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