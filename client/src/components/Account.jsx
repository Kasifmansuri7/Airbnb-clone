import React, { useContext } from "react";
import { UserContext } from "../userContext";
import {  useNavigate,useParams  } from "react-router-dom";
import PlacesPage from "./Places";
import AccountNav from "./AccountNav";
import axios from "axios";

function Account() {
  let { ready, user, setUser } = useContext(UserContext);
  let { subpage } = useParams();
  const navigate = useNavigate();

  if (subpage === undefined) {
    subpage = "profile";
  }


  async function logout() {
    await axios.post("/logout");
    navigate("/");
    setUser(null);
  }

  if (!user) {
    return <div className="text-lg text-center">Loading...</div>;
  }
  //redirect if no user found
  //   !user && navigate("/login");
  if (ready && !user) {
    navigate("/login");
  }

  return (
    <div>
      <AccountNav />
      {subpage === "profile" && (
        <div className="text-center max-w-lg mx-auto ">
          Logged in as {user.name} ({user.email})<br />
          <button onClick={logout} className="primary max-w-sm mt-2">
            Logout
          </button>
        </div>
      )}

      {subpage === "places" && <PlacesPage />}
    </div>
  );
}

export default Account;
