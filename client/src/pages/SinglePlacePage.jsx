import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ShowAllPhotos from "../components/SinglePage/ShowAllPhotos";
import BookingWidget from "../components/SinglePage/BookingWidget";
import ImageSection from "../components/SinglePage/ImageSection";
import InfoWidget from "../components/SinglePage/InfoWidget";
import Perks from "../components/PlacesPage/Perks";
import TitleAdd from "../components/SinglePage/TitleAdd";

function SinglePlacePage() {
  const { id } = useParams();
  const [place, setPlace] = useState({});
  const [showAllPhotos, setShowAllPhotos] = useState(false);

  useEffect(() => {
    axios.get("/place/" + id).then(({ data }) => {
      setPlace(data);
    });
  }, [id]);

  if (showAllPhotos) {
    return <ShowAllPhotos place={place} setShowAllPhotos={setShowAllPhotos} />;
  }


  return (
    <div className="mt-8  py-6 mx-14">
      <TitleAdd place={place}/>
      <ImageSection setShowAllPhotos={setShowAllPhotos} place={place} />

      <div className=" mt-10 grid gap-10 grid-cols-1 md:grid-cols-[2fr_1fr]">
        <InfoWidget place={place} />
        <BookingWidget place={place} />
      </div>
      <div className="my-6">
        <h2 className="font-semibold text-2xl">Perks Included</h2>
        <Perks selected={place.perks}/>
      </div>
      <div className="my-6">
        <h2 className="font-semibold text-2xl">Extra Information</h2>
        {place.extraInfo}
      </div>
    </div>
  );
}

export default SinglePlacePage;
