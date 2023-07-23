import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import TitleAdd from "../components/SinglePage/TitleAdd";
import ImageSection from "../components/SinglePage/ImageSection";
import ShowAllPhotos from "../components/SinglePage/ShowAllPhotos";
import BookingDates from "../components/BookingPage/BookingDates";
import PriceAndNights from "../components/BookingPage/PriceAndNights";

function SingleBookingPage() {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);
  const [showAllPhotos, setShowAllPhotos] = useState(false);

  useEffect(() => {
    if (id) {
      axios.get("/bookings").then(({ data }) => {
        setBooking(data.find(({ _id }) => _id === id));
      });
    }
  }, [id]);

  if (booking) {
    console.log(booking);
  }
  if (showAllPhotos) {
    return (
      <ShowAllPhotos
        place={booking.place}
        setShowAllPhotos={setShowAllPhotos}
      />
    );
  }
  {
    return booking ? (
      <div className="mt-8 py-6 mx-14">
        <TitleAdd place={booking.place} />
        <div className="flex justify-between bg-gray-200 p-4 mt-2 mb-4 rounded-2xl">
          <div>
            <h2 className="text-lg font-semibold">Your booking details</h2>
            <BookingDates booking={booking} />
            <PriceAndNights booking={booking} />
          </div>
          <div className="bg-primary p-4 my-auto text-xl text-white rounded-2xl">Booked!😊</div>
        </div>
        <ImageSection
          place={booking.place}
          setShowAllPhotos={setShowAllPhotos}
        />
      </div>
    ) : (
      <div className="text-center text-lg">Getting the data...</div>
    );
  }
}

export default SingleBookingPage;
// : <div className="text-center text-lg">No booking found!</div>})}
