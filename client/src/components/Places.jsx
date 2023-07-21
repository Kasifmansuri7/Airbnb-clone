import React, { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Perks from "./Perks";
import PhotosUploader from "./PhotosUploader";
import AddPlaceInput from "./AddPlaceInput";

function PlacesPage() {
  const { action } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [desc, setDesc] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);

  async function addNewPlace(event) {
    event.preventDefault();
    const newPlaceData = {
      title,
      address,
      desc,
      addedPhotos,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
    };

    const { data } = await axios.post("/places", newPlaceData);
    alert("New place added successfully!");
    navigate("/account/places");
  }
  function preInput(header, desc) {
    return (
      <React.Fragment>
        <h2 className="text-2xl mt-4">{header}</h2>
        <p className="text-gray-500 text-s m">{desc}</p>
      </React.Fragment>
    );
  }

  return (
    <div>
      {action !== "new" && <AddPlaceInput />}
      {action === "new" && (
        <div>
          <form onSubmit={addNewPlace}>
            {preInput(
              "Title",
              "Title for your place should be short and catchy."
            )}
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="title, example: My happy apt "
            />

            {preInput("Address", "Address to this place.")}
            <input
              type="text"
              placeholder="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            {preInput("Photos", "Photos should me clear and visible.")}
            <PhotosUploader
              addedPhotos={addedPhotos}
              setAddedPhotos={setAddedPhotos}
            />
            {preInput("Description", "Description of the place")}
            <textarea value={desc} onChange={(e) => setDesc(e.target.value)} />
            {preInput("Perks", "Select all the perks of your place.")}
            <Perks selected={perks} onChange={setPerks} />
            {preInput("Extra Info", "rules and regulation etc.,")}
            <textarea
              value={extraInfo}
              onChange={(e) => setExtraInfo(e.target.value)}
            />
            {preInput(
              "Check In&Out times",
              "Add check in check out time. (*24Hrs format)"
            )}
            <div className="grid gap-2 sm:grid-cols-5">
              <div>
                <h3 className="mt-2 -mb-1">Check In Time</h3>
                <input
                  type="time"
                  placeholder="14:00"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                />
              </div>
              <div>
                <h3 className="mt-2 -mb-1">Check Out Time</h3>
                <input
                  type="time"
                  placeholder="14:00"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                />
              </div>
              <div>
                <h3 className="mt-2 -mb-1">Max Guests</h3>
                <input
                  type="number"
                  value={maxGuests}
                  onChange={(e) => setMaxGuests(e.target.value)}
                />
              </div>
            </div>

            <div>
              <button type="submit" className="primary my-3">
                Save
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default PlacesPage;
