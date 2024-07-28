import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAllAnnouncements, getAllAssignments, getAssignmentStatus, getUserCourseIDs } from '@/app/moodleApi';
import { htmlToText } from 'html-to-text';
import { Assignment, Announcement } from '@/types/canvas';
import { RecoEventType } from '@/types/event';

const Alerts: React.FC = () => {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [recoEvents, setRecoEvents] = useState<RecoEventType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const courseIds = await getUserCourseIDs();
        let incompleteAssignments: Assignment[] = [];
        if (courseIds) {
          const allAssignments = await getAllAssignments(courseIds);
          for (let i = 0; i < allAssignments.length; i++) {
            const currAssignment = allAssignments[i];
            const assignmentStatus = await getAssignmentStatus(currAssignment.id);

            if (assignmentStatus.lastattempt.submission.status !== 'submitted') {
              incompleteAssignments.push({
                id: currAssignment.id,
                name: currAssignment.name,
                description: htmlToText(currAssignment.intro, { wordwrap: false }),
                dueDate: currAssignment.duedate,
              });
            }
          }
        }
        incompleteAssignments.sort((a, b) => a.dueDate - b.dueDate);
        setAssignments(incompleteAssignments);

        let temp: Announcement[] = [];
        const announcements: any[] = await getAllAnnouncements();
        const res = announcements.map((a) => ({
          id: a.id,
          subject: a.name,
          message: htmlToText(a.message, { wordwrap: false }),
          timeCreated: a.created,
        }));
        setAnnouncements(res.sort((a, b) => a.timeCreated - b.timeCreated));

        const recoEvents = await AsyncStorage.getItem('recoEvents');
        if (recoEvents) {
          setRecoEvents(JSON.parse(recoEvents));
        }
      } catch (error) {
        setError('Failed to fetch alerts');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text style={styles.errorText}>{error}</Text>;
  }

  return (
    <View style={styles.alertsContainer}>
      <Text style={styles.sectionHeader}>Alerts:</Text>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {assignments.map((assignment, index) => (
          <View key={index} style={[styles.alertContainer, { backgroundColor: '#8572fb' }]}>
            <Text style={styles.alertMainText}>{assignment.name}</Text>
            <Text style={styles.alertTypeText}>Assignment - Deadline: {new Date(assignment.dueDate * 1000).toLocaleDateString()}</Text>
          </View>
        ))}
        {announcements.map((announcement, index) => (
          <View key={index} style={[styles.alertContainer, { backgroundColor: '#71befc' }]}>
            <Text style={styles.alertMainText}>{announcement.subject}</Text>
            <Text style={styles.alertTypeText}>Announcement</Text>
          </View>
        ))}
        {recoEvents.map((event, index) => (
          <View key={index} style={[styles.alertContainer, { backgroundColor: '#FFBE0B' }]}>
            <Text style={styles.alertMainText}>{event.eventName}</Text>
            <Text style={styles.alertTypeText}>Recommended Event - Priority: {event.priority}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default Alerts;

const styles = StyleSheet.create({
  sectionHeader: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 10,
  },
  alertsContainer: {
    flex: 1,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#FAF3F3',
    width: '100%',
  },
  scrollView: {
    maxHeight: 300,
  },
  alertContainer: {
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  alertMainText: {
    color: 'white',
    fontSize: 16,
    marginBottom: 5,
  },
  alertTypeText: {
    color: 'white',
    fontSize: 12,
    marginBottom: 2,
    fontStyle: 'italic',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 10,
  },
});