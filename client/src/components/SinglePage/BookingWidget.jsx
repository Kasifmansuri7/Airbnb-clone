import React, { useState } from "react";
import differenceInCalendarDays from "date-fns/differenceInCalendarDays";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function BookingWidget({ place }) {
  const navigate = useNavigate();
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  let numberOfNights = 0;
  if (checkIn && checkOut) {
    if (checkIn)
      numberOfNights = differenceInCalendarDays(
        new Date(checkOut),
        new Date(checkIn)
      );
  }

  async function bookPlace() {
    const bookingInfo = {
      place: place._id,
      name,
      email,
      phone,
      checkIn,
      checkOut,
      guests,
      amount: place.price * numberOfNights,
    };
    const { data } = await axios.post("/booking", bookingInfo);
    navigate(`/account/bookings/${data._id}`);
    alert("Congratulation! Booking has been successful.");
  }

  return (
    <div>
      <div className="shadow bg-white p-4 border rounded-2xl ">
        <div className="text-2xl mb-3 text-center">
          Price: ${place.price} / per night
        </div>
        <div className="mt-4 flex gap-4 justify-between">
          <div className="w-full">
            <label className="font-semibold">Check In: </label>
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
            />
          </div>
          <div className="w-full">
            <label className="font-semibold">Check Out: </label>
            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
            />
          </div>
        </div>
        <div>
          <label className="font-semibold">Max Guests: </label>
          <input
            type="number"
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
          />
        </div>
        {numberOfNights > 0 && (
          <React.Fragment>
            <div>
              <label className="font-semibold">Your Full Name: </label>
              <input
                type="text"
                value={name}
                placeholder="John Doe"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label className="font-semibold">Your Email: </label>
              <input
                type="email"
                placeholder="your@Email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="font-semibold">Your Phone Number: </label>
              <input
                type="text"
                placeholder="+91 99999 85555"
                minLength={10}
                maxLength={13}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </React.Fragment>
        )}
        <button onClick={bookPlace} className="primary mt-4 font-semibold">
          Book Now{" "}
          {numberOfNights > 0 && (
            <span> For ${numberOfNights * place.price}</span>
          )}
        </button>
      </div>
    </div>
  );
}
export default BookingWidget;
