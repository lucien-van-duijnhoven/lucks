import React, { FC } from "react";

function numberRangeIntoBlocks(start: number, end: number, blockSize: number) {
    const range = end - start;
    if (range < 0) {
        throw new Error("Negative range. Please make sure the start is before the end.");
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
interface HourMinute {
    h: number;
    m: number;
}

interface Time {
    start: HourMinute;
    end: HourMinute;
}

interface Day {
    title: string,
    events: Time[],
}

interface Event {
    times: Time,
    data?: any,
}

interface EventWithBuffers {
    times: Time,
}
interface ActiveBlock {
    time: Time,
    offset: number
}

function hourMinuteToMinutes(timeRange: HourMinute) {
    return timeRange.h * 60 + timeRange.m;
}

function minutesToHoursMinutes(minutes: number): HourMinute {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return { h, m };
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

    function createEventOverlay(dayRange: Time, events: Event[]): ActiveBlock[] {
        const activeBlocks = events.map(event => {
            const offset = getDifferenceInTime(dayRange.start, event.times.start);
            return {
                time: event.times,
                offset
            };
        });
        return activeBlocks;
    }

    function getDifferenceInTime(start: HourMinute, end: HourMinute) {
        const startInMinutes = hourMinuteToMinutes(start);
        const endInMinutes = hourMinuteToMinutes(end);
        return endInMinutes - startInMinutes;
    }

    function getEventHeight(event: Time) {
        const eventDuration = hourMinuteToMinutes(event.end) - hourMinuteToMinutes(event.start);
        return eventDuration * pxPerMinute;
    }

    function handleTimesTest() { }

    interface TimeBlock {
        block: number,
        time: Time,
    }

    function createSideBarTimes(dayStart: HourMinute, dayEnd: HourMinute) {
        debugger;
        const blocks: TimeBlock[] = numberRangeIntoBlocks(hourMinuteToMinutes(dayStart), hourMinuteToMinutes(dayEnd), 60)
            .reduce((acc, block) => {
                acc.push(acc[acc.length - 1] + block);
                return acc;
            }, [hourMinuteToMinutes(dayStart)] as number[])
            .reduce((acc, timeInMinutes) => {
                acc.push(minutesToHoursMinutes(timeInMinutes));
                return acc;
            }, [] as HourMinute[])
            .reduce((acc, time, index, all) => {
                if (index > 1) {
                    acc.push({
                        start: acc[acc.length - 1].end,
                        end: time,
                    });
                } else if (index === 1) {
                    acc.push({
                        start: all[0],
                        end: time,
                    });
                }
                return acc;
            }, [] as Time[]).map((time, index) => {
                return {
                    time: time,
                    block: hourMinuteToMinutes(time.end) - hourMinuteToMinutes(time.start)
                }
            });
        return blocks;
    }
    function stringDubbleZero(input: number) {
        return input === 0 ? "00" : `${input}`;
    }
    debugger;

    function createDayTimes(dayRange: Time) {
        return numberRangeIntoBlocks(hourMinuteToMinutes(dayRange.start), hourMinuteToMinutes(dayRange.end), 60);
    }

    return (
        <main className="bg-slate-900 w-full text-[#18417f]">
            <button onClick={handleTimesTest}>run times</button>
            <div className="snap-x flex overflow-scroll snap-mandatory">
                <div className="sticky left-0 w-1/5 min-w-fit bg-indigo-100 shrink-0">
                    <h1>Times</h1>
                    {
                        createSideBarTimes({ h: 7, m: 11 }, { h: 17, m: 22 })?.map(timeBlock =>
                            <div style={{ height: timeBlock.block * pxPerMinute }} className="shrink-0 bg-[#ff7328] border-2 border-solid border-white">
                                <span>{timeBlock.time.start.h}:{stringDubbleZero(timeBlock.time.end.m)} - {timeBlock.time.end.h}:{stringDubbleZero(timeBlock.time.end.m)}</span>
                            </div>
                        )
                    }
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
                        <div className="relative" style={{position: "relative"}}>
                            <div className="z-0 absolute" style={{position:"absolute"}}>

                                {createDayTimes({ start: { h: 7, m: 11 }, end: { h: 17, m: 22 } }).map(height =>
                                <div style={{ height: height * pxPerMinute }} className="w-4/5 ">
                                    hello
                                </div>
                                )}

                            </div>
                            <div className="absolute w-5 h-5 bg-slate-500 top-0" style={{position: "absolute"}}>This should overlay
                                {/* {createEventOverlay({ start: { h: 7, m: 11 }, end: { h: 17, m: 22 } }, dummyData).map(event => */}
                            </div>
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
    )
}





// const dummyEvents: Event[] = [
//     {
//         title: "event 1",
//         times: [
//             {
//                 start: {
//                     h: 10,
//                     m: 12,
//                 },
//                 end: {
//                     h: 10,
//                     m: 55,
//                 },
//                 title: "event 1"
//             },
//             {
//                 start: {
//                     h: 11,
//                     m: 5,
//                 },
//                 end: {
//                     h: 11,
//                     m: 30,
//                 },
//                 title: "event 2"
//             },
//             {
//                 start: {
//                     h: 11,
//                     m: 45,
//                 },
//                 end: {
//                     h: 12,
//                     m: 0,
//                 },
//                 title: "event 3"
//             },
//         ]
//     },
//     {
//         title: "event 2",
//         times: [
//             {
//                 start: {
//                     h: 10,
//                     m: 12,
//                 },
//                 end: {
//                     h: 10,
//                     m: 55,
//                 },
//                 title: "event 1"
//             },
//             {
//                 start: {
//                     h: 11,
//                     m: 5,
//                 },
//                 end: {
//                     h: 11,
//                     m: 30,
//                 },
//                 title: "event 2"
//             },
//             {
//                 start: {
//                     h: 11,
//                     m: 45,
//                 },
//                 end: {
//                     h: 12,
//                     m: 0,
//                 },
//                 title: "event 3"
//             },
//         ]
//     },
//     {
//         title: "event 3",
//         times: [
//             {
//                 start: {
//                     h: 10,
//                     m: 12,
//                 },
//                 end: {
//                     h: 10,
//                     m: 55,
//                 },
//                 title: "event 1"
//             },
//             {
//                 start: {
//                     h: 11,
//                     m: 5,
//                 },
//                 end: {
//                     h: 11,
//                     m: 30,
//                 },
//                 title: "event 2"
//             },
//             {
//                 start: {
//                     h: 11,
//                     m: 45,
//                 },
//                 end: {
//                     h: 12,
//                     m: 0,
//                 },
//                 title: "event 3"
//             },
//         ]
//     }
// ]

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

