import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";

import Alert from "./components/alerts";
import TodaySchedule from "./components/todaySchedule";
import AssignmentAlert from "@/constants/AssignmentAlert";
import CalendarEvent from "@/constants/CalendarEvent";
import { useAuth } from "@/hooks/authContext";

// Mock data for AssignmentAlert
const alerts: AssignmentAlert[] = [
  { type: 'Assignment', message: 'Complete Assignment 1', deadline: '23/5/2024' },
  { type: 'Announcement', message: 'New course material uploaded' }
];

//Mock data for Calendar Events
const events: CalendarEvent[] = [
  { type: 'Event', start: '10:00 AM', end: '12:00pm', title: 'Meeting' },
  { type: 'Event', start: '12:00 PM', end: '1:00pm', title: 'Lunch' },
  { type: 'Event', start: '4:00 PM', end: '5:00pm', title: 'Workshop' },
];

export default  function Index() {
  const context = useAuth();
  
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString(undefined, {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome, {context.user?.displayName}!</Text>
      <Text style={styles.dateText}>{formattedDate}</Text>
      <TodaySchedule />
      <Alert alerts = {alerts}/>
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
  }
});