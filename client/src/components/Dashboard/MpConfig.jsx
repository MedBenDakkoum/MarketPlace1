import React, { useState } from "react";
import { MpConfigDefault } from "./MpConfig/MpConfigDefault";
import { MpConfigApproval } from "./MpConfig/MpConfigApproval";
import { MpConfigCommission } from "./MpConfig/MpConfigCommission";
import { MpConfigPayment } from "./MpConfig/MpConfigPayment";
function MpConfig() {
  const [inter, setInter] = useState("default");
  const [classes, setClasses] = useState({
    default: "single-section active",
    approval: "single-section",
    commission: "single-section",
    payment: "single-section",
  });
  const handleInterChange = (e) => {
    setClasses({
      default: "single-section",
      approval: "single-section",
      commission: "single-section",
      payment: "single-section",
      [e.target.getAttribute("name")]: "single-section active",
    });
    setInter(e.target.getAttribute("name"));
  };
  return (
    <main className="main-container">
      <div className="main-title">
        <h3>Configuration</h3>
      </div>
      <div className="multi-choice-container">
        <div className="multi-choice-navbar">
          <div
            name="default"
            className={classes.default}
            onClick={handleInterChange}
          >
            Default
          </div>
          <div
            name="approval"
            className={classes.approval}
            onClick={handleInterChange}
          >
            Approval
          </div>
          <div
            name="commission"
            className={classes.commission}
            onClick={handleInterChange}
          >
            Commission
          </div>
          <div
            name="payment"
            className={classes.payment}
            onClick={handleInterChange}
          >
            Payment Methods
          </div>
        </div>
        {inter == "default" ? (
          <MpConfigDefault />
        ) : inter == "approval" ? (
          <MpConfigApproval />
        ) : inter == "commission" ? (
          <MpConfigCommission />
        ) : inter == "payment" ? (
          <MpConfigPayment />
        ) : (
          <h1>Error 404</h1>
        )}
      </div>
    </main>
  );
}

export { MpConfig };
