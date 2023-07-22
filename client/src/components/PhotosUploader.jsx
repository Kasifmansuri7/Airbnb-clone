import React, { useState } from "react";
import axios from "axios";

function PhotosUploader({ addedPhotos, setAddedPhotos }) {
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
  function removePhoto(e,name) {
    e.preventDefault();
    setAddedPhotos(addedPhotos.filter((photo) => photo !== name));
  }

  function selectAsMainPhoto(e,name) {
    e.preventDefault();
    setAddedPhotos([name, ...addedPhotos.filter((photo) => photo !== name)]);
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
            {addedPhotos.map((item) => (
              <div className="relative"  key={item}>
                <img
                 
                  src={"http://localhost:3000/uploads/" + item}
                  className="rounded-2xl h-40 min-w-full object-cover "
                  alt="image"
                />
                <button
                  onClick={(e) => {
                    return selectAsMainPhoto(e, item);
                  }}
                  className="absolute bottom-1 left-1 p-2 rounded-2xl bg-black opacity-75 text-white hover:text-white hover:rounded-full hover:bg-black  hover:opacity-75"
                >
                  {addedPhotos[0] === item && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                  {addedPhotos[0] !== item && (
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
                        d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                      />
                    </svg>
                  )}
                </button>
                <button
                  onClick={(e) => {
                    return removePhoto(e, item);
                  }}
                  className="absolute bottom-1 right-1 p-2 rounded-2xl bg-black opacity-75 text-white hover:text-white hover:rounded-full hover:bg-black  hover:opacity-75"
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
                      d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </button>
              </div>
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
