import React from "react";
import short from "short-uuid";

function ShowAllPhotos({ setShowAllPhotos, place }) {
  return (
    <div className="absolute inset-0 bg-black min-w-full min-h-screen ">
      <div className="px-56  flex flex-col gap-4 bg-black">
        <div>
          <button
            onClick={() => setShowAllPhotos(false)}
            className="fixed m-4 top-4 inline-flex gap-1 bg-black opacity-75 text-white hover:text-white hover:bg-black  hover:opacity-100 p-2 rounded-lg shadow shadow-lg"
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            Close photos
          </button>
        </div>
        {place?.photos?.length > 0 &&
          place.photos.map((photo) => {
            return (
              <img
                key={short.generate()}
                className="h-4/5"
                src={"http://localhost:3000/uploads/" + photo}
              />
            );
          })}
      </div>
    </div>
  );
}

export default ShowAllPhotos;
