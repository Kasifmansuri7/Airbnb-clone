import React from "react";

function SearchInputs({ setSearchText }) {
  return (
    <div className="flex gap-2 items-center">
      <input
        type="text"
        placeholder="Search"
        onChange={(e) => setSearchText(e.target.value.toLowerCase())}
      />
      <button className="flex gap-1 items-center bg-primary text-white rounded-2xl py-1 px-4 h-12">
        Search
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-5 h-5"
        >
          <path
            fillRule="evenodd"
            d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  );
}


export default SearchInputs;