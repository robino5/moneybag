import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import BusinessStructureUpdate from "./BusinessStructureUpdate";
import BusinessRepresentativeUpdate from "./BusinessRepresentativeUpdate";
import BusinessDetailsUpdate from "./BusinessDetailsUpdate";
import BankDetails from "./bank details updata/BankDetails";
import {
  CCard,
  CCardHeader,
  CCardBody,
  CContainer,
  CCol,
  CRow,
} from "@coreui/react";

const MerchantManagement = () => {
  const location = useLocation();
  const [active, setActive] = useState(1);
  const handleNext = (e) => {
    setActive(e);
  };
  console.log("location", location.state);
  const clickNext = (e) => {
    setActive(active + e);
  };

  useEffect(() => {
    if (location.id) {
      setActive(location.id);
    }
  }, []);

  console.log(active);
  return (
    <div className="bg-light min-vh-100 d-flex flex-row">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={10}>
            <div className="text-center">
              <h1 hidden={active !== 1 ? true : false}>Business Information</h1>
              <h1 hidden={active !== 2 ? true : false}>Personal Details</h1>
              <h1 hidden={active !== 3 ? true : false}>Personal Details</h1>
              <h1 hidden={active !== 4 ? true : false}>
                Where should we send your payouts?
              </h1>
              <h1 hidden={active !== 5 ? true : false}>
                Please review again before submission.
              </h1>
            </div>
            <CCard className="bg-white">
              <CCardHeader>
                <ul
                  className="nav nav-tabs justify-content-center"
                  id="pills-tab"
                  role="tablist"
                >
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
                      Business Details
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className={`nav-link ${active == 3 ? "active" : ""}`}
                      onClick={() => handleNext(3)}
                    >
                      Business Representative
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className={`nav-link ${active == 4 ? "active" : ""}`}
                      onClick={() => handleNext(4)}
                    >
                      Settlement Bank
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
              </CCardHeader>
              <CCardBody>
                <div hidden={active !== 1 ? true : false}>
                  <BusinessDetailsUpdate
                    clickNext={clickNext}
                    data={location.state}
                  />
                </div>
                <div hidden={active !== 2 ? true : false}>
                  <BusinessStructureUpdate
                    clickNext={clickNext}
                    data={location.state}
                  />
                </div>
                <div hidden={active !== 3 ? true : false}>
                  <BusinessRepresentativeUpdate
                    clickNext={clickNext}
                    data={location.state}
                  />
                </div>
                <div hidden={active !== 4 ? true : false}>
                  <BankDetails clickNext={clickNext} data={location.state} />
                </div>
                {/* <div hidden={active !== 5 ? true : false}>
                  <Summery />
                </div> */}
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default MerchantManagement;
