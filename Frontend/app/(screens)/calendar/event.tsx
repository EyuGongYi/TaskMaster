import { View, Text, StyleSheet, Pressable } from 'react-native';
import React, { useEffect, useState } from 'react';
import { getCalendarEvents } from '@/scripts/googleApi';
import { auth } from '@/firebaseConfig';
import { useAuth } from '@/hooks/authContext';
import { router, useLocalSearchParams } from 'expo-router';
import { GoogleEventType } from '@/types/event';

export default function Event() {
  const [event, setEvent] = useState<GoogleEventType>();
  const { user, eventList } = useAuth();
  const params = useLocalSearchParams();
  const { eventId, date } = params;

  useEffect(() => {
    if (eventId && date && eventList) {
      const dateStr = date as string;
      const foundEvent = eventList[dateStr]?.find(e => e.event.eventId === eventId)?.event;
      setEvent(foundEvent);
    }
  }, [eventId, date, eventList]);

  return (
    <View style={styles.container}>
      {event ? (
        <View style={styles.eventContainer}>
          <Text style={styles.label}>Event Name</Text>
          <Text style={styles.value}>{event.eventName}</Text>
          <Text style={styles.label}>Description</Text>
          <Text style={styles.value}>{event.eventDetail}</Text>
          <Text style={styles.label}>Date</Text>
          <Text style={styles.value}>{event.eventStart.toLocaleDateString()}</Text>
          <Text style={styles.label}>Start Timing</Text>
          <Text style={styles.value}>{event.eventStart.toLocaleTimeString()}</Text>
          <Text style={styles.label}>End Timing</Text>
          <Text style={styles.value}>{event.eventEnd.toLocaleTimeString()}</Text>
          <Pressable
            style={styles.button}
            onPress={() => router.push({
              pathname: "/(screens)/calendar/editEvent",
              params: {
                eventId: event.eventId,
                date: event.eventStart.getTime(),
                start: event.eventStart.getTime(),
                end: event.eventEnd.getTime(),
                name: event.eventName,
                details: event.eventDetail
              }
            })}
          >
            <Text style={styles.buttonText}>Edit</Text>
          </Pressable>
        </View>
      ) : (
        <Text style={styles.noEventText}>No event found</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FAF3F3', // Background color
  },
  eventContainer: {
    alignItems: 'center',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4A4A4A',
    marginTop: 10,
  },
  value: {
    fontSize: 16,
    color: '#4A4A4A',
    marginBottom: 10,
  },
  button: {
    marginTop: 20,
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 30,
    backgroundColor: '#8575fb', // Button background color
    width: 100,
  },
  buttonText: {
    fontWeight: 'bold',
    color: 'white', // Button text color
    fontSize: 15,
  },
  noEventText: {
    fontSize: 18,
    color: '#4A4A4A',
    textAlign: 'center',
    marginTop: 50,
  },
});
