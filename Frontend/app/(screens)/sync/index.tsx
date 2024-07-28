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
      <View style={{flex:1, flexDirection: "row"}}>
        <View style= {{flex: 8}}>
          <ScrollView horizontal={true}>
            {chosenList && chosenList.map((user: User) => (
              <View key={user.uid}>
                <ChosenProfile {...user}/>
              </View>
            ))}
          </ScrollView>
        </View>
        <View style={{flex:1}}>
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
  },
  submitButton: {
    width: 60,
    height: 60,
    borderRadius: 9999,
    marginRight: 12,
    backgroundColor: "grey",
    textAlign: "center",
    textAlignVertical: "center",
  },
});