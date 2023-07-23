import React from "react";

function TitleAdd({ place }) {
  return (
    <React.Fragment>

      <h1 className="text-3xl">{place.title}</h1>
      <a
        className="inline-flex items-center  block text-sm font-semibold underline leading-8 "
        href={"https://maps.google.com/?q=" + place.address}
        target="_blank"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
          />
        </svg>
        {place.address}
      </a>
    </React.Fragment>
  );
}


export default TitleAdd;