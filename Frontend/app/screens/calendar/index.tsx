import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation, useRoute, NavigationProp, RouteProp } from "@react-navigation/native";
import { Calendar } from 'react-native-calendars';
import { RootStackParamList } from '../../types';

interface Event {
  name: string;
  color: string;
  time?: string;
}

interface Events {
  [date: string]: Event[];
}

export default function CalendarScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, 'Calendar'>>();

  const events: Events = route.params?.events.reduce((acc, event) => {
    const date = new Date(event.eventDate).toISOString().split('T')[0];
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push({
      name: event.eventName,
      color: 'blue', // Set a default color for simplicity
      time: new Date(event.eventTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    });
    return acc;
  }, {} as Events) || {};

  const renderEvent = (day: { dateString: string }) => {
    const event = events[day.dateString];
    if (event) {
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
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddEvent')}>
        <Text style={styles.addButtonText}>Add Event</Text>
      </TouchableOpacity>
      <View style={styles.tabBar}>
        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('Home')}>
          <Text>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('Calendar')}>
          <Text>Calendar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('Recommend')}>
          <Text>Recommended Workflow</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('Sync')}>
          <Text>Sync with Friend</Text>
        </TouchableOpacity>
      </View>
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
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 20,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    padding: 10,
  },
  addButton: {
    position: 'absolute',
    bottom: 70,
    right: 20,
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
