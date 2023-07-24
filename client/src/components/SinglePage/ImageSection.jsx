import React from "react";

function ImageSection({ place, setShowAllPhotos }) {
  return (
    <div className="relative mt-4">
      <div className="rounded-2xl overflow-hidden grid gap-2 grid-cols-[2fr_1fr]">
        <div>
          <img className="cursor-pointer"
            onClick={() => setShowAllPhotos(true)}
            src={place.photos?.[0]}
          />
        </div>
        {place.photos?.length > 1 && (
          <div >
            <img className="cursor-pointer"
              onClick={() => setShowAllPhotos(true)}
              src={place.photos?.[1]}
            />

            <img
              onClick={() => setShowAllPhotos(true)}
              className="relative top-2 cursor-pointer"
              src={place.photos?.[2]}
            />
          </div>
        )}
      </div>

      <button
        onClick={() => setShowAllPhotos(true)}
        className="absolute bottom-6 right-2 py-1 px-2 text-black bg-white opacity-75 rounded-xl hover:text-white  hover:bg-black  hover:opacity-100 inline-flex "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6 mr-1"
        >
          <path
            fillRule="evenodd"
            d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
            clipRule="evenodd"
          />
        </svg>
        Show all photos
      </button>
    </div>
  );
}

export default ImageSection;
