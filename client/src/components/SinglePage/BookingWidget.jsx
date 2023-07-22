import React from "react";

function BookingWidget({place}) {
  return (
    <div>
      <div className="shadow bg-white p-4 border rounded-2xl ">
        <div className="text-2xl mb-3 text-center">
          Price: ${place.price} / per night
        </div>
        <div className="mt-4 flex gap-4 justify-between">
          <div className="w-full">
            <label className="font-semibold">Check In: </label>
            <input type="date" />
          </div>
          <div className="w-full">
            <label className="font-semibold">Check Out: </label>
            <input type="date" />
          </div>
        </div>
        <div>
          <label className="font-semibold">Max Guests: </label>
          <input type="number" />
        </div>
        <button className="primary mt-4 font-semibold">Book Now</button>
      </div>
    </div>
  );
}
export default BookingWidget;
