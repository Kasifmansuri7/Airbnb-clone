import React, { useContext } from "react";
import { UserContext } from "../userContext";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function Account() {
  let { ready, user } = useContext(UserContext);
  let { subpage } = useParams();
  const navigate = useNavigate();

  if (subpage === undefined) {
    subpage = "profile";
  }

  async function logout() {
    await axios.post("/logout");
    navigate("/")

  }

  if (!ready) {
    return "Loading...";
  }
  //redirect if no user found
  //   !user && navigate("/login");
  if (ready && !user) {
    navigate("/login");
  }

  function linkClasses(type = null) {
    let classes = "py-2 px-6";
    if (type === subpage) {
      classes += " bg-primary text-white rounded-full";
    }
    return classes;
  }

  return (
    <div>
      <nav className="w-full flex justify-center my-8 gap-2 ">
        <Link className={linkClasses("profile")} to="/account">
          My profile
        </Link>
        <Link className={linkClasses("bookings")} to="/account/bookings">
          My bookings
        </Link>
        <Link className={linkClasses("places")} to="/account/places">
          My accommodation
        </Link>
      </nav>

      {subpage === "profile" && (
        <div className="text-center max-w-lg mx-auto ">
          Logged in as {user.name} ({user.email})<br />
          <button onClick={logout} className="primary max-w-sm mt-2">Logout</button>
        </div>
      )}
    </div>
  );
}

export default Account;
