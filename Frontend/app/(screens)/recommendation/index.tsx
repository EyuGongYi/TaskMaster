import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GoogleEventType } from '@/types/event';
import { useAuth } from '@/hooks/authContext';
import { getEvents } from '../calendar';
import { getCalendarEvents } from '@/scripts/googleApi';

const getEventsWithoutDates = async (): Promise<GoogleEventType[]> => {
  const temp = await AsyncStorage.getItem("events");
  if (temp) {
    return JSON.parse(temp);
  } else {
    return [];
  }
  
};

const findEarliestFreeTime = (events: GoogleEventType[], duration: number, deadline?: Date): { start: Date, end: Date } | null => {
  const now = new Date();
  const endDate = deadline ? new Date(deadline) : new Date(now.getFullYear() + 1, now.getMonth(), now.getDate()); // default to 1 year ahead if no deadline

  for (let date = new Date(now); date <= endDate; date.setDate(date.getDate() + 1)) {
    let freeTimeSlots = [
      { start: new Date(date.setHours(8, 0, 0, 0)), end: new Date(date.setHours(20, 0, 0, 0)) }, // find free timings from 8 AM to 8 PM
    ];

    // Sort events by start time
    const dayEvents = events
      .filter(event => event.eventDate && new Date(event.eventDate).toDateString() === date.toDateString())
      .sort((a, b) => new Date(a.eventStart!).getTime() - new Date(b.eventStart!).getTime());

    for (const event of dayEvents) {
      const eventStart = new Date(event.eventStart!);
      const eventEnd = new Date(event.eventEnd!);
      freeTimeSlots = freeTimeSlots.reduce((acc, slot) => {
        if (eventEnd <= slot.start || eventStart >= slot.end) {
          // No overlap
          acc.push(slot);
        } else if (eventStart > slot.start && eventEnd < slot.end) {
          // Event splits the slot into two
          acc.push({ start: slot.start, end: eventStart });
          acc.push({ start: eventEnd, end: slot.end });
        } else if (eventStart <= slot.start && eventEnd >= slot.end) {
          // Event completely overlaps the slot
        } else if (eventStart <= slot.start && eventEnd < slot.end) {
          // Event overlaps the start of the slot
          acc.push({ start: eventEnd, end: slot.end });
        } else if (eventStart > slot.start && eventEnd >= slot.end) {
          // Event overlaps the end of the slot
          acc.push({ start: slot.start, end: eventStart });
        }
        return acc;
      }, [] as Array<{ start: Date, end: Date }>);
    }

    const availableSlot = freeTimeSlots.find(slot => slot.end.getTime() - slot.start.getTime() >= duration * 60000);
    if (availableSlot) {
      return { start: availableSlot.start, end: new Date(availableSlot.start.getTime() + duration * 60000) };
    }
  }

  return null; // No available slot found within the deadline
};

const RecommendationPage: React.FC = () => {
  const [eventsWithoutDates, setEventsWithoutDates] = useState<GoogleEventType[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    const loadEvents = async () => {
      const events = await getEventsWithoutDates();
      events.sort((a, b) => {
        const priorityOrder = ['ASAP', 'High', 'Medium', 'Low'];
        return priorityOrder.indexOf(a.priority!) - priorityOrder.indexOf(b.priority!);
      });
      setEventsWithoutDates(events);
    };

    loadEvents();
  }, []);

  const handleAcceptSuggestion = async (event: GoogleEventType, suggestedDate: { start: Date, end: Date }) => {
    event.eventDate = suggestedDate.start;
    event.eventStart = suggestedDate.start;
    event.eventEnd = suggestedDate.end;

    // Update the event list in AsyncStorage
    const temp = await AsyncStorage.getItem("events");
    const events: GoogleEventType[] = temp ? JSON.parse(temp).filter((e: any) => e !== null && e !== undefined).map((e: any) => ({
      ...e,
      eventStart: e.eventStart ? new Date(e.eventStart) : undefined,
      eventEnd: e.eventEnd ? new Date(e.eventEnd) : undefined,
      eventDate: e.eventDate ? new Date(e.eventDate) : undefined,
      deadline: e.deadline ? new Date(e.deadline) : undefined,
    })) : [];
    const updatedEvents = events.map(e => e.eventId === event.eventId ? event : e);
    await AsyncStorage.setItem("events", JSON.stringify(updatedEvents));

    // Refresh the list
    setEventsWithoutDates(updatedEvents.filter(e => !e.eventDate));
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Recommendations</Text>
      {eventsWithoutDates.length > 0 ? (
        eventsWithoutDates.map((event, index) => {
          const suggestedDate = findEarliestFreeTime(eventsWithoutDates, event.eventDuration || 60, event.deadline); // Default to 1 hour if no duration provided
          if (!suggestedDate) {
            return (
              <View key={index} style={styles.eventContainer}>
                <Text style={styles.eventName}>{event.eventName}</Text>
                <Text>No suitable time slot found before the deadline.</Text>
                <Pressable style={styles.button} onPress={async () => {
                  // Delete event if no time slot found
                  const temp = await AsyncStorage.getItem("events");
                  const events: GoogleEventType[] = temp ? JSON.parse(temp) : [];
                  const updatedEvents = events.filter(e => e.eventId !== event.eventId);
                  await AsyncStorage.setItem("events", JSON.stringify(updatedEvents));
                  setEventsWithoutDates(updatedEvents.filter(e => !e.eventDate));
                }}>
                  <Text style={styles.buttonText}>Delete Event</Text>
                </Pressable>
              </View>
            );
          }
          return (
            <View key={index} style={styles.eventContainer}>
              <Text style={styles.eventName}>{event.eventName}</Text>
              <Text>Suggested Date: {suggestedDate.start.toDateString()}</Text>
              <Text>Suggested Start Time: {suggestedDate.start.toTimeString()}</Text>
              <Text>Suggested End Time: {suggestedDate.end.toTimeString()}</Text>
              <Text>Priority: {event.priority}</Text>
              <Text>Details: {event.eventDetail}</Text>
              <Pressable style={styles.button} onPress={() => handleAcceptSuggestion(event, suggestedDate)}>
                <Text style={styles.buttonText}>Accept Suggestion</Text>
              </Pressable>
            </View>
          );
        })
      ) : (
        <Text>No events without dates</Text>
      )}
    </ScrollView>
  );
};

export default RecommendationPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  eventContainer: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
    marginBottom: 15,
  },
  eventName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  button: {
    marginTop: 10,
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});