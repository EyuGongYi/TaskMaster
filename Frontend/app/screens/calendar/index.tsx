import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { Calendar } from 'react-native-calendars';

interface Event {
  name: string;
  color: string;
}

interface Events {
  [date: string]: Event[];
}

const events: Events = {
  '2024-06-01': [{ name: 'OGL Dance', color: 'green' }],
  '2024-06-02': [{ name: 'Optional ER', color: 'red' }],
  '2024-06-05': [{ name: 'Choir Safety', color: 'green' }],
  '2024-06-17': [{ name: 'Hari Raya Haji', color: 'red' }],
};

export default function Index() {
  const renderEvent = (day: { dateString: string }) => {
    const event = events[day.dateString];
    if (event) {
      return event.map((item, index) => (
        <View key={index} style={[styles.event, { backgroundColor: item.color }]}>
          <Text style={styles.eventText}>{item.name}</Text>
        </View>
      ));
    }
    return null;
  };

  return (
    <View style={styles.container}>
      <Calendar
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
      <View style={styles.tabBar}>
        <Link href="screens/home" style={styles.tabItem}>
          <Text>Home</Text>
        </Link>
        <Link href="screens/calendar" style={styles.tabItem}>
          <Text>Calendar</Text>
        </Link>
        <Link href="screens/recommendation" style={styles.tabItem}>
          <Text>Recommended Workflow</Text>
        </Link>
        <Link href="screens/sync" style={styles.tabItem}>
          <Text>Sync with Friend</Text>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    padding: 20,
    backgroundColor: '#000',
  },
  dayContainer: {
    alignItems: 'center',
  },
  dayText: {
    color: '#fff',
  },
  disabledText: {
    color: 'gray',
  },
  event: {
    marginTop: 5,
    borderRadius: 5,
    padding: 2,
  },
  eventText: {
    color: '#fff',
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