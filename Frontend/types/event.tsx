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
    eventStart: Date;
    eventEnd: Date;
};
export type RecoEventType = {
    eventId?: string;
    eventName: string;
    eventDetail: string;
    priority: 'Low' | 'Medium' | 'High' | 'ASAP';
    deadline: Date;
    eventDuration: number;
};

// Update AgendaEntry type to include start and end times
export interface CustomAgendaEntry extends AgendaEntry {
    start: Date;
    end: Date;
    event: GoogleEventType;
}

export interface Events{
    [date: string] : CustomAgendaEntry[];
  }

export interface Interval {
    start: string; // ISO format
    end: string;   // ISO format
}