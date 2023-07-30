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
  const [sort, setSort] = useState("new");
  const [filter, setFilter] = useState(500);

  useEffect(() => {
    const getResult = setTimeout(() => {
      axios.get("/places").then(({ data }) => {
        const foundPlaces = [...data].filter(
          (place) =>
            place.title.toLowerCase().includes(searchText) ||
            place.address.toLowerCase().includes(searchText)
        );
        setPlaces([...foundPlaces].reverse());
      });
    }, 500);
    return () => clearTimeout(getResult);
  }, [searchText]);

  useEffect(() => {
    if (sort === "asc") {
      setPlaces((prev) => [...prev].sort((a, b) => b.price - a.price));
    } else if (sort === "desc") {
      setPlaces((prev) => [...prev].sort((a, b) => a.price - b.price));
    } else if (sort === "new") {
      setPlaces((prev) =>
        [...prev].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      );
    } else if (sort === "old") {
      setPlaces((prev) =>
        [...prev].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
      );
    }
  }, [sort]);

  useEffect(() => {
    const getResult = setTimeout(() => {
      axios.get("/places").then(({ data }) => {
        const foundPlaces = [...data].filter((place) => place.price <= filter);
        setPlaces([...foundPlaces].reverse());
      });
    }, 200);
    return () => clearTimeout(getResult);
  }, [filter]);

  function handleChange(e) {
    setSort(e.target.value);
  }

  return (
    <React.Fragment>
      {active && <SearchInputs setSearchText={setSearchText} />}
      <div className="flex justify-between items-center mx-10 my-5">
        <div className="inline-flex gap-2 items-center border py-3 px-6 rounded-2xl cursor-pointer">
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
          {/* <span className="text-lg">Sort</span> */}
          <select onChange={handleChange}>
            <option value="new">Newest</option>
            <option value="old">Oldest</option>
            <option value="asc">Price(asc)</option>
            <option value="desc">Price(desc)</option>
          </select>
        </div>
        <div className="inline-flex gap-2 items-center border py-3 px-6 rounded-2xl cursor-pointer">
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
          <span className="text-lg">Filter</span>

          <span>$50</span>
          <input
            type="range"
            min={50}
            max={500}
            onChange={(e) => setFilter(e.target.value)}
          />
          <span>${filter ? filter : 0}</span>
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
