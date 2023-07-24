import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import Homepage from "./pages/Homepage";
import Login from "./components/Login";
import Register from "./components/Register";
import ProfilePage from "./pages/ProfilePage";
import PlacesPage from "./pages/PlacesPage";
import BookingsPage from "./pages/BookingsPage";
import PlacesForm from "./components/PlacesPage/PlacesForm";
import SinglePlacePage from "./pages/SinglePlacePage";
import SingleBookingPage from "./pages/SingleBookingPage";
import axios from "axios";
import { UserContextProvider } from "./userContext";
const backEndURL = import.meta.env.VITE_APP_BACKEND_URL;

axios.defaults.baseURL = backEndURL;
axios.defaults.withCredentials = true;
axios.defaults.headers.common["Authorization"] = localStorage.getItem("token");


function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Homepage />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/account",
          element: <ProfilePage />,
        },
        {
          path: "/account/places",
          element: <PlacesPage />,
        },
        {
          path: "/account/places/new",
          element: <PlacesForm />,
        },
        {
          path: "/account/places/:id",
          element: <PlacesForm />,
        },
        {
          path: "/place/:id",
          element: <SinglePlacePage />,
        },
        {
          path: "/account/bookings",
          element: <BookingsPage />,
        },
        {
          path: "/account/bookings/:id",
          element: <SingleBookingPage />,
        },
      ],
    },
  ]);
  return (
    <UserContextProvider>
      <RouterProvider router={router} />
    </UserContextProvider>
  );
}

export default App;
