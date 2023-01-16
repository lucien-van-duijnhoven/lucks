import { Block, Time, HourMinute } from "./type";
import {
  hourMinuteToMinutes,
  numberRangeIntoBlocks,
  minutesToHoursMinutes,
  stringDubbleZero,
  printTime,
} from "./helper";
import { useMetaDataContext } from "./MetaDataProvider";

function SidBar({ range }: { range: Time }) {
  const {sizeMultiplier} = useMetaDataContext()
  return (
    <div>
      {createSideBarTimes(range)?.map((timeBlock, index) => (
        <div
          style={{ height: timeBlock.size * sizeMultiplier }}
          className={"shrink-0 border-2 border-solid border-[#fff6e0] text-[#fff6e0]" + " " + (index % 2 == 0 ? "bg-[#04261e]" : "bg-[#084c3c]")}
        >
          <span className="flex">
            {printTime(timeBlock.data)}
          </span>
        </div>
      ))}
    </div>
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
