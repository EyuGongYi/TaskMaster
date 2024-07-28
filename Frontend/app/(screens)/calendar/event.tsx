import { View, Text, StyleSheet, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getCalendarEvents } from '@/scripts/googleApi';
import { auth } from '@/firebaseConfig';
import { useAuth } from '@/hooks/authContext';
import { router, useLocalSearchParams } from 'expo-router';
import { GoogleEventType } from '@/types/event';

export default function event() {
    const [eventt, setEvents] = useState<GoogleEventType>();
    const {user, eventList} = useAuth();
    const params = useLocalSearchParams();
    const {eventId, date} = params;
    
    useEffect(() => {
        const datee:any  = date!
        const eventTemp = eventList![datee].find(e => e.event.eventId == eventId)!.event;
        setEvents(eventTemp);
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