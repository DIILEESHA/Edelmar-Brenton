import React from "react";
import Schedule from "../../components/schedule/Schedule";
import Header from "../../components/header/Header";
import Dress from "../../components/dress/Dress";

const It = () => {
  return (
    <div className="hosa">
      <Header title="Wedding Day Itinerary" />
      <Schedule />
      <Dress />
      <h2 className="ooters">Jaslene & Mišel © All Rights Reserved</h2>
    </div>
  );
};

export default It;
