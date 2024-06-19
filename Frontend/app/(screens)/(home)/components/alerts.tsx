import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { StyleSheet } from 'react-native';
import AssignmentAlerts from '@/constants/AssignmentAlert';

interface AlertProps {
  alerts: AssignmentAlerts[];
}

const Alert:React.FC<AlertProps> = ({alerts}) => {
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.sectionHeader}>Alerts:</Text>
      <ScrollView style={styles.alertsContainer}>
          {alerts.map((alert: any, index: any) => (
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
      </ScrollView>  
    </View>
    
  )
}

export default Alert;

//StyleSheet
const styles = StyleSheet.create({
    mainContainer: {
      flex:1
    },
    sectionHeader: {
      fontWeight: "bold",
      flex: 1,
      fontSize: 18,
      marginBottom: 10,
    },
    alertsContainer: {
      position: "absolute",
      top: 40,
      height: 250,
      width: 350,
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
  });