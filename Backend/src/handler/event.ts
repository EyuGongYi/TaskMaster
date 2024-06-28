import { Request, Response } from 'express-serve-static-core';
import { Event } from '../dB/schemas/Event';
import { User } from '../dB/schemas/User';

export async function createEvent(request: Request, response: Response) {
  const { eventName, eventDate, eventTime } = request.body;
  const userId = (request.user as any)._id;

  if (!eventName || !eventDate || !eventTime) {
    return response.status(400).send({ msg: 'All fields are required' });
  }

  const newEvent = new Event({
    eventName,
    eventDate,
    eventTime,
    userId,
  });

  await newEvent.save();
  response.status(201).send(newEvent);
}

export async function getEvents(request: Request, response: Response) {
  const userId = (request.user as any)._id;
  const events = await Event.find({ userId });
  response.status(200).send(events);
}