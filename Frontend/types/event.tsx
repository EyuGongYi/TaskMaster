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
    eventId: string;
    eventName: string;
    eventDetail: string;
    eventStart: Date;
    eventEnd: Date;
    eventDate: Date;
};

export interface Events{
    [date: string] : AgendaEntry[];
  }