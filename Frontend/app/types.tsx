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

export type RootStackParamList = {
    Login: undefined;
    Home: undefined;
    Register: undefined;
    Recommend: { alerts: AlertType[] } | undefined;
    Calendar: { events: EventType[] } | undefined;
    Sync: undefined;
    AddEvent: undefined;
};