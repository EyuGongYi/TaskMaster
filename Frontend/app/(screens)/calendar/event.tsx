import { View, Text, StyleSheet, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { deleteGoogleEvent, getCalendarEvents } from '@/scripts/googleApi';
import { auth } from '@/firebaseConfig';
import { useAuth } from '@/hooks/authContext';
import { router, useLocalSearchParams } from 'expo-router';
import { GoogleEventType } from '@/types/event';



export default function event() {
    console.log("1");
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
    <View style= {styles.container}>
        {eventt && <View>
        <Text>Event Name</Text>
        <Text>{eventt.eventName}</Text>
        <Text>Description</Text>
        <Text>{eventt.eventDetail}</Text>
        <Text>Date</Text>
        <Text>{eventt.eventStart.toLocaleDateString()}</Text>
        <Text>Start Timing</Text>
        <Text>{eventt.eventStart.toLocaleTimeString()}</Text>
        <Text>End Timing</Text>
        <Text>{eventt.eventEnd.toLocaleTimeString()}</Text>
        <Pressable onPress={() => router.push({pathname:"/(screens)/calendar/editEvent",
                                               params:{eventId: eventt.eventId,
                                                       date: eventt.eventStart.getTime(),
                                                       start: eventt.eventStart.getTime(),
                                                       end: eventt.eventEnd.getTime(),
                                                       name: eventt.eventName,
                                                       details: eventt.eventDetail
                                                      }})}>
            <Text>
                Edit
            </Text>
        </Pressable>
        <Pressable onPress={() => deleteButton(eventt.eventId!)}>
            <Text>Delete</Text>
        </Pressable>
        </View>}
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "flex-start",
        padding: 20,
    },
});