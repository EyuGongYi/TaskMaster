export type AlertType = {
    type: string;
    message: string;
    deadline?: string;
};

export type EventType = {
    eventName: string;
    eventDate: string;
    eventTime: string;
};

export type GoogleEventType = {
    eventId?: string;
    eventName: string;
    eventDetail: string;
    eventStart: string;
    eventEnd: string;
    eventDate: string;
};