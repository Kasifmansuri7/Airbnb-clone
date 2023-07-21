import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Perks from "./Perks";
import axios from "axios";

function PlacesPage() {
  const { action } = useParams();
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [photoLink, setPhotoLink] = useState("");
  const [desc, setDesc] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);

  function preInput(header, desc) {
    return (
      <React.Fragment>
        <h2 className="text-2xl mt-4">{header}</h2>
        <p className="text-gray-500 text-s m">{desc}</p>
      </React.Fragment>
    );
  }
  //

  async function addPhotoByLink(event) {
    event.preventDefault();
    const { data: filename } = await axios.post("/upload-by-link", {
      link: photoLink,
    });
    setAddedPhotos((prev) => {
      return [...prev, filename];
    });
    setPhotoLink("");
  }

  async function uploadPhoto(e) {
    const files = e.target.files;
    const data = new FormData();

    for (let i = 0; i < files.length; i++) {
      data.append("photos", files[i]);
    }

    await axios
      .post("/upload", data, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => {
        const { data: filenames } = response;
        setAddedPhotos((prev) => {
          return [...prev, ...filenames];
        });
      });
  }
  function handlePerks(name) {
    if (perks.includes(name)) {
      setPerks((prev) => prev.filter((item) => item !== name));
    } else {
      setPerks((prev) => [...prev, name]);
    }
  }
  console.log(perks);
  return (
    <div>
      {action !== "new" && (
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
      )}
      {action === "new" && (
        <div>
          <form>
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
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Add using a link  .jpeg/png"
                value={photoLink}
                onChange={(e) => setPhotoLink(e.target.value)}
              />
              <button
                onClick={addPhotoByLink}
                className="bg-gray-200 grow px-4 rounded-2xl "
              >
                Add&nbsp;photos
              </button>
            </div>
            <div className=" mt-2 grid gap-2 grid-cols-3  lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-1">
              {addedPhotos.length > 0 && (
                <React.Fragment>
                  {addedPhotos.map((item, index) => (
                    <img
                      key={item}
                      src={"http://localhost:3000/uploads/" + item}
                      className="rounded-2xl max-h-40 min-w-full object-cover "
                      alt="image"
                    />
                  ))}
                </React.Fragment>
              )}
              <label className=" cursor-pointer flex items-center gap-1 justify-center border bg-transparent rounded-2xl py-10 px-6 text-2xl text-gray-600">
                <input
                  type="file"
                  className="hidden"
                  multiple
                  onChange={uploadPhoto}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-8 h-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15m0-3l-3-3m0 0l-3 3m3-3V15"
                  />
                </svg>
                Upload
              </label>
            </div>
            {preInput("Description", "Description of the place")}
            <textarea value={desc} onChange={(e) => setDesc(e.target.value)} />
            {preInput("Perks", "Select all the perks of your place.")}
            <Perks selected={perks} onChange={handlePerks} />
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
                  type="text"
                  placeholder="14:00"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                />
              </div>
              <div>
                <h3 className="mt-2 -mb-1">Check Out Time</h3>
                <input
                  type="text"
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
