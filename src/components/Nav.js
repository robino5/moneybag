import React from "react";
import {
  CNavbarNav,
  CContainer,
  CNavbarToggler,
  CNavbarBrand,
  CNavbar,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
  CCollapse,
  CDropdownDivider,
} from "@coreui/react";

const Nav = () => {
  return (
    <CNavbar expand="lg" colorScheme="dark" className="bg-dark">
      <CContainer fluid>
        <CNavbarBrand className="mx-5" href="#/dashboard">
          MoneyBag
        </CNavbarBrand>
        <CCollapse className="navbar-collapse justify-content-center">
          <CNavbarNav>
            <CDropdown variant="nav-item">
              <CDropdownToggle color="secondary">Setup</CDropdownToggle>
              <CDropdownMenu>
                <CDropdownItem href="#/users">Users</CDropdownItem>
                <CDropdownItem href="#/bank">Bank List</CDropdownItem>
                <CDropdownItem href="#/branch">Branch List</CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
            <CDropdown variant="nav-item">
              <CDropdownToggle color="secondary">
                Fintech Management
              </CDropdownToggle>
              <CDropdownMenu>
                <CDropdownItem href="#/fintech">Fintech List</CDropdownItem>
                <CDropdownItem href="#/settelment">
                  Settelment Account
                </CDropdownItem>
                <CDropdownItem href="#/default-servic/add-default-service">
                  Default Service
                </CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
            <CDropdown variant="nav-item">
              <CDropdownToggle color="secondary">
                Merchant Management
              </CDropdownToggle>
              <CDropdownMenu>
                <CDropdownItem href="#/merchant">Merchant List</CDropdownItem>
                <CDropdownItem href="#/merchant-service">
                  Merchant Service
                </CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
            <CDropdown variant="nav-item">
              <CDropdownToggle color="secondary">Statement</CDropdownToggle>
              <CDropdownMenu>
                <CDropdownItem href="#/statement">Statement</CDropdownItem>
                <CDropdownItem href="#/dispute">Dispute</CDropdownItem>
                <CDropdownItem href="#/transaction">
                  Transaction List
                </CDropdownItem>
                <CDropdownItem href="#/process-settlement">
                  Process Settelment
                </CDropdownItem>
                <CDropdownItem href="#/settlement-report">
                  Settelment Report
                </CDropdownItem>
              </CDropdownMenu>
            </CDropdown>
          </CNavbarNav>
        </CCollapse>
      </CContainer>
    </CNavbar>
  );
};

export default Nav;
