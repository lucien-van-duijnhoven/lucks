import * as React from "react";
import { Event } from "./type";
import { createPortal } from "react-dom";

function EventModal({data}: {data: Event}) {

  return createPortal(
  <>
    <div className="w-full h-full backdrop-blur-sm bg-gray-100 bg-transparent flex place-content-center">
      <h1>{data.title}</h1>
      <p>{data.description}</p>
      <em>{data.speaker}</em>
    </div>
  </>, document.body);
}

export default EventModal
