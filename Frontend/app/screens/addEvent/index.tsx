import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { EventType, RootStackParamList } from '../../types';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AddEventScreen() {
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventTime, setEventTime] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [events, setEvents] = useState<EventType[]>([]); 
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  // Load events from AsyncStorage when component mounts
  useEffect(() => {
    loadEvents();
  }, []);

  // Function to load events from AsyncStorage
  const loadEvents = async () => {
    try {
      const storedEvents = await AsyncStorage.getItem('events');
      if (storedEvents) {
        setEvents(JSON.parse(storedEvents));
      }
    } catch (error) {
      console.error('Error loading events from AsyncStorage:', error);
    }
  };

  const saveEvent = async () => {
    if (!eventName || !eventDate || !eventTime) {
      alert('Please enter all fields');
      return;
    }

    const newEvent: EventType = {
      eventName,
      eventDate,
      eventTime,
    };

    // Update events state to include the new event
    const updatedEvents = [...events, newEvent];
    setEvents(updatedEvents);

    // Save events to AsyncStorage
    try {
      await AsyncStorage.setItem('events', JSON.stringify(updatedEvents));
    } catch (error) {
      console.error('Error saving events to AsyncStorage:', error);
    }

    // Clear input fields after saving
    setEventName('');
    setEventDate('');
    setEventTime('');

    // Navigate to Calendar screen
    navigation.navigate('Calendar', { events: updatedEvents });
  };

  const onChangeDate = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate ? selectedDate.toISOString().split('T')[0] : eventDate;
    setShowDatePicker(false);
    setEventDate(currentDate);
  };

  const onChangeTime = (event: DateTimePickerEvent, selectedTime?: Date) => {
    const currentTime = selectedTime ? selectedTime.toISOString().split('T')[1].substring(0, 5) : eventTime;
    setShowTimePicker(false);
    setEventTime(currentTime);
  };

  return (
    <View style={styles.container}>
      <Text>Add Event</Text>
      <TextInput
        placeholder="Event Name"
        value={eventName}
        onChangeText={text => setEventName(text)}
        style={styles.input}
      />
      <Button title="Select Date" onPress={() => setShowDatePicker(true)} />
      {showDatePicker && (
        <DateTimePicker
          value={eventDate ? new Date(eventDate) : new Date()}
          mode="date"
          display="default"
          onChange={onChangeDate}
        />
      )}
      <Button title="Select Time" onPress={() => setShowTimePicker(true)} />
      {showTimePicker && (
        <DateTimePicker
          value={eventTime ? new Date(`2000-01-01T${eventTime}:00.000Z`) : new Date()}
          mode="time"
          is24Hour={true}
          display="default"
          onChange={onChangeTime}
        />
      )}
      <Button title="Save Event" onPress={saveEvent} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
});


