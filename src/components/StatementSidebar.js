import React from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarToggler,
  CImage,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";

import { AppSidebarNav } from "./AppSidebarNav";

import logo from "src/assets/images/logo.jpeg";
import { sygnet } from "src/assets/brand/sygnet";

import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";

// sidebar nav config
import navigation from "../_nav";

const AppSidebar = () => {
  const dispatch = useDispatch();
  const unfoldable = useSelector((state) => state.sidebarUnfoldable);
  const sidebarShowstatement = useSelector(
    (state) => state.sidebarShowstatement
  );
  console.log("sidebar", sidebarShowstatement);
  return (
    <CSidebar
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShowstatement}
      onVisibleChange={(visible) => {
        dispatch({ type: "set", sidebarShowstatement: visible });
      }}
    >
      <CSidebarBrand className="d-none d-md-flex" to="/">
        <CImage className="image-wrapper" src={logo} />
        {/* <CAvatar className="logo_wrapper" src={logo} height={35}/> */}
        {/* <CIcon className="sidebar-brand-full" icon={logoNegative} height={35} /> */}
      </CSidebarBrand>
      <CSidebarNav>
        <SimpleBar>
          <AppSidebarNav items={navigation} />
        </SimpleBar>
      </CSidebarNav>
      <CSidebarToggler
        className="d-none d-lg-flex"
        onClick={() =>
          dispatch({ type: "set", sidebarUnfoldable: !unfoldable })
        }
      />
    </CSidebar>
  );
};

export default React.memo(AppSidebar);