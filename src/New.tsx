import React, { createContext, FC, ReactDOM, useContext } from "react";
import { dummyEvents } from "./foo";
import { Block, Event, HourMinute, Time, TimeBlock } from "./type";
import Room from "./Room";
import SidBar from "./SideBar";
import { ThemeProvider } from "./ThemeProvider";
import { MetaDataProvider, useMetaDataContext } from "./MetaDataProvider";
// interface HourMinute {
//   h: number;
//   m: number;
// }

// interface Time {
//   start: HourMinute;
//   end: HourMinute;
// }

// export interface Event {
//   times: Time;
//   data?: any;
// }

interface ActiveBlock {
  time: Time;
  offset: number;
}

export const New: FC = () => {
  const pxPerMinute = 1;
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

  return (
    <ThemeProvider>
    <MetaDataProvider>
    <main className="bg-slate-900 w-full text-[#18417f] h-fit">
      <button onClick={handleTimesTest}>run times</button>
      <input type="number" name="" id="" value={sizeMultiplier} onChange={(e) => setSizeMultiplier(new Number(e.target.value))} />
      <div className="snap-x flex overflow-scroll snap-mandatory">
        <div className="sticky left-0 w-1/5 min-w-fit bg-indigo-100 shrink-0">
          <h1>Times</h1>
          <SidBar range={{ start: { h: 7, m: 11 }, end: { h: 17, m: 22 } }} />
        </div>
        {/* {
                    createMainTimes({ h: 7, m: 11 }, { h: 17, m: 22 }, dummyData)?.map(date =>
                        <div style={{ height: date.buffer.bufferInMinutes }} className="shrink-0 bg-red-200">
                            <span>{date.start.h}:{date.start.m} - {date.end.h}:{date.end.m}</span>
                        </div>
                    )
                } */}
        {/* {dummyEvents.map((event, index) =>
                    <>
                        <div className="snap-center shrink-0 w-full bg-[#fef6e0] flex place-items-end flex-col">


                            <div className="w-4/5 flex">
                                <h2 className="place-self-center bg-indigo-100 w-full">{event.title}</h2>
                            </div>
                            {
                                createMainTimes({ h: 7, m: 11 }, { h: 17, m: 22 }, event.times)?.map(date =>
                                    <div style={{ height: date.buffer.bufferInMinutes * bufferPxSize }} className={`${date.buffer.isFull ? " bg-[#ff8228]" : "border-solid border-white"} ` + " w-4/5 " + ` ${!date.buffer.isFirst && !date.buffer.isSecond ? "border-t-2" : ""} ` + ` ${!date.buffer.isFirst && !date.buffer.isEnd ? "border-b-2" : ""} `}>
                                        {date.buffer.isFull ? <span>{date.buffer.title}</span> : null}
                                    </div>
                                )
                            }


                        </div>
                    </>
                )} */}

        <>
          <div className="snap-center shrink-0 w-full bg-[#fef6e0] flex place-items-end flex-col">
            <div className="w-4/5 flex">
              <h2 className="place-self-center bg-indigo-100 w-full">Title</h2>
            </div>
            {/* dayContainer */}
            <div className="w-4/5 h-fit relative bg-lime-100">
              <Room
                events={dummyEvents}
                range={{ start: { h: 7, m: 11 }, end: { h: 17, m: 22 } }}
              />
            </div>
            {/* {
                            createMainTimes({ h: 7, m: 11 }, { h: 17, m: 22 }, event.times)?.map(date =>
                                <div style={{ height: date.buffer.bufferInMinutes * bufferPxSize }} className={`${date.buffer.isFull ? " bg-[#ff8228]" : "border-solid border-white"} ` + " w-4/5 " + ` ${!date.buffer.isFirst && !date.buffer.isSecond ? "border-t-2" : ""} ` + ` ${!date.buffer.isFirst && !date.buffer.isEnd ? "border-b-2" : ""} `}>
                                    {date.buffer.isFull ? <span>{date.buffer.title}</span> : null}
                                </div>
                            )
                        } */}
          </div>
        </>
      </div>
    </main>
    </MetaDataProvider>
    </ThemeProvider>
  );
};

const dummyData: Time[] = [
  {
    start: {
      h: 10,
      m: 12,
    },
    end: {
      h: 10,
      m: 55,
    },
  },
  {
    start: {
      h: 11,
      m: 5,
    },
    end: {
      h: 11,
      m: 30,
    },
  },
  {
    start: {
      h: 11,
      m: 45,
    },
    end: {
      h: 12,
      m: 0,
    },
  },
  {
    start: {
      h: 13,
      m: 0,
    },
    end: {
      h: 13,
      m: 30,
    },
  },
  {
    start: {
      h: 13,
      m: 0,
    },
    end: {
      h: 13,
      m: 30,
    },
  },
  {
    start: {
      h: 13,
      m: 0,
    },
    end: {
      h: 13,
      m: 30,
    },
  },
];


