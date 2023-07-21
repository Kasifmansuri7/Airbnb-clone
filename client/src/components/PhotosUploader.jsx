import React, { useState } from "react";
import axios from "axios";

function PhotosUploader({addedPhotos, setAddedPhotos}) {
  const [photoLink, setPhotoLink] = useState("");

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
  return (
    //UPLOAD BY LINK
    <React.Fragment>
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

      {/* UPLOAD LOCALLY */}
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
    </React.Fragment>
  );
}

export default PhotosUploader;
