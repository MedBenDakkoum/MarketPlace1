import React, { useState, useEffect } from "react";
import { TopBanner } from "./Settings/TopBanner";
import { RecommandedItems } from "./Settings/RecommandedItems";
import { HomeSections } from "./Settings/HomeSections";

function AdminSettings() {
  const [inter, setInter] = useState("topBanner");
  const [classes, setClasses] = useState({
    topBanner: "single-section active",
    homeSections: "single-section",
    recommendedItems: "single-section",
  });
  const handleInterChange = (e) => {
    setClasses({
      topBanner: "single-section",
      homeSections: "single-section",
      recommendedItems: "single-section",
      [e.target.getAttribute("name")]: "single-section active",
    });
    setInter(e.target.getAttribute("name"));
  };
  return (
    <main className="main-container">
      <div className="main-title">
        <h3>Settings</h3>
      </div>
      <div className="multi-choice-container">
        <div className="multi-choice-navbar">
          <div
            name="topBanner"
            className={classes.topBanner}
            onClick={handleInterChange}
          >
            Top Banner
          </div>
          <div
            name="homeSections"
            className={classes.homeSections}
            onClick={handleInterChange}
          >
            Home Sections
          </div>
          <div
            name="recommendedItems"
            className={classes.recommendedItems}
            onClick={handleInterChange}
          >
            Recommended Items
          </div>
        </div>
        {inter == "topBanner" ? (
          <TopBanner />
        ) : inter == "homeSections" ? (
          <HomeSections />
        ) : inter == "recommendedItems" ? (
          <RecommandedItems />
        ) :(
          <h1>Error 404</h1>
        )}
      </div>
    </main>
  );
}

export default AdminSettings;
