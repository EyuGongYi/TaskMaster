import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RecoEventType, GoogleEventType } from '@/types/event';
import { useAuth } from '@/hooks/authContext';
import { getCalendarEvents, createGoogleEvent } from '@/scripts/googleApi';

const getRecoEvents = async (): Promise<RecoEventType[]> => {
  const temp = await AsyncStorage.getItem("recoEvents");
  return temp ? JSON.parse(temp) : [];
};

const findEarliestFreeTime = (events: GoogleEventType[], duration: number, deadline: Date): { start: Date, end: Date } | null => {
  const now = new Date();
  const endDate = new Date(deadline);

  for (let date = new Date(now); date <= endDate; date.setDate(date.getDate() + 1)) {
    let freeTimeSlots = [{ start: new Date(date.setHours(8, 0, 0, 0)), end: new Date(date.setHours(22, 0, 0, 0)) }];
    console.log(events);
    console.log(events.filter(event => event.eventStart));
    const dayEvents = events
      .filter(event => event.eventStart && event.eventStart.toDateString() === date.toDateString())
      .sort((a, b) => a.eventStart.getTime() - b.eventStart.getTime());

    for (const event of dayEvents) {
      const eventStart = new Date(event.eventStart);
      const eventEnd = new Date(event.eventEnd);
      freeTimeSlots = freeTimeSlots.reduce((acc, slot) => {
        if (eventEnd <= slot.start || eventStart >= slot.end) {
          acc.push(slot);
        } else if (eventStart > slot.start && eventEnd < slot.end) {
          acc.push({ start: slot.start, end: eventStart });
          acc.push({ start: eventEnd, end: slot.end });
        } else if (eventStart <= slot.start && eventEnd >= slot.end) {
        } else if (eventStart <= slot.start && eventEnd < slot.end) {
          acc.push({ start: eventEnd, end: slot.end });
        } else if (eventStart > slot.start && eventEnd >= slot.end) {
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

  return null;
};

const RecommendationPage: React.FC = () => {
  const [recoEvents, setRecoEvents] = useState<RecoEventType[]>([]);
  const [calendarEvents, setCalendarEvents] = useState<GoogleEventType[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    const loadEvents = async () => {
      if (user) {
        const googleEvents = await getCalendarEvents(user);
        const recommendationEvents = await getRecoEvents();
        setCalendarEvents(googleEvents);
        setRecoEvents(recommendationEvents);
      }
    };

    loadEvents();
  }, [user]);

  const handleAcceptSuggestion = async (event: RecoEventType, suggestedDate: { start: Date, end: Date }) => {
    if (user) {
      const newEvent: GoogleEventType = {
        eventId: event.eventId,
        eventName: event.eventName,
        eventDetail: event.eventDetail,
        eventStart: suggestedDate.start,
        eventEnd: suggestedDate.end,
      };

      const newGoogleEvent = await createGoogleEvent(user, newEvent.eventName, newEvent.eventStart, newEvent.eventEnd, newEvent.eventDetail);
      if (!newGoogleEvent) {
        alert("Failed to create Google event");
        return;
      }

      const updatedRecoEvents = recoEvents.filter(e => e.eventId !== event.eventId);
      await AsyncStorage.setItem("recoEvents", JSON.stringify(updatedRecoEvents));
      setRecoEvents(updatedRecoEvents);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Recommendations</Text>
      {recoEvents.length > 0 ? (
        recoEvents.map((event, index) => {
          const suggestedDate = findEarliestFreeTime(calendarEvents, event.eventDuration, event.deadline);
          if (!suggestedDate) {
            return (
              <View key={index} style={styles.eventContainer}>
                <Text style={styles.eventName}>{event.eventName}</Text>
                <Text>No suitable time slot found before the deadline.</Text>
                <Pressable style={styles.button} onPress={async () => {
                  const updatedRecoEvents = recoEvents.filter(e => e.eventId !== event.eventId);
                  await AsyncStorage.setItem("recoEvents", JSON.stringify(updatedRecoEvents));
                  setRecoEvents(updatedRecoEvents);
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
              <Text>Suggested Start Time: {suggestedDate.start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
              <Text>Suggested End Time: {suggestedDate.end.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
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
