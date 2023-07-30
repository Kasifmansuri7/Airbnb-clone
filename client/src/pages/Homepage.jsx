import React, { useContext, useEffect, useState } from "react";
import SearchInputs from "../components/HomePage/SearchInputs";
import PlaceCard from "../components/HomePage/PlaceCard";
import axios from "axios";
import short from "short-uuid";
import { UserContext } from "../userContext";

function Homepage() {
  const [places, setPlaces] = useState([]);
  const [searchText, setSearchText] = useState("");
  const { user, active } = useContext(UserContext);

  useEffect(() => {
    const getResult = setTimeout(() => {
      axios.get("/places").then(({ data }) => {
        const foundPlaces = [...data].filter(
          (place) =>
            place.title.toLowerCase().includes(searchText) ||
            place.address.toLowerCase().includes(searchText)
        );
        setPlaces([...foundPlaces]);
      });
    }, 500);
    return () => clearTimeout(getResult);
  }, [searchText]);

  console.log(places);
  return (
    <React.Fragment>
      {active && <SearchInputs setSearchText={setSearchText} />}
      <div>
        <div>
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
              d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
            />
          </svg>
          <span>Sort</span>
        </div>
        <div>
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
              d="M6 13.5V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5m12-3V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5m-6-9V3.75m0 3.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 9.75V10.5"
            />
          </svg>
          <span>Filter</span>
        </div>
      </div>
      <div className=" px-6 mt-10 grid  gap-x-6 gap-y-8 md:grid-cols-4 sm:grid-cols-1">
        {places.length > 0 &&
          places.map((place) => {
            return <PlaceCard place={place} key={short.generate()} />;
          })}
      </div>
    </React.Fragment>
  );
}

export default Homepage;
