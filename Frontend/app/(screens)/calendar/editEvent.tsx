import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GoogleEventType, RecoEventType } from '@/types/event';
import { router, useLocalSearchParams } from 'expo-router';
import { createGoogleEvent, updateGoogleEvent } from '@/scripts/googleApi';
import { useAuth } from '@/hooks/authContext';

export default function EditEventScreen() {
  const params = useLocalSearchParams();
  const {eventId, date, start, end, name, details} = params;
  const [eventName, setEventName] = useState<string>(String(name));
  const [eventDate, setEventDate] = useState<Date>(new Date(Number(date)));
  const [eventStart, setEventStart] = useState<Date>(new Date(Number(start)));
  const [eventEnd, setEventEnd] = useState<Date>(new Date(Number(end)));
  const [eventDuration, setEventDuration] = useState<number>();
  const [eventDetail, setEventDetail] = useState<string>(String(details));
  const [priority, setPriority] = useState<'Low' | 'Medium' | 'High' | 'ASAP'>('Low');
  const [deadline, setDeadline] = useState<Date>();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);
  const [showDeadlinePicker, setShowDeadlinePicker] = useState(false);
  const { user } = useAuth();
  const [addButtonDisable, setAddButtonDisable] = useState(false);

  const saveEvent = async () => {
    if (!eventName) {
      alert('Please enter the event name');
      return;
    }
    if (!eventStart && !eventEnd && !priority) {
      alert('Please set a priority if no timings are provided');
      return;
    }
    if (!eventStart && !eventEnd && !eventDuration) {
      alert('Please set a duration if no start and end time are provided');
      return;
    }

    if (eventEnd && eventStart && eventEnd < eventStart) {
      alert("End timing is before the start timing");
      return;
    }

    if (eventStart && eventEnd ) {
      const googleEvent: GoogleEventType = {
        eventId: String(eventId),
        eventName,
        eventDetail,
        eventStart,
        eventEnd,
      };
      setAddButtonDisable(true);

      const newGoogleEvent = await updateGoogleEvent(user!, googleEvent.eventName, googleEvent.eventStart, googleEvent.eventEnd, googleEvent.eventDetail, googleEvent.eventId!);
      if (!newGoogleEvent) {
        alert("Failed to create Google event");
        return;
      }
    } 
    router.back();
    router.back();
    setAddButtonDisable(false);
    
  };

    //Handles all the Input On Change
    const onChangeDate = (event: DateTimePickerEvent, selectedDate?: Date) => {
      const currentDate = selectedDate ? selectedDate : eventDate;
      setShowDatePicker(false);
      setEventDate(currentDate);
      if (eventStart) {
        eventStart.setDate(currentDate!.getDate());
        eventStart.setMonth(currentDate!.getMonth());
        eventStart.setFullYear(currentDate!.getFullYear());
      }
      if (eventEnd) {
        eventEnd.setDate(currentDate!.getDate());
        eventEnd.setMonth(currentDate!.getMonth());
        eventEnd.setFullYear(currentDate!.getFullYear());
      }
    };
     const onChangeStartTime = (event: DateTimePickerEvent, selectedTime?: Date) => {
      const currentTime = selectedTime ? selectedTime: eventStart;
      setShowStartTimePicker(false);
      if (currentTime && eventDate){
        currentTime.setDate(eventDate.getDate());
        currentTime.setMonth(eventDate.getMonth());
        currentTime.setFullYear(eventDate.getFullYear());
      }
      setEventStart(currentTime);
    };

  const onChangeEndTime = (event: DateTimePickerEvent, selectedTime?: Date) => {
    const currentTime = selectedTime ? selectedTime : eventEnd;
    setShowEndTimePicker(false);
    if (currentTime && eventDate) {
      currentTime.setDate(eventDate.getDate());
    }
    setEventEnd(currentTime);
  };

  const onChangeDeadline = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate ? selectedDate : deadline;
    setShowDeadlinePicker(false);
    setDeadline(currentDate);
  };

  const displayStart = eventStart;
  const displayEnd = eventEnd;

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

      <Text style={styles.text}>Priority (Optional if timings are provided)</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={priority}
          onValueChange={(itemValue) => setPriority(itemValue as 'Low' | 'Medium' | 'High' | 'ASAP')}
          style={styles.picker}
        >
          <Picker.Item label="Low" value="Low" />
          <Picker.Item label="Medium" value="Medium" />
          <Picker.Item label="High" value="High" />
          <Picker.Item label="ASAP" value="ASAP" />
        </Picker>
      </View>

      <Text style={styles.text}>Duration (Minutes) (Optional if timings are provided)</Text>
      <TextInput
        placeholder="Event Duration"
        value={eventDuration ? eventDuration.toString() : ''}
        onChangeText={text => setEventDuration(parseInt(text))}
        style={styles.input}
        keyboardType="numeric"
      />

      {eventDate ? <Text style={styles.text}>{eventDate.toISOString().split("T")[0]}</Text> : <Text style={styles.text}>Date</Text>}
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

      {displayStart ? <Text style={styles.text}>{displayStart.getHours() + ":" + displayStart.getMinutes()}</Text> : <Text style={styles.text}>Start Time</Text>}
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

      {displayEnd ? <Text style={styles.text}>{displayEnd.getHours() + ":" + displayEnd.getMinutes()}</Text> : <Text style={styles.text}>End Time</Text>}
      <Pressable style={styles.button} onPress={() => setShowEndTimePicker(true)}>
        <Text style={styles.buttonText}>Select End Time</Text>
      </Pressable>
      {showEndTimePicker && eventDate && (
        <DateTimePicker
          value={eventEnd ? eventEnd : new Date()}
          mode='time'
          display="default"
          onChange={onChangeEndTime}
        />
      )}

      <Text style={styles.text}>Deadline (Optional)</Text>
      <Pressable style={styles.button} onPress={() => setShowDeadlinePicker(true)}>
        <Text style={styles.buttonText}>Select Deadline</Text>
      </Pressable>
      {showDeadlinePicker && (
        <DateTimePicker
          value={deadline ? new Date(deadline) : new Date()}
          mode="date"
          display="default"
          onChange={onChangeDeadline}
        />
      )}

      <Pressable style={styles.button} onPress={saveEvent} disabled={addButtonDisable}>
        <Text style={styles.buttonText}>Save</Text>
      </Pressable>

      <Pressable style={styles.backButton} onPress={() => router.back()}>
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
  pickerContainer: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    marginBottom: 12,
  },
  picker: {
    height: 40,
    color: 'black',
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
    textShadowOffset: { width: -4, height: 2 },
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