import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import AccountNav from "../components/AccountNav";
import { UserContext } from "../userContext";
import { Link, useNavigate } from "react-router-dom";
import BookingDates from "../components/BookingPage/BookingDates";
import PriceAndNights from "../components/BookingPage/PriceAndNights";

function BookingsPage() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axios.get("/bookings").then(({ data }) => {
      setBookings(data);
    });
  }, []);

  if (!user) {
    navigate("/login");
  }


  return (
    <div>
      <AccountNav />
      {bookings.length > 0 &&
        bookings.map((booking) => {
          return (
            <Link
              to={`/account/bookings/${booking._id}`}
              key={booking._id}
              className="p-3 flex gap-4 bg-gray-100 rounded-2xl overflow-hidden"
            >
              <div className="w-48">
                {booking.place.photos?.length > 0 && (
                  <img
                    className="rounded-xl"
                    src={
                      booking?.place?.photos[0]
                    }
                  />
                )}
              </div>
              <div className="py-1 grow">
                <h2 className="text-xl pb-2 font-medium border-b border-gray-300 my-2">
                  {booking.place?.title}
                </h2>
                <BookingDates booking={booking} />
                <PriceAndNights booking={booking} />
              </div>
            </Link>
          );
        })}
    </div>
  );
}

export default BookingsPage;
