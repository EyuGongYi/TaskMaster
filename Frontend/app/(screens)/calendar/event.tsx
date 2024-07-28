import { View, Text, StyleSheet, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { deleteGoogleEvent, getCalendarEvents } from '@/scripts/googleApi';
import { auth } from '@/firebaseConfig';
import { useAuth } from '@/hooks/authContext';
import { router, useLocalSearchParams } from 'expo-router';
import { GoogleEventType } from '@/types/event';



export default function event() {
    const [eventt, setEvents] = useState<GoogleEventType>();
    const {user, eventList} = useAuth();
    const params = useLocalSearchParams();
    const {eventId, date} = params;
 
    async function deleteButton(eventId: string) {
        if (await deleteGoogleEvent(user!, eventId)) {
            router.back();
            return;
        } else {
            alert("Deleting Failed");
            return;
        }
    }

    useEffect(() => {
        const datee:any  = new Date(Number(date));
        const datte = datee.getDate().toString().length > 1 ? 
            datee.toISOString().split("T")[0].slice(0,-2) + datee.getDate(): 
            datee.toISOString().split("T")[0].slice(0,-2) + "0" + datee.getDate();
        if (eventList![datte].find(e => e.event.eventId == eventId)) {
            const eventTemp = eventList![datte].find(e => e.event.eventId == eventId)!.event;
            setEvents(eventTemp);
        }else {
            router.back();
        }
        
    },[eventId, date, eventList]);
    return (
        <View style={styles.container}>
        {eventt ? (
            <View style={styles.eventContainer}>
                <Text style={styles.label}>Event Name</Text>
                <Text style={styles.value}>{eventt.eventName}</Text>
                <Text style={styles.label}>Description</Text>
                <Text style={styles.value}>{eventt.eventDetail}</Text>
                <Text style={styles.label}>Date</Text>
                <Text style={styles.value}>{eventt.eventStart.toLocaleDateString()}</Text>
                <Text style={styles.label}>Start Timing</Text>
                <Text style={styles.value}>{eventt.eventStart.toLocaleTimeString()}</Text>
                <Text style={styles.label}>End Timing</Text>
                <Text style={styles.value}>{eventt.eventEnd.toLocaleTimeString()}</Text>
                <Pressable
                    style={styles.editButton}
                    onPress={() => router.push({
                        pathname: "/(screens)/calendar/editEvent",
                        params: {
                            eventId: eventt.eventId,
                            date: eventt.eventStart.getTime(),
                            start: eventt.eventStart.getTime(),
                            end: eventt.eventEnd.getTime(),
                            name: eventt.eventName,
                            details: eventt.eventDetail
              }
            })}
          >
            <Text style={styles.buttonText}>Edit</Text>
          </Pressable>
          <Pressable 
          style={styles.deleteButton}
          onPress={() => deleteButton(eventt.eventId!)}>
            <Text style={styles.buttonText}>Delete</Text>
        </Pressable>
        </View>
      ) : (
        <Text style={styles.noEventText}>No event found</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FAF3F3', // Background color
  },
  eventContainer: {
    alignItems: 'center',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4A4A4A',
    marginTop: 10,
  },
  value: {
    fontSize: 16,
    color: '#4A4A4A',
    marginBottom: 10,
  },
  editButton: {
    marginTop: 20,
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 30,
    backgroundColor: '#8575fb', // Button background color
    width: 100,
  },
  deleteButton: {
    marginTop: 20,
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 30,
    backgroundColor: '#f15a7e', // Button background color
    width: 100,
  },
  buttonText: {
    fontWeight: 'bold',
    color: 'white', // Button text color
    fontSize: 15,
  },
  noEventText: {
    fontSize: 18,
    color: '#4A4A4A',
    textAlign: 'center',
    marginTop: 50,
  },
});
