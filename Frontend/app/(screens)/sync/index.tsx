import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import ProfileCard from './components/profilecard';
import { useAuth } from '@/hooks/authContext';
import { useLocalSearchParams } from 'expo-router';
import { getUsers } from '@/scripts/sync';

export default function index() {
  const {user} = useAuth();
  const searchParam = useLocalSearchParams();
  const [search, setSearch] = useState(searchParam.q);
  
  useEffect(() => {
    setSearch(searchParam.q);
    if (search && search != ""){
      console.log(getUsers(search));
    }
  },[searchParam]);
  return (
    <View style={styles.container}>
      <View style={{flex: 8}}>
        <ProfileCard {...user!}/>
      </View>
      <ScrollView style={{flex: 1}} horizontal={true}>
        <Pressable onPress={() => console.log("1")}>
          <Text style={{flex:1}}>Hello</Text>
        </Pressable>
      </ScrollView>
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
});