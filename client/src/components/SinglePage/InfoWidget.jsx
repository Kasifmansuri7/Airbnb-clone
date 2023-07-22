import React from "react";

function InfoWidget({ place }) {
  return (
    <div className="my-4">
      <div>
        <h2 className="font-semibold text-2xl">Description</h2>
        <p className="mt-2">{place.desc}</p>
      </div>
      <div className="my-10">
        <span className="font-semibold"> Check-In: </span>
        {place.checkIn} <br />
        <span className="font-semibold"> Check Out: </span>
        {place.checkOut} <br />
        <span className="font-semibold"> Max number of guests: </span>
        {place.maxGuests}
      </div>
    </div>
  );
}

export default InfoWidget;
