import React, { useContext, useEffect, useState } from "react";
import SearchInputs from "../components/HomePage/SearchInputs";
import PlaceCard from "../components/HomePage/PlaceCard";
import axios from "axios";
import short from "short-uuid";
import { UserContext } from "../userContext";

function Homepage() {
  const [places, setPlaces] = useState([]);
  const [searchText, setSearchText] = useState("");
  const { active } = useContext(UserContext);

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

  return (
    <React.Fragment>
      {active && <SearchInputs setSearchText={setSearchText} />}
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
