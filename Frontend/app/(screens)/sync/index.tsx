import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import ProfileCard from './components/profilecard';
import { useAuth } from '@/hooks/authContext';
import { router, useLocalSearchParams } from 'expo-router';
import { getUsers } from '@/scripts/sync';
import User from '@/types/user';
import ChosenProfile from './components/chosenProfile';

export default function index() {
  const {chosenList} = useAuth();
  const [userList, setUserList] = useState<any>();
  const searchParam = useLocalSearchParams();
  const [search, setSearch] = useState(searchParam.q);
  
  useEffect(() => {
    setSearch(searchParam.q);
    if (search && search != ""){
      getUsers(search).then(temp => setUserList(temp));
    }
  },[searchParam]);
  return (
    <View style={styles.container}>
      <View style={{flex: 8}}>
        {userList && userList.map((user: User) => (
            <View key={user.uid}>
                <ProfileCard {...user}/>
            </View>
        ))}
      </View>
      <View style={styles.footerContainer}>
        <View style={styles.chosenListContainer}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {chosenList && chosenList.map((user: User) => (
              <View key={user.uid}>
                <ChosenProfile {...user}/>
              </View>
            ))}
          </ScrollView>
        </View>
        <View style={styles.syncButtonContainer}>
          <Pressable onPress={() => router.push("/(screens)/sync/synced")}>
            <Text style={styles.submitButton}>
              Sync
            </Text>
          </Pressable>
        </View>
      </View>
      
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 24,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    flex: 1,
    backgroundColor: '#FAF3F3',
  },
  userListContainer: {
    flex: 8,
    marginBottom: 10,
  },
  footerContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  chosenListContainer: {
    flex: 8,
  },
  syncButtonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12,
    backgroundColor: '#ef577b',
    textAlign: 'center',
    textAlignVertical: 'center',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});