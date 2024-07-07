import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, SafeAreaView, ScrollView } from 'react-native';
import * as Keychain from 'react-native-keychain';
import { fetchAssignments, fetchAnnouncements} from '../../../moodleApi';
import { Assignment, Announcement } from '@/types/canvas';

const CanvasPage: React.FC = () => {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);

  const handleFetchDetails = async () => {
    try {
      const credentials = await Keychain.getGenericPassword();
      if (credentials) {
        const fetchedAssignments = await fetchAssignments(credentials.password);
        const fetchedAnnouncements = await fetchAnnouncements(credentials.password);
        setAssignments(fetchedAssignments);
        setAnnouncements(fetchedAnnouncements);
      }
    } catch (error) {
      console.error('Error fetching Moodle details:', error);
    }
  };

  useEffect(() => {
    handleFetchDetails();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Pressable onPress={handleFetchDetails}>
          <Text style={styles.loginButton}>Canvas details</Text>
        </Pressable>

        <Text style={styles.sectionTitle}>Assignments</Text>
        {assignments.length > 0 ? (
          assignments.map((assignment) => (
            <View key={assignment.id} style={styles.itemContainer}>
              <Text style={styles.itemTitle}>{assignment.name}</Text>
              <Text>{assignment.intro}</Text>
              <Text>Due Date: {new Date(assignment.duedate * 1000).toLocaleDateString()}</Text>
            </View>
          ))
        ) : (
          <Text>No assignments found</Text>
        )}

        <Text style={styles.sectionTitle}>Announcements</Text>
        {announcements.length > 0 ? (
          announcements.map((announcement) => (
            <View key={announcement.id} style={styles.itemContainer}>
              <Text style={styles.itemTitle}>{announcement.subject}</Text>
              <Text>{announcement.message}</Text>
              <Text>Posted on: {new Date(announcement.timecreated * 1000).toLocaleDateString()}</Text>
            </View>
          ))
        ) : (
          <Text>No announcements found</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default CanvasPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  loginButton: {
    fontWeight: "bold",
    fontSize: 30,
    color: "white",
    backgroundColor: "orange",
    borderRadius: 50,
    paddingVertical: 15,
    paddingHorizontal: 20,
    textAlign: "center",
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 10,
  },
  itemContainer: {
    marginBottom: 15,
    padding: 15,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
});