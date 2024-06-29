import { View, Text, StyleSheet, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { router } from 'expo-router';
import { Agenda, AgendaEntry } from 'react-native-calendars';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';


interface Events{
  [date: string] : AgendaEntry[];
}

const getEvents = async () => {
  const temp = await AsyncStorage.getItem("events");
  const event = temp ? JSON.parse(temp): {};
  const res: Events = event.reduce((acc: any, event: any) => {
    const date = event.eventDate;
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push({name: event.eventName, height: 20, day: event.eventDetail});
    return acc;
  }, {} as Events) || {};
  return res;
}



export default function index() {
  const [events, setEvents] = useState<Events>();
  
  const getEvents = async () => {
    const temp = await AsyncStorage.getItem("events");
    const event = temp ? JSON.parse(temp): [];
    const res: Events = event.reduce((acc: any, event: any) => {
      const date = event.eventDate;
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push({name: event.eventName, height: 20, day: `Deadline: ${event.eventEnd}`});
      return acc;
    }, {} as Events) || {};
    setEvents(res);
  }
  useEffect(() => {getEvents()}, []);

  return (
    <SafeAreaView style={styles.container}>
      <Agenda
        items= {
          events
        }
        renderItem={(item, isFirst) => (
          <Pressable style={styles.item} onPress={() => {console.log(item.height)}}>
            <Text style={styles.itemText}>{item.name}</Text>
            <Text style={styles.itemText}>{item.day}</Text>
          </Pressable>
        )}
      />
      <View style={styles.addEventButton}>
        <Pressable  onPress={() => {router.push("/addEvent")}}>
          <Text style={styles.addEvent}>+</Text>
        </Pressable>
      </View>
        
      </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    flex:1,
    backgroundColor: "skyblue",
    borderRadius: 15,
    padding: 10,
    marginRight: 10,
    marginTop: 25,
    paddingBottom: 20,
    height: 100,
  },
  itemText: {
    fontSize: 20,
    color: "white",
  },
  addEventButton: {
    height: 70,
    justifyContent: "center",
    alignItems: "center",
  },
  addEvent: {
    fontWeight: "bold",
    fontSize: 30,
    color: "white",
    backgroundColor: "black",
    borderRadius: 75,
    paddingHorizontal: 15,
    textAlign: "center",
  },
  loginButton: {
    fontWeight: "bold",
    fontSize: 30,
    backgroundColor: "orange",
    paddingHorizontal: 20,
    textAlign: "center",
  },
});