import "./style.css";
import { Sidebars } from "../../components/sidebar/SideBars";
import { useState } from "react";
import totvs from "../../images/banner-totvs.jpg"
import React from "react";

export default function Inventory() {
  const [currentComponent, setCurrentComponent] = useState<React.ReactNode>(
    <img src={totvs} alt="" className="totvs"/>
  );

  return (
    <>
      <Sidebars onSelect={setCurrentComponent} />
      <div style={{ marginLeft: "20px" }}>{currentComponent}</div>
    </>
  );
}
