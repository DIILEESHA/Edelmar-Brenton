import Header from "@/components/header/Header";
import Nav from "@/components/nav/Nav";
import Welcome from "@/components/welcome/Welcome";
import React from "react";
import Vendor from "./Vendor";
import { Footer } from "antd/es/layout/layout";

const All = () => {
  return (
    <div>
      <Header />
      <Welcome para="We’re working with a wonderful team of professionals to make our wedding day special. Below you’ll find information about the vendors and services helping bring our celebration to life at Silavadee Resort." />
      <Vendor/>
      {/* <h2 className="ooters">Jaslene & Mišel © All Rights Reserved</h2> */}
      <h2 className="ooters">Edelmar & Brenton © All Rights Reserved</h2>


    </div>
  );
};

export default All;
