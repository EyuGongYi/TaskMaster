import { View, Text, StyleSheet, Pressable } from 'react-native';
import React, { useEffect } from 'react';
import { router } from 'expo-router';
import { Agenda, AgendaEntry } from 'react-native-calendars';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '@/hooks/authContext';
import { Events, GoogleEventType, CustomAgendaEntry } from '@/types/event';
import { getCalendarEvents } from '@/scripts/googleApi';
import User from '@/types/user';

export const getEvents = async (setEventList: Function, user: User) => {
  const events: GoogleEventType[] = await getCalendarEvents(user);
  
  const res: Events = events.reduce((acc: Events, event: GoogleEventType) => {
    const date = event.eventStart.toISOString().split('T')[0];
    if (!acc[date]) {
      acc[date] = [];
    }
    const entry: CustomAgendaEntry = {
      name: event.eventName,
      height: 50, // Example height, you can adjust as needed
      day: `${event.eventStart.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - ${event.eventEnd.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
      start: event.eventStart,
      end: event.eventEnd
    };
    acc[date].push(entry);
    return acc;
  }, {} as Events);

  setEventList(res);
}

const renderEmptyDate = () => (
  <View>
    <Text>No Items</Text>
  </View>
);

export default function Index() {
  const { user, eventList, setEventList } = useAuth();

  useEffect(() => {
    if (user) {
      getEvents(setEventList, user);
    }
  }, [user]);

  useEffect(() => {
    console.log('Updated eventList:', eventList);
  }, [eventList]);

  return (
    <SafeAreaView style={styles.container}>
      <Agenda
        items={eventList}
        renderEmptyDate={renderEmptyDate}
        renderItem={(item: CustomAgendaEntry, isFirst: boolean) => (
          <Pressable style={styles.item} onPress={() => { console.log(item) }}>
            <Text style={styles.itemText}>{item.name}</Text>
            <Text style={styles.itemText}>{item.day}</Text>
          </Pressable>
        )}
      />
      <View style={styles.addEventButton}>
        <Pressable onPress={() => { router.push("/addEvent") }}>
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
    flex: 1,
    backgroundColor: "#b4d8d6", // Item background color
    borderRadius: 15,
    padding: 10,
    marginRight: 10,
    marginTop: 25,
    paddingBottom: 20,
    height: 100,
  },
  itemText: {
    fontSize: 20,
    color: "#4A4A4A", // Item text color
  },
  addEventButton: {
    height: 70,
    justifyContent: "center",
    alignItems: "center",
  },
  addEvent: {
    fontWeight: "bold",
    fontSize: 30,
    color: "#FAF3F3", // Add event button text color
    backgroundColor: "#f15a7e", // Add event button background color
    borderRadius: 75,
    paddingHorizontal: 15,
    textAlign: "center",
  },
});