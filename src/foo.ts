// import { Event } from "./New";

import { Event } from "./type";

export const dummyEvents: Event[] = [
  {
    title: "1",
    description: "something 1",
    speaker: "me",
    time: {
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
    title: "2",
    description: "something 2",
    speaker: "me again",
    time: {
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
    title: "3",
    description: "something 3",
    speaker: "me ones more",
    time: {
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
