import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';

interface Event {
  name: string;
  color: string;
  time?: string; // Assuming each event has an optional time property
}

interface Events {
  [date: string]: Event[];
}

const events: Events = {
  '2024-06-01': [{ name: 'Assignment 1', color: 'green', time: '10:00' }],
  '2024-06-02': [
    { name: 'Workshop', color: 'red', time: '09:00' },
    { name: 'Orbital', color: 'red', time: '12:00' },
    { name: 'Meeting', color: 'blue', time: '15:00' },
    { name: 'Dinner', color: 'purple', time: '18:00' },
  ],
  '2024-06-05': [{ name: 'Meeting', color: 'green', time: '14:00' }],
  '2024-06-17': [{ name: 'Hari Raya Haji', color: 'red', time: 'All Day' }],
};

export default function Index() {
  const renderEvent = (day: { dateString: string }) => {
    const event = events[day.dateString];
    if (event) {
      // Sort events by time
      const sortedEvents = event.sort((a, b) => (a.time || '').localeCompare(b.time || ''));

      return (
        <View style={styles.eventsContainer}>
          {sortedEvents.slice(0, 3).map((item, index) => (
            <View key={index} style={[styles.event, { backgroundColor: item.color }]}>
              <Text style={styles.eventText}>{item.name}</Text>
            </View>
          ))}
          {sortedEvents.length > 3 && (
            <View style={[styles.event, styles.moreEvent]}>
              <Text style={styles.eventText}>...</Text>
            </View>
          )}
        </View>
      );
    }
    return null;
  };

  return (
    <View style={styles.container}>
      <Calendar
        style={styles.calendar}
        markingType={'custom'}
        markedDates={{
          ...Object.keys(events).reduce((acc, date) => {
            acc[date] = { customStyles: { container: styles.customContainer, text: styles.customText } };
            return acc;
          }, {} as { [date: string]: { customStyles: { container: object; text: object } } }),
        }}
        dayComponent={({ date, state }) => (
          <View style={styles.dayContainer}>
            <Text style={[styles.dayText, state === 'disabled' ? styles.disabledText : {}]}>
              {date?.day}
            </Text>
            {date && renderEvent(date)}
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  calendar: {
    height: '100%',
  },
  dayContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
    position: 'relative',
  },
  dayText: {
    color: 'black',
  },
  disabledText: {
    color: 'gray',
  },
  eventsContainer: {
    alignItems: 'center',
  },
  event: {
    marginTop: 5,
    borderRadius: 5,
    padding: 2,
    width: '150%',
    alignItems: 'center',
  },
  eventText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 8,
    textAlign: 'center',
  },
  moreEvent: {
    backgroundColor: 'grey',
  },
  customContainer: {
    backgroundColor: '#4CAF50',
    borderRadius: 10,
  },
  customText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'lightgrey',
    paddingVertical: 10,
    paddingHorizontal: 20,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
  },
});
