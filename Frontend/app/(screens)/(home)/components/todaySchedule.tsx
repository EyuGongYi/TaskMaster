import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import CalendarEvent from '@/constants/CalendarEvent';

interface CalendarEventProps {
    events: CalendarEvent[];
}

const TodaySchedule: React.FC<CalendarEventProps> = ({events}) => {
  return (
    <View style={styles.section}>
        <Text style={styles.sectionHeader}>Schedule for Today:</Text>
        {events.map((event, index) => (
          <View key={index} style={[styles.eventContainer, { backgroundColor: event.type === 'Event' ? '#de496e' : 'white' }]}>
            <Text style={styles.eventText}>{event.start} - {event.end} : {event.title}</Text>
          </View>
        ))}
      </View>
  )
}
export default TodaySchedule;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "flex-start",
      padding: 20,
    },
    text: {
      fontWeight: "bold",
      fontSize: 24,
    },
    dateText: {
      color: "black",
      fontSize: 18,
      alignSelf: "center",
      marginTop: 20,
    },
    section: {
      marginTop: 20,
    },
    sectionHeader: {
      fontWeight: "bold",
      fontSize: 18,
      marginBottom: 10,
    },
    eventContainer: {
      padding: 10,
      borderRadius: 10,
      marginBottom: 10,
    },
    eventText: {
      color: "white",
      fontWeight: "bold",
      fontSize: 16,
    }
  });