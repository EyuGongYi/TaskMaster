import React from "react";
import { Text, View, StyleSheet } from "react-native";
import Alert from "./components/alerts";
import TodaySchedule from "./components/todaySchedule";
import { useAuth } from "@/hooks/authContext";

export default function Index() {
  const context = useAuth();

  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString(undefined, {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });

  // Static alerts for demonstration
  const alerts = [
    { type: 'Assignment', message: 'Complete Assignment 1', deadline: '23/5/2024' },
    { type: 'Announcement', message: 'New course material uploaded' }
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome, {context.user?.displayName}!</Text>
      <Text style={styles.dateText}>{formattedDate}</Text>
      <TodaySchedule />
      <Alert alerts={alerts} />
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