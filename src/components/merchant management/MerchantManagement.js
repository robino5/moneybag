import React, { useState } from "react";
import BusinessStructure from "./BusinessStructure";
import BusinessRepresentative from "./BusinessRepresentative";
import BusinessDetails from "./BusinessDetails";
import BankDetails from "./bank details/BankDetails";

const MerchantManagement = () => {
  const [active, setActive] = useState(1);
  const handleNext = (e) => {
    setActive(e);
  };
  const clickNext = (e) => {
    setActive(active + e);
  };

  console.log(active);
  return (
    <div>
      <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
        <li className="nav-item" role="presentation">
          <button
            className={`nav-link ${active == 1 ? "active" : ""}`}
            onClick={() => handleNext(1)}
          >
            Business Structure
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            className={`nav-link ${active == 2 ? "active" : ""}`}
            onClick={() => handleNext(2)}
          >
            Business Representative
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            className={`nav-link ${active == 3 ? "active" : ""}`}
            onClick={() => handleNext(3)}
          >
            Business Details
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            className={`nav-link ${active == 4 ? "active" : ""}`}
            onClick={() => handleNext(4)}
          >
            Bank Details
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            className={`nav-link ${active == 5 ? "active" : ""}`}
            onClick={() => handleNext(5)}
          >
            Summary
          </button>
        </li>
      </ul>
      <br></br>
      <div hidden={active !== 1 ? true : false}>
        <BusinessStructure clickNext={clickNext} />
      </div>
      <div hidden={active !== 2 ? true : false}>
        <BusinessRepresentative clickNext={clickNext} />
      </div>
      <div hidden={active !== 3 ? true : false}>
        <BusinessDetails clickNext={clickNext} />
      </div>
      <div hidden={active !== 4 ? true : false}>
        <BankDetails />
      </div>
    </div>
  );
};

export default MerchantManagement;
