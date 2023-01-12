import { Block, Time, HourMinute } from "./type";
import {
  hourMinuteToMinutes,
  numberRangeIntoBlocks,
  minutesToHoursMinutes,
  stringDubbleZero,
} from "./helper";
import { useMetaDataContext } from "./MetaDataProvider";

function SidBar({ range }: { range: Time }) {
  const {sizeMultiplier} = useMetaDataContext()
  return (
    <>
      {createSideBarTimes(range)?.map((timeBlock) => (
        <div
          style={{ height: timeBlock.size * sizeMultiplier }}
          className="shrink-0 bg-[#ff7328] border-2 z-20 border-solid border-white"
        >
          <span>
            {timeBlock.data.start.h}:{stringDubbleZero(timeBlock.data.end.m)} -{" "}
            {timeBlock.data.end.h}:{stringDubbleZero(timeBlock.data.end.m)}
          </span>
        </div>
      ))}
    </>
  );
}

export default SidBar;

function createSideBarTimes(range: Time): Block<Time>[] {
  const blocks: Block<Time>[] = numberRangeIntoBlocks(
    hourMinuteToMinutes(range.start),
    hourMinuteToMinutes(range.end),
    60
  )
    .reduce(
      (acc, block) => {
        acc.push(acc[acc.length - 1] + block);
        return acc;
      },
      [hourMinuteToMinutes(range.start)] as number[]
    )
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
    }, [] as Time[])
    .map((time) => {
      return {
        data: time,
        size: hourMinuteToMinutes(time.end) - hourMinuteToMinutes(time.start),
      };
    });
  return blocks;
}
