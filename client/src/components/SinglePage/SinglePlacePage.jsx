import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ShowAllPhotos from "./ShowAllPhotos";
import BookingWidget from "./BookingWidget";
import ImageSection from "./ImageSection";
import InfoWidget from "./InfoWidget";
import Perks from "../Perks";

function SinglePlacePage() {
  const { id } = useParams();
  const [place, setPlace] = useState({});
  const [showAllPhotos, setShowAllPhotos] = useState(false);

  useEffect(() => {
    axios.get("/place/" + id).then(({ data }) => {
      setPlace(data);
    });
  }, [id]);

  if (showAllPhotos) {
    return <ShowAllPhotos place={place} setShowAllPhotos={setShowAllPhotos} />;
  }


  return (
    <div className="mt-8  py-6 mx-14">
      <h1 className="text-3xl">{place.title}</h1>
      <a
        className="inline-flex items-center  block text-sm font-semibold underline leading-8 "
        href={"https://maps.google.com/?q=" + place.address}
        target="_blank"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
          />
        </svg>
        {place.address}
      </a>
      <ImageSection setShowAllPhotos={setShowAllPhotos} place={place} />

      <div className=" mt-10 grid gap-10 grid-cols-1 md:grid-cols-[2fr_1fr]">
        <InfoWidget place={place} />
        <BookingWidget place={place} />
      </div>
      <div className="my-6">
        <h2 className="font-semibold text-2xl">Perks Included</h2>
        <Perks selected={place.perks}/>
      </div>
      <div className="my-6">
        <h2 className="font-semibold text-2xl">Extra Information</h2>
        {place.extraInfo}
      </div>
    </div>
  );
}

export default SinglePlacePage;
