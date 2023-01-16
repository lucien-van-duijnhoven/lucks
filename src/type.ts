export interface HourMinute {
  h: number;
  m: number;
}

export interface Time {
  start: HourMinute;
  end: HourMinute;
}

export interface Event {
  title: string;
  speaker: string;
  description: string;
  time: Time;
}

export interface Room {
  events: Event[],
  title: string
}

export type Rooms = Room[]

export interface Block<T> {
  data: T;
  offset?: number;
  size: number;
}

export interface TimeBlock {
  block: number;
  time: Time;
}

type ID = { id: "A"; idb: "B" } | { id: "C"; idb: "D" };

const id: ID = { id: "C", idb: "D" };
