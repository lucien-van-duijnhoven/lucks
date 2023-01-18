import React, { createContext, FC, ReactDOM, useContext, useEffect, useState } from "react";
import { dummyEvents, dummyRooms } from "./data";
import { Block, Event, HourMinute, Rooms, Time, TimeBlock } from "./type";
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
      h: 20,
      m: 0,
    },
  };



  // const blocks = numberRangeIntoBlocks(hourMinuteToMinutes(dayRange.start), hourMinuteToMinutes(dayRange.end), 60);

  function handleTimesTest() {}

  function handleOverlayBlockClick(event: Event) {}

  const {data, loading} = useFetch("data.php");

  const {sizeMultiplier, setSizeMultiplier} = useMetaDataContext()

  const [eventModalData, setEventModalData] = useState<null|Event>(null)

  if (loading) {
    return <div>Loading...</div>
  }

  if (data === null) {
    return <div>Unable to load data</div>
  }

  

  return (
    <ThemeProvider>
    <MetaDataProvider>
    {/* <button onClick={getData}>Test data</button> */}
      {eventModalData && (
        <EventModal
        onClose={()=>setEventModalData(null)}
        data={eventModalData}/>
      )}
      <div className="snap-x text-[#fff6e0] flex overflow-x-scroll overflow-y-hidden snap-mandatory h-fit ">
        <div className="sticky z-20 left-0 w-1/5 min-w-fit bg-[#6abca5] shrink-0">
          <h1>Times</h1>
          <SidBar range={dayRange} />
        </div>
        {data.map(room =>
          <div key={room.title} className="snap-center shrink-0 w-full bg-[#fef6e0] flex place-items-end flex-col">
            <div className="w-4/5 flex">
              <h2 className="place-self-center bg-[#6abca5] w-full">{room.title}</h2>
            </div>
            {/* dayContainer */}
            <div className="w-4/5 h-fit relative bg-[#6abca5]">
              <Room
                events={room.events}
                range={dayRange}
                onOverlayBlockClick={setEventModalData}
              />
            </div>
          </div>
        )}
      </div>
    </MetaDataProvider>
    </ThemeProvider>
  );
};


function useFetch(url: string) {
  const [data, setData] = useState<null|Rooms>(null);
  const [loading, setLoading] = useState(true);

  async function fetchData() {
    // const response = await fetch(url);
    // const json = await response.json();
    // let parsedJson: Rooms = []
    // for (let key in json) {
    //   parsedJson.push(json[key]);
    // }
    // const data: Rooms = parsedJson.map((room: { events: any[]; })=>{ return {...room,events:room.events.map((event: { time: any; })=>{
    //   const time = event.time;
    //   return {
    //     ...event,
    //     time: {
    //       start: {
    //         h: parseInt(time.start.h),
    //         m: parseInt(time.start.m),
    //       },
    //       end: {
    //         h: parseInt(time.end.h),
    //         m: parseInt(time.end.m),
    //       }
    //     }
    //   }
    // })}});

    const data = dummyRooms;

    console.log(data);
    setData(data);
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, [url]);

  return { data, loading };
}
