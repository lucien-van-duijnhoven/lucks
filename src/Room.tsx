import React from "react";
import {
  getDifferenceInTime,
  getEventHeight,
  hourMinuteToMinutes,
  minutesToHoursMinutes,
  stringDubbleZero,
  numberRangeIntoBlocks,
} from "./helper";
import { Event, HourMinute, Block, TimeBlock, Time } from "./type";
import { dummyEvents } from "./foo";

function createEventOverlay(dayRange: Time, events: Event[]): Block<Event>[] {
  const activeBlocks: Block<Event>[] = events.map((event) => {
    const offset = getDifferenceInTime(dayRange.start, event.time.start);
    return {
      data: event,
      offset,
      size: getEventHeight(event.time),
    };
  });
  debugger;
  return activeBlocks;
}

function createDayBackdropBlocks(dayRange: Time): Block<null>[] {
  return numberRangeIntoBlocks(
    hourMinuteToMinutes(dayRange.start),
    hourMinuteToMinutes(dayRange.end),
    60
  ).map((block) => {
    return {
      data: null,
      size: block,
    };
  });
}

function Room({ events, range }: { events: Event[]; range: Time }) {
  const pxPerMinute = 1;
  return (
    <div className="w-full relative bg-lime-100">
      <div className="z-0 w-full absolute" style={{ position: "absolute" }}>
        {createDayBackdropBlocks(range).map((block) => (
          <div
            style={{ height: block.size * pxPerMinute }}
            className="w-full border-2 border-white"
          >
            hello
          </div>
        ))}
      </div>
      This should overlay
      {createEventOverlay(range, events).map((block) => (
        <div
          //   onClick={() => handleOverlayBlockClick(block.data)}
          className={`absolute w-full bg-red-300`}
          style={{
            top: `${block.offset}px`,
            height: getDifferenceInTime(
              block.data.time.start,
              block.data.time.end
            ),
          }}
        >
          <span>
            {block.data.time.start.h}:{stringDubbleZero(block.data.time.end.m)}{" "}
            - {block.data.time.end.h}:{stringDubbleZero(block.data.time.end.m)}
          </span>
        </div>
      ))}
    </div>
  );
}

export default Room;
