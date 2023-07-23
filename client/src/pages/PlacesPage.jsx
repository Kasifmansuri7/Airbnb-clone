import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AccountNav from "../components/AccountNav";
import AddNewPlace from "../components/PlacesPage/AddNewPlace";

function PlacesPage() {
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    axios.get("/user-places").then(({ data }) => setPlaces(data));
  }, []);

  async function removeItem(e, id) {
    e.preventDefault();
    const askDelete = confirm("Do you want to delete?");
    if (askDelete) {
      await axios.delete("/place/" + id);
      setPlaces([...places.filter((place) => place._id !== id)]);
    }
  }
  return (
    <React.Fragment>
      <AccountNav />
      <AddNewPlace />

      <div className="my-8">
        {places.length > 0 &&
          places.map((place) => (
            <Link
              to={`/account/places/${place._id}`}
              key={place._id}
              className=" flex gap-4 border rounded-2xl p-4 cursor-pointer hover:bg-gray-100 my-4 hover:rounded-2xl relative"
            >
              <div className="h-40  grow shrink-0">
                {place.photos.length > 0 && (
                  <img
                    src={"http://localhost:3000/uploads/" + place.photos[0]}
                    className="rounded-2xl h-full w-50 object-cover grow"
                  />
                )}
              </div>
              <div className="grow-0 shrink">
                <h2 className="text-xl">{place.title}</h2>
                <p className="text-sm mt-2">{place.desc}</p>
              </div>
              <button
                className="bg-transparent absolute bottom-1 right-1 p-2  rounded-2xl bg-black opacity-75 text-black hover:text-white hover:rounded-full hover:bg-black  hover:opacity-75"
                onClick={(e) => removeItem(e, place._id)}
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
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                  />
                </svg>
              </button>
            </Link>
          ))}
      </div>
    </React.Fragment>
  );
}

export default PlacesPage;
