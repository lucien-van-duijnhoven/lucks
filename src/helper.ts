import { Event, HourMinute, Block, TimeBlock, Time } from "./type";

export function getEventHeight(event: Time) {
  const eventDuration =
    hourMinuteToMinutes(event.end) - hourMinuteToMinutes(event.start);
  return eventDuration;
}
export function hourMinuteToMinutes(timeRange: HourMinute) {
  return timeRange.h * 60 + timeRange.m;
}

export function minutesToHoursMinutes(minutes: number): HourMinute {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return { h, m };
}
export function stringDubbleZero(input: number) {
  return input === 0 ? "00" : `${input}`;
}

export function getDifferenceInTime(start: HourMinute, end: HourMinute) {
  const startInMinutes = hourMinuteToMinutes(start);
  const endInMinutes = hourMinuteToMinutes(end);
  return endInMinutes - startInMinutes;
}
export function numberRangeIntoBlocks(
  start: number,
  end: number,
  blockSize: number
) {
  const range = end - start;
  if (range < 0) {
    throw new Error(
      "Negative range. Please make sure the start is before the end."
    );
  }
  if (blockSize <= 0) {
    throw new Error("blockSize has to be a positive number");
  }
  const blocksAmount = Math.floor(range / blockSize);
  const bufferBlock = range % blockSize;
  const blocks: number[] = new Array(blocksAmount).fill(blockSize);
  blocks.push(bufferBlock);
  return blocks;
}

export function printTime (time: Time): string {
  return `${time.start.h}:${stringDubbleZero(time.start.m)} - ${time.end.h}:${stringDubbleZero(time.end.m)}`
}
