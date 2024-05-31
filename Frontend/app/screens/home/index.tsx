import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Link } from "expo-router";
import getUsername from "@/scripts/getUsername";

export default  function Index() {
  const [username, setUsername] = useState('');
  useEffect(() => {
    const fetchUsername = async () => {
      const name = await getUsername();
      setUsername(name);
    }
    fetchUsername();
  },[]);
  
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString(undefined, {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });

  const events = [
    { type: 'Event', start: '10:00 AM', end: '12:00pm', title: 'Meeting' },
    { type: 'Event', start: '12:00 PM', end: '1:00pm', title: 'Lunch' },
    { type: 'Event', start: '4:00 PM', end: '5:00pm', title: 'Workshop' },
  ];

  const alerts = [
    { type: 'Assignment', message: 'Complete Assignment 1', deadline: '23/5/2024' },
    { type: 'Announcement', message: 'New course material uploaded' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome, {username}!</Text>
      <Text style={styles.dateText}>{formattedDate}</Text>
      <View style={styles.section}>
        <Text style={styles.sectionHeader}>Schedule for Today:</Text>
        {events.map((event, index) => (
          <View key={index} style={[styles.eventContainer, { backgroundColor: event.type === 'Event' ? '#de496e' : 'white' }]}>
            <Text style={styles.eventText}>{event.start} - {event.end} : {event.title}</Text>
          </View>
        ))}
      </View>
      <View style={styles.alertsContainer}>
        <Text style={styles.sectionHeader}>Alerts:</Text>
        {alerts.map((alert, index) => (
          <View key={index} style={[styles.alertContainer, { backgroundColor: alert.type === 'Assignment' ? '#8572ff' : '#71befc' }]}>
            <Text style={styles.alertMainText}>{alert.message}</Text>
            {alert.type === 'Assignment' && (
              <Text style={styles.alertTypeText}>
                {alert.type} - Deadline: {alert.deadline}
              </Text>
            )}
            {alert.type !== 'Assignment' && (
              <Text style={styles.alertTypeText}>{alert.type}</Text>
            )}
          </View>
        ))}
      </View>
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
  },
  alertsContainer: {
    position: "absolute",
    bottom: 150,
    left: 10,
    right: 10,
    padding: 10,
    borderRadius: 10,
  },
  alertContainer: {
    backgroundColor: "#71befc",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  alertMainText: {
    color: "white",
    fontSize: 16,
    marginBottom: 5,
  },
  alertDeadlineText: {
    color: "white",
    fontSize: 14,
    marginBottom: 2,
  },
  alertTypeText: {
    color: "white",
    fontSize: 12,
    fontStyle: "italic",
  },
  tabBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "lightgrey",
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
});