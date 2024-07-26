import { View, Text, Pressable, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { router } from 'expo-router'
import {Picker} from "@react-native-picker/picker";
import { getFreeTime } from '@/scripts/googleApi';
import { useAuth } from '@/hooks/authContext';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { Interval } from '@/types/event';

export default function Synced() {
    const {chosenList} = useAuth();
    const [showStartDatePicker, setShowStartDatePicker] = useState(false);
    const [showEndDatePicker, setShowEndDatePicker] = useState(false);
    const [startDate, setStartDate] = useState<Date>(new Date());
    const [endDate, setEndDate] = useState<Date>(new Date());
    const [freeTime, setFreeTime] = useState<Interval[]>();

    const onChangeStartDate = (event: DateTimePickerEvent, selectedDate?: Date) => {
        const currentDate = selectedDate ? selectedDate : startDate;
        setShowStartDatePicker(false);
        setStartDate(currentDate);

    };

    const onChangeEndDate = (event: DateTimePickerEvent, selectedDate?: Date) => {
        const currentDate = selectedDate ? selectedDate : endDate;
        setShowEndDatePicker(false);
        setEndDate(currentDate);
    };

    return (
    <View style={styles.container}>
        <Text style={styles.title}>Free Timing</Text>
        <Text style= {styles.content}>array of Free Timing</Text>
        <Pressable onPress={() => router.back()}>
            <Text style={styles.backButton}>
                Back
            </Text>
        </Pressable>
        <Text style= {styles.content}>{startDate.toLocaleDateString()}</Text>
        <Pressable style={styles.button} onPress={() => setShowStartDatePicker(true)}>
          <Text style={styles.buttonText}>Select Start Date</Text>
        </Pressable>
        {showStartDatePicker && (
            <DateTimePicker
            value={startDate ? new Date(startDate) : new Date()}
            mode="date"
            display="default"
            onChange={onChangeStartDate}
            />
        )}
        <Text style= {styles.content}>{endDate.toLocaleDateString()}</Text>
        <Pressable style={styles.button} onPress={() => setShowEndDatePicker(true)}>
          <Text style={styles.buttonText}>Select End Date</Text>
        </Pressable>
        {showEndDatePicker && (
            <DateTimePicker
            value={endDate ? new Date(endDate) : new Date()}
            mode="date"
            display="default"
            onChange={onChangeEndDate}
            />
        )}
        <Pressable onPress={async() => setFreeTime( await getFreeTime(chosenList, startDate.toISOString(), endDate.toISOString()))}>
            <Text style={styles.backButton}>
                FreeTime
            </Text>
        </Pressable>
        {freeTime && freeTime.map(interval => (
            <View>
                <Text>Free Interval</Text>
                <Text>{new Date(interval.start).toLocaleDateString()} {new Date(interval.start).toLocaleTimeString()}</Text>
                <Text>{new Date(interval.end).toLocaleDateString()} {new Date(interval.end).toLocaleTimeString()}</Text>
            </View>
            ))}
    </View>
  )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 30,
        paddingHorizontal: 0,
        
    },
    backButton: {
        width: 60,
        height: 45,
        borderRadius: 25,
        marginRight: 12,
        backgroundColor: "grey",
        textAlign: "center",
        textAlignVertical: "center",
    },
    title: {
        alignSelf: "center",
    },
    content: {
        alignSelf: "center",
    },
    button: {
        margin: 5,
        alignItems: 'center',
        alignSelf: "center",
        paddingVertical: 12,
        borderRadius: 30,
        elevation: 3,
        backgroundColor: 'grey',
        borderColor: "black",
        width: 200,
      },
      buttonText: {
        textAlign: "center",
        fontWeight: "bold",
        color: "white",
        fontSize: 15,
        textShadowColor: "black",
        textShadowOffset:{width: -4, height: 2},
        textShadowRadius: 10
      },
});