import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { getEvents } from "../../calendar"; 
import { GoogleEventType, Events } from "@/types/event"; 

const TodaySchedule = () => {
  const [eventList, setEventList] = useState<Events>({});

  useEffect(() => {
    const fetchAndSetEvents = async () => {
      await getEvents(setEventList);
    };

    fetchAndSetEvents();
  }, []);

  const currentDate = new Date().toISOString().split('T')[0]; // ISO string of today's date

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Today's Schedule</Text>
      <ScrollView style={styles.scrollView}>
        {eventList[currentDate] && eventList[currentDate].length > 0 ? (
          eventList[currentDate].map((event, index) => (
            <View key={index} style={styles.eventContainer}>
              <Text style={styles.eventName}>{event.name}</Text>
              <Text style={styles.eventDetails}>
                {new Date(event.start).toLocaleTimeString()} - {new Date(event.end).toLocaleTimeString()}
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
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  scrollView: {
    flex: 1,
    marginBottom: 350,
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
