import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import Homepage from "./pages/Homepage";
import Login from "./components/Login";
import Register from "./components/Register";
import ProfilePage from "./components/ProfilePage";
import PlacesPage from "./components/PlacesPage";
import BookingPage from "./components/BookingPage";
import PlacesForm from "./components/PlacesForm";
import SinglePlacePage from "./components/SinglePage/SinglePlacePage"
import axios from "axios";
import { UserContextProvider } from "./userContext";

axios.defaults.baseURL = "http://localhost:3000";
axios.defaults.withCredentials = true;

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
          element: <BookingPage />,
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
