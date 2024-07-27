import { AgendaEntry } from "react-native-calendars";

export type AlertType = {
    type: string;
    message: string;
    deadline?: string;
};

export type EventList = {
    eventList: GoogleEventType[],
};

export type GoogleEventType = {
    eventId?: string;
    eventName: string;
    eventDetail: string;
    eventStart?: Date;
    eventEnd?: Date;
    eventDate?: Date;
    priority?: 'Low' | 'Medium' | 'High' | 'ASAP';
    deadline?: Date;
    eventDuration?: number
};

export interface Events{
    [date: string] : AgendaEntry[];
  }

export interface Interval {
    start: string; // ISO format
    end: string;   // ISO format
}