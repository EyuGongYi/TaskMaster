import React, { useEffect } from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import Alerts from "./components/alerts";
import TodaySchedule from "./components/todaySchedule";
import { useAuth } from "@/hooks/authContext";
import { isLoggedIn } from "@/scripts/auth";

export default function Index() {
  const context = useAuth();

  useEffect(() => {
    const func = async () => {
      isLoggedIn();
    } ;
    func();
  },[]);
  
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString(undefined, {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome, {context.user?.displayName}!</Text>
      <Text style={styles.dateText}>{formattedDate}</Text>
      <TodaySchedule />
      <Alerts />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FAF3F3',
  },
  text: {
    fontWeight: "bold",
    fontSize: 24,
    marginTop: 30,
  },
  dateText: {
    color: "black",
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
    marginBottom: 20,
  }
});