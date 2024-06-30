import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Pressable } from 'react-native';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GoogleEventType } from '@/types/event';
import { router } from 'expo-router';
import { createGoogleEvent } from '@/scripts/googleApi';
import { useAuth } from '@/hooks/authContext';

export default function AddEventScreen() {
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState<Date>();
  const [eventStart, setEventStart] = useState<Date>();
  const [eventEnd, setEventEnd] = useState<Date>();
  const [eventDetail, setEventDetail] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);
  const {user} = useAuth();

  const saveEvent = async () => {
    if (!eventName || !eventStart || !eventEnd || !eventDate) {
      alert('Please enter all fields');
      return;
    }
    if (eventEnd < eventStart) {
        alert("End timing is before the start timing");
        return;
    }
    //Create event in Google Calendar
    const googleEvent = await createGoogleEvent(user!, eventName, eventStart, eventEnd, eventDetail);
    if (!googleEvent) {
      alert("Creation of Event failed");
      return;
    }
    console.log("created");
    console.log(googleEvent);
    // Update events state to include the new event
    const temp = await AsyncStorage.getItem("events");
    const updatedEvents = temp ? [...JSON.parse(temp), googleEvent]: [googleEvent];
    await AsyncStorage.setItem("events", JSON.stringify(updatedEvents));
    // Clear input fields after saving
    setEventName('');
    setEventStart(undefined);
    setEventDate(undefined);
    setEventEnd(undefined);
    setEventDetail("");
    router.back();
    };

    //Handles all the Input On Change
    const onChangeDate = (event: DateTimePickerEvent, selectedDate?: Date) => {
      const currentDate = selectedDate ? selectedDate : eventDate;
      setShowDatePicker(false);
      setEventDate(currentDate);
      if (eventStart) {
        eventStart.setDate(currentDate!.getDate());
      }
      if (eventEnd) {
        eventEnd.setDate(currentDate!.getDate());
      }
    };
     const onChangeStartTime = (event: DateTimePickerEvent, selectedTime?: Date) => {
      const currentTime = selectedTime ? selectedTime: eventStart;
      setShowStartTimePicker(false);
      if (currentTime && eventDate){
        currentTime.setDate(eventDate.getDate());
      }
      setEventStart(currentTime);
    };

    const onChangeEndTime = (event: DateTimePickerEvent, selectedTime?: Date) => {
      const currentTime = selectedTime ? selectedTime : eventEnd;
      setShowEndTimePicker(false);
      if (currentTime && eventDate){
        currentTime.setDate(eventDate.getDate());
      }
      setEventEnd(currentTime);
    };

    const displayStart = eventStart;
    const displayEnd = eventEnd;

    // Actual Rendering
    return (
        <View style={styles.container}>
        <Text style={styles.text}>Add Event</Text>
        <TextInput
            placeholder="Event Name"
            value={eventName}
            onChangeText={text => setEventName(text)}
            style={styles.input}
        />

        <Text style={styles.text}>Details</Text>
        <TextInput
            placeholder="Details"
            value={eventDetail}
            onChangeText={text => setEventDetail(text)}
            style={styles.input}
        />

        { eventDate ? <Text style={styles.text}>{eventDate.toISOString().split("T")[0]}</Text>: <Text style={styles.text}>Date</Text>}
        <Pressable style={styles.button} onPress={() => setShowDatePicker(true)}>
          <Text style={styles.buttonText}>Select Date</Text>
        </Pressable>
        {showDatePicker && (
            <DateTimePicker
            value={eventDate ? new Date(eventDate) : new Date()}
            mode="date"
            display="default"
            onChange={onChangeDate}
            />
        )}

      {displayStart ? <Text style={styles.text}>{displayStart.getHours() + ":" + displayStart.getMinutes()}</Text>: <Text style={styles.text}>Start Time</Text>}
      <Pressable style={styles.button} onPress={() => setShowStartTimePicker(true)}>
        <Text style={styles.buttonText}>Select Start Time</Text>
      </Pressable>
      {showStartTimePicker && eventDate && (
        <DateTimePicker
          value={eventStart ? eventStart : new Date()}
          mode="time"
          is24Hour={true}
          display="default"
          onChange={onChangeStartTime}
        />
      )}

      {displayEnd ? <Text style={styles.text}>{displayEnd.getHours() + ":" + displayEnd.getMinutes()}</Text>: <Text style={styles.text}>End Time</Text>}
      <Pressable style={styles.button} onPress={() => setShowEndTimePicker(true)}>
        <Text style={styles.buttonText}>Select Start Time</Text>
      </Pressable>
      {showEndTimePicker && eventDate && (
        <DateTimePicker
          value={eventEnd ? eventEnd : new Date()}
          mode='time'
          display="default"
          onChange={onChangeEndTime}
        />
      )}

      <Pressable style={styles.button} onPress={saveEvent}>
        <Text style={styles.buttonText}>Save</Text>
      </Pressable>
      
      <Pressable style={styles.backButton}onPress={() => router.back()}>
        <Text style={styles.backButtonText}>Back</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    justifyContent: "center",
    alignContent: "center",
    
  },
  text: {
    textAlign: "center",
    alignContent: "center",
    justifyContent: "center",
    fontWeight: "bold",
    marginTop: 15,

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
  backButton: {
    marginTop: 100,
    alignSelf: "center",
    justifyContent: "center",
    width: 100,
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