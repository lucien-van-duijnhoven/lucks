import React, { createContext, FC, ReactDOM, useContext, useState } from "react";
import { dummyEvents, dummyRooms } from "./data";
import { Block, Event, HourMinute, Time, TimeBlock } from "./type";
import Room from "./Room";
import SidBar from "./SideBar";
import { ThemeProvider } from "./ThemeProvider";
import { MetaDataProvider, useMetaDataContext } from "./MetaDataProvider";
import EventModal from "./EventModal";


export const Schedule: FC = () => {
  const dayRange: Time = {
    start: {
      h: 7,
      m: 0,
    },
    end: {
      h: 17,
      m: 0,
    },
  };

  // const blocks = numberRangeIntoBlocks(hourMinuteToMinutes(dayRange.start), hourMinuteToMinutes(dayRange.end), 60);

  function handleTimesTest() {}

  function handleOverlayBlockClick(event: Event) {}

  const {sizeMultiplier, setSizeMultiplier} = useMetaDataContext()

  const [eventModalData, setEventModalData] = useState<null|Event>(null)

  return (
    <ThemeProvider>
    <MetaDataProvider>
      {eventModalData && (
        <EventModal data={eventModalData}/>
      )}
      <div className="snap-x flex overflow-x-scroll overflow-y-hidden snap-mandatory h-fit ">
        <div className="sticky z-50 left-0 w-1/5 min-w-fit bg-[#93ffe0] shrink-0">
          <h1>Times</h1>
          <SidBar range={dayRange} />
        </div>
        {dummyRooms.map(room =>
          <div key={room.title} className="snap-center shrink-0 w-full bg-[#fef6e0] flex place-items-end flex-col">
            <div className="w-4/5 flex">
              <h2 className="place-self-center bg-[#93ffe0] w-full">{room.title}</h2>
            </div>
            {/* dayContainer */}
            <div className="w-4/5 h-fit relative bg-[#93ffe0]">
              <Room
                events={room.events}
                range={dayRange}
              />
            </div>
          </div>
        )}
      </div>
    </MetaDataProvider>
    </ThemeProvider>
  );
};

