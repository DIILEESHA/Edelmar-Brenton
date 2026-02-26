import React from "react";
import Nav from "../../components/nav/Nav";
import Faq from "../../components/invite/Faq";
import Header from "../../components/header/Header";

const Fa = () => {
  return (
    <div>
      <Nav />
      <Header title="Frequently Asked Questions" />
      <Faq />
      <h2 className="ooters">Jaslene & Mišel © All Rights Reserved</h2>
    </div>
  );
};

export default Fa;
