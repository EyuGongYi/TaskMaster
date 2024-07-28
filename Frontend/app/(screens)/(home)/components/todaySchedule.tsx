import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { getEvents } from "../../calendar";
import { GoogleEventType, Events, CustomAgendaEntry } from "@/types/event";
import { useAuth } from '@/hooks/authContext';

const TodaySchedule = () => {
  const [eventList, setEventList] = useState<Events>({});
  const { user } = useAuth();

  useEffect(() => {
    const fetchAndSetEvents = async () => {
      if (user) {
        await getEvents(setEventList, user);
      }
    };

    fetchAndSetEvents();
  }, [user]);

  const currDate = new Date();
  const currentDate =  currDate.getDate().toString().length > 1 ? currDate.toISOString().split("T")[0].slice(0,-2) + currDate.getDate(): 
  currDate.toISOString().split("T")[0].slice(0,-2) + "0" + currDate.getDate();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Today's Schedule</Text>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {eventList[currentDate] && eventList[currentDate].length > 0 ? (
          eventList[currentDate].map((event: CustomAgendaEntry, index: number) => (
            <View key={index} style={styles.eventContainer}>
              <Text style={styles.eventName}>{event.name}</Text>
              <Text style={styles.eventDetails}>
                {new Date(event.start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} - {new Date(event.end).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </Text>
            </View>
          ))
        ) : (
          <Text style={styles.noEvents}>No events today.</Text>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 10,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  scrollView: {
    maxHeight: 300,
  },
  eventContainer: {
    backgroundColor: '#de496e',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  eventName: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  eventDetails: {
    color: 'white',
    fontSize: 14,
  },
  noEvents: {
    textAlign: 'center',
    marginTop: 20,
  }
});

export default TodaySchedule;