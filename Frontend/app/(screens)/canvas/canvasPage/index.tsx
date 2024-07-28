import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, ActivityIndicator } from 'react-native';
import { Assignment, Announcement } from '@/types/canvas';
import { getAllAnnouncements, getAllAssignments, getAssignmentStatus, getUserCourseIDs } from '@/app/moodleApi';
import { htmlToText } from 'html-to-text';

const CanvasPage: React.FC = () => {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  // get undone assignments
  useEffect(() => {
    const func = async () => {
      const courseIds = await getUserCourseIDs();
      let incompleteAssignments = [];
      if (courseIds) {
        const allAssignments = await getAllAssignments(courseIds);
        for (let i = 0; i < allAssignments.length; i++) {
          const currAssignment = allAssignments[i];
          const assignmentStatus = await getAssignmentStatus(currAssignment.id);

          if (assignmentStatus.lastattempt.submission.status !== "submitted") {
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
    };
    func();
  }, []);

  // get announcements
  useEffect(() => {
    const func = async () => {
      let temp: Announcement[] = [];
      const announcements: any[] = await getAllAnnouncements();
      const res = announcements.map((a) => ({
        id: a.id,
        subject: a.name,
        message: htmlToText(a.message, { wordwrap: false }),
        timeCreated: a.created,
      }));
      setAnnouncements(res.sort((a, b) => a.timeCreated - b.timeCreated));
    };
    func();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {loading && <ActivityIndicator size="large" color="#0000ff" />}
        {error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : (
          <>
            <Text style={styles.sectionTitle}>Assignments</Text>
            <ScrollView style={{ maxHeight: "50%" }} showsVerticalScrollIndicator={false}>
              {assignments.length > 0 ? (
                assignments.map((assignment) => (
                  <View key={assignment.id} style={[styles.itemContainer, styles.assignmentContainer]}>
                    <Text style={styles.itemTitle}>{assignment.name}</Text>
                    <Text style={styles.details}>{assignment.description}</Text>
                    <Text style={styles.details}>Due Date: {new Date(assignment.dueDate * 1000).toLocaleDateString()}</Text>
                  </View>
                ))
              ) : (
                <Text>No assignments found</Text>
              )}
            </ScrollView>

            <Text style={styles.sectionTitle}>Announcements</Text>
            <ScrollView style={{ maxHeight: "50%" }} showsVerticalScrollIndicator={false}>
              {announcements.length > 0 ? (
                announcements.map((announcement) => (
                  <View key={announcement.id} style={[styles.itemContainer, styles.announcementContainer]}>
                    <Text style={styles.itemTitle}>{announcement.subject}</Text>
                    <Text style={styles.details}>{announcement.message}</Text>
                    <Text style={styles.details}>Posted on: {new Date(announcement.timeCreated * 1000).toLocaleDateString()}</Text>
                  </View>
                ))
              ) : (
                <Text>No announcements found</Text>
              )}
            </ScrollView>
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
    backgroundColor: '#FAF3F3',
    marginTop: 30,
  },
  scrollViewContent: {
    paddingBottom: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 10,
  },
  itemContainer: {
    marginBottom: 15,
    padding: 15,
    borderRadius: 10,
  },
  assignmentContainer: {
    backgroundColor: "#8575fb", // Assignment background color
  },
  announcementContainer: {
    backgroundColor: "#71befc", // Announcement background color
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  details: {
    color: "white",
    fontStyle: "italic",
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 10,
  },
});