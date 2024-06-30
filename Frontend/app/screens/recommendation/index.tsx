import React from "react";
import { Text, View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { useNavigation, NavigationProp, useRoute, RouteProp } from "@react-navigation/native";

type AlertType = {
  type: string;
  message: string;
  deadline?: string;
};

type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  Register: undefined;
  Recommend: { alerts: AlertType[] };
  Calendar: undefined;
  Sync: undefined;
};

type RecommendScreenRouteProp = RouteProp<{ params: { alerts: AlertType[] } }, 'params'>;

export default function Recommendation() {
  const route = useRoute<RecommendScreenRouteProp>();
  const { alerts = [] } = route.params || {};
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const unscheduledEvents = alerts.filter(alert => alert.type === 'Assignment');

  return (
    <View style={styles.mainContainer}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.sectionHeader}>Recommended Workflow</Text>
        {unscheduledEvents.map((alert, index) => (
          <View key={index} style={styles.alertContainer}>
            <Text style={styles.alertMainText}>{alert.message}</Text>
            <Text style={styles.alertTypeText}>{alert.type} - Deadline: {alert.deadline}</Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.tabBar}>
        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('Home')}>
          <Text>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('Calendar')}>
          <Text>Calendar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('Recommend', { alerts })}>
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
  mainContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  sectionHeader: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 10,
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
  alertTypeText: {
    color: "white",
    fontSize: 12,
    fontStyle: "italic",
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
});