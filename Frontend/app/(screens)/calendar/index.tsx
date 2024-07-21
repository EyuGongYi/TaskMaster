// calendar.tsx
import { View, Text, StyleSheet, Pressable } from 'react-native';
import React, { useEffect } from 'react';
import { router } from 'expo-router';
import { Agenda, AgendaEntry } from 'react-native-calendars';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '@/hooks/authContext';
import { Events, GoogleEventType } from '@/types/event';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getEvents = async (setEventList?: Function): Promise<GoogleEventType[]> => {
  const temp = await AsyncStorage.getItem("events");
  const event: Array<GoogleEventType> = temp ? JSON.parse(temp) : [];

  const res: Events = event.reduce((acc: any, event: any) => {
    if (event && event.eventDate) {
      const date = event.eventDate.split("T")[0];
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push({
        name: event.eventName,
        height: event.eventDetail,
        start: event.eventStart,
        end: event.eventEnd,
      });
    }
    return acc;
  }, {} as Events) || {};

  if (setEventList) {
    setEventList(res);
  }

  return event; // Return the raw list of events
};

export default function index() {
  const { eventList, setEventList } = useAuth();
  
  useEffect(() => { getEvents(setEventList) }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Agenda
        items={eventList}
        renderItem={(item: any, isFirst: boolean) => (
          <Pressable style={styles.item} onPress={() => { console.log(eventList) }}>
            <Text style={styles.itemText}>{item.name}</Text>
            <Text style={styles.itemText}>
              {new Date(item.start).toLocaleTimeString()} - {new Date(item.end).toLocaleTimeString()}
            </Text>
          </Pressable>
        )}
      />
      <View style={styles.addEventButton}>
        <Pressable onPress={() => { router.push("/addEvent") }}>
          <Text style={styles.addEvent}>+</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    flex: 1,
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

