import { Event } from "./New";

export const dummyEvents: Event[] = [
  {
    data: {
      title: "hello",
    },
    times: {
      start: {
        h: 10,
        m: 12,
      },
      end: {
        h: 10,
        m: 55,
      },
    },
  },
  {
    data: {
      title: "event 2",
    },
    times: {
      start: {
        h: 11,
        m: 0,
      },
      end: {
        h: 11,
        m: 30,
      },
    },
  },
  {
    data: {
      title: "event 3",
    },
    times: {
      start: {
        h: 12,
        m: 12,
      },
      end: {
        h: 13,
        m: 0,
      },
    },
  },
];
