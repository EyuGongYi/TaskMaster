import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, Pressable, SafeAreaView, ScrollView, RefreshControl, ActivityIndicator } from 'react-native';
import * as Keychain from 'react-native-keychain';
import { fetchAssignments, fetchAnnouncements } from '../../../moodleApi';
import { Assignment, Announcement } from '@/types/canvas';

const CanvasPage: React.FC = () => {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleFetchDetails = async () => {
    try {
      setLoading(true);
      const credentials = await Keychain.getGenericPassword();
      if (credentials) {
        const fetchedAssignments = await fetchAssignments(credentials.password);
        const fetchedAnnouncements = await fetchAnnouncements(credentials.password);
        setAssignments(fetchedAssignments);
        setAnnouncements(fetchedAnnouncements);
        setError('');
      } else {
        setError('No credentials stored.');
      }
    } catch (error) {
      console.error('Error fetching Moodle details:', error);
      setError('Failed to fetch data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleFetchDetails();
  }, []);

  const onRefresh = useCallback(() => {
    handleFetchDetails();
  }, []);
import { View, Text, StyleSheet, Pressable, SafeAreaView } from 'react-native'
import React from 'react'
import { getCalendarEvents } from '@/scripts/googleApi';
import { auth } from '@/firebaseConfig';


export default function index() {
    const handleLogin = async () => {
      
    };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={onRefresh}
          />
        }
      >
        <Pressable onPress={handleFetchDetails} style={styles.refreshButton}>
          <Text style={styles.loginButton}>Refresh Data</Text>
        </Pressable>

        {loading && <ActivityIndicator size="large" color="#0000ff" />}
        {error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : (
          <>
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
          </>
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
  scrollViewContent: {
    paddingBottom: 20,
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
  },
  refreshButton: {
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
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 10,
  },
});