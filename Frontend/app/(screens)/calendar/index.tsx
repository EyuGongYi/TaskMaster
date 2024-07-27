import { View, Text, StyleSheet, Pressable } from 'react-native'
import React, { useEffect } from 'react'
import { router } from 'expo-router';
import { Agenda, AgendaEntry } from 'react-native-calendars';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '@/hooks/authContext';
import { Events, GoogleEventType } from '@/types/event';
import { getCalendarEvents } from '@/scripts/googleApi';
import User from '@/types/user';

export const getEvents = async (setEventList: Function, user: User) => {
  const event:any[] = await getCalendarEvents(user!);
  const res: Events = event.reduce((acc: any, event: any) => {
    const startDate = new Date(event.start.dateTime);
    const date = startDate.getDate().toString().length > 1 ? 
                  event.start.dateTime.split("T")[0].slice(0,-2) + startDate.getDate(): 
                  event.start.dateTime.split("T")[0].slice(0,-2) + "0" +startDate.getDate();
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push({name: event.summary, height: event, day: `Deadline: ${new Date(event.end.dateTime).toLocaleDateString()}`});
    return acc;
  }, {} as Events) || {};
  setEventList(res);
}

const renderEmptyDate = () => (
  <View >
    <Text>No Items</Text>
  </View>
);


export default function index() {
  const {user, eventList, setEventList} = useAuth();
  
  useEffect(() => {getEvents(setEventList, user!)}, []);
  useEffect(() => {
    console.log('Updated eventList:', eventList);
  }, [eventList]);

  return (
    <SafeAreaView style={styles.container}>
      <Agenda
        items= {eventList}
        renderEmptyDate= {renderEmptyDate}
        renderItem={(item:any, isFirst:any) => (
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