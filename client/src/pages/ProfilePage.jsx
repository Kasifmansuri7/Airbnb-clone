import React, { useContext } from "react";
import { UserContext } from "../userContext";
import { useNavigate } from "react-router-dom";
import AccountNav from "../components/AccountNav";
import axios from "axios";

function ProfilePage() {
  let { ready, user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  async function logout() {
    await axios.post("/logout");
    localStorage.removeItem("token");
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
      <div className="text-center max-w-lg mx-auto ">
        Logged in as {user.name} ({user.email})<br />
        <button onClick={logout} className="primary max-w-sm mt-2">
          Logout
        </button>
      </div>
    </div>
  );
}

export default ProfilePage;
