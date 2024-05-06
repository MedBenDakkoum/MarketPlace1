import React, { useState, useEffect } from "react";
import { Location } from "./Settings/Location";
import { Other } from "./Settings/Other";

function AdminSettings() {
  const [inter, setInter] = useState("location");
  const [classes, setClasses] = useState({
    location: "single-section active",
    other: "single-section"
  });
  const handleInterChange = (e) => {
    setClasses({
        location: "single-section",
      other: "single-section",
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
            name="location"
            className={classes.location}
            onClick={handleInterChange}
          >
            Location
          </div>
          <div
            name="other"
            className={classes.other}
            onClick={handleInterChange}
          >
            Other
          </div>
        </div>
        {inter == "location" ? (
          <Location />
        ) : inter == "other" ? (
          <Other />
        ) : (
          <h1>Error 404</h1>
        )}
      </div>
    </main>
  );
}

export default AdminSettings;
