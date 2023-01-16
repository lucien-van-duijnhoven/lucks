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

type Rooms = Room[]

export interface Block<T> {
  data: T;
  offset?: number;
  size: number;
}

const test: Block<Time> = {
  size: 0,
  offset: 0,
  data: {
    start: {
      h: 0,
      m: 0,
    },
    end: {
      h: 0,
      m: 0,
    },
  },
};

export interface TimeBlock {
  block: number;
  time: Time;
}

type ID = { id: "A"; idb: "B" } | { id: "C"; idb: "D" };

const id: ID = { id: "C", idb: "D" };
