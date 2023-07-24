import React from "react";
import { Link } from "react-router-dom";


function PlaceCard({ place }) {
  return (
    <Link to={"/place/" + place._id} >
      <div className="flex ">
        <img
          className="rounded-2xl object-cover aspect-square"
          src={place.photos[0]}
        />
      </div>
      <div className="py-2 ">
        <h2 className="text-md font-semibold leading-6">{place.address}</h2>
        <h2 className="text-sm truncate text-gray-500 leading-6">
          {place.title}
        </h2>
        <div className="mt-1 text-sm  leading-6">
          <span className="font-bold">${place.price}</span> per night
        </div>
      </div>
    </Link>
  );
}

export default PlaceCard;
