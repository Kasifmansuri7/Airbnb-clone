import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Homepage() {
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    axios.get("/places").then(({ data }) => {
      setPlaces([...data, ...data, ...data, ...data, ...data]);
    });
  }, []);

  return (
    <div className=" px-6 mt-10 grid  gap-x-6 gap-y-8 md:grid-cols-4 sm:grid-cols-1">
      {places.length > 0 &&
        places.map((place) => {
          return (
            <Link to={"/place/"+place._id}>
              <div className="flex ">
                <img
                  className="rounded-2xl object-cover aspect-square"
                  src={"http://localhost:3000/uploads/" + place.photos[0]}
                />
              </div>
              <div className="py-2 ">
                <h2 className="text-md font-semibold leading-6">
                  {place.address}
                </h2>
                <h2 className="text-sm truncate text-gray-500 leading-6">
                  {place.title}
                </h2>
                <div className="mt-1 text-sm  leading-6">
                  <span className="font-bold">${place.price}</span> per night
                </div>
              </div>
            </Link>
          );
        })}
    </div>
  );
}

export default Homepage;
