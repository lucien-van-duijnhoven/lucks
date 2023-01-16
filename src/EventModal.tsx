import * as React from "react";
import { Event } from "./type";
import { createPortal } from "react-dom";
import { printTime } from "./helper";


function EventModal({data, onClose}: {data: Event, onClose: ()=>void}) {

  return (
  <>
    <h1>I am the modal</h1>
    <div className="fixed z-30 top-0 left-0 h-screen w-screen backdrop-blur-sm bg-transparent flex place-content-center">
      <div className="bg-white rounded-lg p-20 h-fit w-fit">
      <h1>{data.title}</h1>
      <p>{data.description}</p><br />
      <em>{data.speaker}</em><br />
      <em>{printTime(data.time)}</em> <br />
      <button className="border-1 p-2 border-black border-solid bg-slate-50 pr-4 pl-4" onClick={onClose}>Close</button>
      </div>
    </div>
  </>);
}

export default EventModal
