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
    <div className="w-full relative bg-[#04261e]">
      <div className="w-full absolute" style={{ position: "absolute" }}>
        {createDayBackdropBlocks(range).map((block, index) => (
          <div
            style={{ height: block.size * sizeMultiplier }}
            className={"w-full border-2 border-[#fff6e0]" + " " + (index % 2 == 0 ? "bg-[#04261e]" : "bg-[#084c3c]")}
          >
          </div>
        ))}
      </div>
      {createEventOverlay(range, events).map((block) => (
        <div
            // onClick={() => handleOverlayBlockClick(block.data)}
          className={`absolute z-10 w-full bg-[#e65924] rounded-lg border-1 border-solid text-[#fff6e0]`}
          style={{
            top: `${block.offset && block.offset * sizeMultiplier}px`,
            height: getDifferenceInTime(
              block.data.time.start,
              block.data.time.end
            ) * sizeMultiplier,
          }}
        >
          <span className="truncate pl-3">
          <b>{block.data.title}</b>{" "}
            {block.data.time.start.h}:{stringDubbleZero(block.data.time.start.m)}{" "}
            - {block.data.time.end.h}:{stringDubbleZero(block.data.time.end.m)}{" "}
            
          </span>
        </div>
      ))}
    </div>
  );
}

export default Room;
