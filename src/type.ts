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

export interface OverlayBlock {
  event: Event;
  offset: number;
}
