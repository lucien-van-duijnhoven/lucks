import React, { useMemo } from "react";
import {
  getDifferenceInTime,
  getEventHeight,
  hourMinuteToMinutes,
  minutesToHoursMinutes,
  stringDubbleZero,
  numberRangeIntoBlocks,
  printTime,
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

function Room({ events, range, onOverlayBlockClick: onOverlayBlockClick }: { events: Event[]; range: Time, onOverlayBlockClick: (event: Event)=>any }) {
  const {sizeMultiplier} = useMetaDataContext()
  const  backdropBlocks = useMemo(()=>createDayBackdropBlocks(range), [range]);
  const overlayBlocks = useMemo(()=>createEventOverlay(range, events),[range,events]);
  return (
    <div className="w-full relative bg-[#04261e]">
      <div className="w-full absolute" style={{ position: "absolute" }}>
        {backdropBlocks.map((block, index) => (
          <div
            style={{ height: block.size * sizeMultiplier }}
            className={"w-full border-2 border-[#fff6e0]" + " " + (index % 2 == 0 ? "bg-[#04261e]" : "bg-[#084c3c]")}
          >
          </div>
        ))}
      </div>
      {overlayBlocks.map((block) => (
        <div
          onClick={() => onOverlayBlockClick(block.data)}
          className={`truncate absolute z-10 w-full bg-[#e65924] rounded-lg border-2  border-solid text-[#fff6e0] border-[#c64414]`}
          style={{
            top: `${block.offset && block.offset * sizeMultiplier}px`,
            height: getDifferenceInTime(
              block.data.time.start,
              block.data.time.end
            ) * sizeMultiplier,
          }}
        > 
          <div className="pl-3 h-full flex flex-col justify-around">
          <b className="w-full truncate">{block.data.title}</b>
          <span className="truncate">
            {printTime(block.data.time)}
          </span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Room;
