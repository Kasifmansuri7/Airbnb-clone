import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AccountNav from "./AccountNav";

function PlacesPage() {
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    axios.get("/places").then(({ data }) => setPlaces(data));
  }, []);

  return (
    <React.Fragment>
      <AccountNav />
      <div className="text-center">
        <Link
          to={"/account/places/new"}
          className=" inline-flex gap-1 bg-primary text-white py-2 px-4 rounded-full"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          Add new place
        </Link>
      </div>

      <div className="my-8 hover:bg-gray-100   hover:rounded-2xl">
        {places.length > 0 &&
          places.map((place) => (
            <Link
              to={`/account/places/${place._id}`}
              key={place._id}
              className=" flex gap-4 border rounded-2xl p-4 cursor-pointer"
            >
              <div className="h-40 w-50  grow shrink-0">
                {place.photos.length > 0 && (
                  <img
                    src={"http://localhost:3000/uploads/" + place.photos[0]}
                    className="rounded-2xl max-h-40 w-50 object-cover grow"
                  />
                )}
           
              </div>
              <div className="grow-0 shrink">
                <h2 className="text-xl">{place.title}</h2>
                <p className="text-sm mt-2">{place.desc}</p>
              </div>
            </Link>
          ))}
      </div>
    </React.Fragment>
  );
}

export default PlacesPage;
