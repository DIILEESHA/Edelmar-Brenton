import React from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./components/header/Header";
import Invite from "./components/invite/Invite";
import Count from "./components/count/Count";
import Schedule from "./components/schedule/Schedule";
import Dress from "./components/dress/Dress";
import Faq from "./components/invite/Faq";
import Rsvp from "./components/dress/Rsvp";
import Rsvps from "./pages/rsvp/Rsvps";
import AdminDashboard from "./pages/rsvp/AdminDashboard";
import It from "./pages/itinerary/It";
import "./index.css";
import Nos from "./components/Nos";
import Hotal from "./components/schedule/Hotal";
import Nav from "./components/nav/Nav";
import Acc from "./pages/acc/Acc";
import Gallery from "./pages/gallery/Gallery";
import Fa from "./pages/fa/Fa";
import Reccomondation from "./components/reccomondation/Reccomondation";
import Welcome from "./components/welcome/Welcome";
import Story from "./components/story/Story";
import Vgallery from "./pages/gallery/Vgallery";
import All from "./pages/vendors/All";
const Home = () => {
  return (
    <>
      <Header title="March 14 2028 | Koh Samui, Thailand 🌴" />
      <Welcome para="Welcome to our wedding website! We’re so excited to celebrate this next
        chapter with you. Here you’ll find all the details for our big day, and
        we can’t wait to share these moments with you!" />
      <Invite />
      <Count />
      {/* <Schedule /> */}
      {/* <Hotal /> */}
      {/* <Nos /> */}
      {/* <Faq /> */}
      <Rsvp />
      {/* <Dress /> */}
      <Story />
      <Vgallery />
      <h2 className="ooters">Jaslene & Mišel © All Rights Reserved</h2>
    </>
  );
};

const App = () => {
  return (
    <Routes>
      {/* Home Page */}
      <Route path="/" element={<Home />} />

      {/* RSVP Page */}
      <Route path="/rsvp" element={<Rsvps />} />
      <Route path="/itinerary" element={<It />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/gallery" element={<Gallery />} />
      <Route path="/accommodations" element={<Acc />} />
      <Route path="/recommendation" element={<Reccomondation />} />
      <Route path="/wedding-team" element={<All />} />
      <Route path="/faq" element={<Fa />} />
    </Routes>
  );
};

export default App;
