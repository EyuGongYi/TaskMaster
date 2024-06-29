import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Pressable } from 'react-native';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GoogleEventType } from '@/types/event';
import { router } from 'expo-router';

export default function AddEventScreen() {
    const [eventName, setEventName] = useState('');
    const [eventDate, setEventDate] = useState('');
    const [eventStart, setEventStart] = useState<Date>();
    const [eventEnd, setEventEnd] = useState<Date>();
    const [eventDetail, setEventDetail] = useState('');
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showStartTimePicker, setShowStartTimePicker] = useState(false);
    const [showEndTimePicker, setShowEndTimePicker] = useState(false);


    const saveEvent = async () => {
        if (!eventName || !eventStart || !eventEnd || !eventDate) {
          alert('Please enter all fields');
          return;
        }
        if (eventEnd < eventStart) {
            alert("End timing is before the start timing");
            return;
        }

        const newEvent: GoogleEventType = {
          eventName,
          eventDate,
          eventStart: eventStart.toISOString().split('T')[1].substring(0, 5),
          eventEnd: eventEnd.toISOString().split('T')[1].substring(0, 5),
          eventDetail,
        };

        // Update events state to include the new event
        const temp = await AsyncStorage.getItem("events");

        const updatedEvents = temp ? [...JSON.parse(temp), newEvent]: [newEvent];
        await AsyncStorage.setItem("events", JSON.stringify(updatedEvents));

        // Clear input fields after saving
        setEventName('');
        setEventStart(undefined);
        setEventDate('');
        setEventEnd(undefined);
        setEventDetail('');
        router.back();
    };

    const onChangeDate = (event: DateTimePickerEvent, selectedDate?: Date) => {
        const currentDate = selectedDate ? selectedDate.toISOString().split('T')[0] : eventDate;
        setShowDatePicker(false);
        setEventDate(currentDate);
    };

     const onChangeStartTime = (event: DateTimePickerEvent, selectedTime?: Date) => {
        const currentTime = selectedTime ? selectedTime: eventStart;
        setShowStartTimePicker(false);
        setEventStart(currentTime);
     };

    const onChangeEndTime = (event: DateTimePickerEvent, selectedTime?: Date) => {
        const currentTime = selectedTime ? selectedTime : eventEnd;
        setShowEndTimePicker(false);
        setEventEnd(currentTime);
    };
  
    const displayStart = eventStart;
    const displayEnd = eventEnd;

    return (
        <View style={styles.container}>
        <Text>Add Event</Text>
        <TextInput
            placeholder="Event Name"
            value={eventName}
            onChangeText={text => setEventName(text)}
            style={styles.input}
        />

        <Text>Details</Text>
        <TextInput
            placeholder="Details"
            value={eventDetail}
            onChangeText={text => setEventDetail(text)}
            style={styles.input}
        />

        <Text>{eventDate}</Text>
        <Button title="Select Date" onPress={() => setShowDatePicker(true)} />
        {showDatePicker && (
            <DateTimePicker
            value={eventDate ? new Date(eventDate) : new Date()}
            mode="date"
            display="default"
            onChange={onChangeDate}
            />
        )}

      {displayStart ? <Text>{displayStart.getHours() + ":" + displayStart.getMinutes()}</Text>: <Text>Start Time</Text>}
      <Button title="Select Start Time" onPress={() => setShowStartTimePicker(true)} />
      {showStartTimePicker && (
        <DateTimePicker
          value={eventStart ? eventStart : new Date()}
          mode="time"
          is24Hour={true}
          display="default"
          onChange={onChangeStartTime}
        />
      )}

      {displayEnd ? <Text>{displayEnd.getHours() + ":" + displayEnd.getMinutes()}</Text>: <Text>End Time</Text>}
      <Button title="Select End Time" onPress={() => setShowEndTimePicker(true)} />
      {showEndTimePicker && (
        <DateTimePicker
          value={eventEnd ? eventEnd : new Date()}
          mode='time'
          display="default"
          onChange={onChangeEndTime}
        />
      )}

      <Button title="Save Event" onPress={saveEvent} />
      <Pressable style={styles.backButton}onPress={() => router.back()}>
        <Text style={styles.backButtonText}>Back</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    
  },
  backButton: {
    marginTop: 100,
    alignContent: "center",
    justifyContent: "center",
  },
  backButtonText: {
    textAlign: "center",
    fontWeight: "bold",
    color: "white",
    backgroundColor: "black",
    paddingHorizontal: 0,
    borderRadius: 30,
    paddingVertical: 10,
    fontSize: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
});