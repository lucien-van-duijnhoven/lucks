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
import { useMetaDataContext } from "./MetaDataProvider";

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
  const {sizeMultiplier} = useMetaDataContext()
  return (
    <div className="w-full relative bg-lime-100">
      <div className="z-0 w-full absolute" style={{ position: "absolute" }}>
        {createDayBackdropBlocks(range).map((block) => (
          <div
            style={{ height: block.size * sizeMultiplier }}
            className="w-full border-2 border-white"
          >
          </div>
        ))}
      </div>
      {createEventOverlay(range, events).map((block) => (
        <div
          //   onClick={() => handleOverlayBlockClick(block.data)}
          className={`absolute z-10 w-full bg-red-300 rounded-lg border-1 border-solid`}
          style={{
            top: `${block.offset && block.offset * sizeMultiplier}px`,
            height: getDifferenceInTime(
              block.data.time.start,
              block.data.time.end
            ) * sizeMultiplier,
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
