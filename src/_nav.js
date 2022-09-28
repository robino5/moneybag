import React from "react";
import CIcon from "@coreui/icons-react";
import {
  cilBell,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDescription,
  cilDrop,
  cilNotes,
  cilPencil,
  cilPuzzle,
  cilSpeedometer,
  cilStar,
} from "@coreui/icons";
import { CNavGroup, CNavItem, CNavTitle } from "@coreui/react";

const _nav = [
  {
    component: CNavItem,
    name: "Dashboard",
    to: "/dashboard",
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    badge: {
      color: "info",
      text: "NEW",
    },
  },
  {
    component: CNavGroup,
    name: "Organization",
    to: "",
    items: [
      {
        component: CNavItem,
        name: "User List",
        to: "/users",
      },
      {
        component: CNavItem,
        name: "Financial Organization",
        to: "/orgnization",
      },
      {
        component: CNavItem,
        name: "Partner",
        to: "/partner",
      },
      {
        component: CNavItem,
        name: "Partner-Branch",
        to: "/partner-branch",
      },
    ],
  },

  {
    component: CNavGroup,
    name: "Fintech Management",
    to: "",
    items: [
      {
        component: CNavItem,
        name: "Fintech List",
        to: "/fintech",
      },
      {
        component: CNavItem,
        name: "Branch List",
        to: "/branch",
      },
      {
        component: CNavItem,
        name: "Survice List",
        to: "/service",
      },
      {
        component: CNavItem,
        name: "Settelment Account",
        to: "/settelment",
      },
    ],
  },

  {
    component: CNavGroup,
    name: "Setup",
    to: "",
    items: [
      {
        component: CNavItem,
        name: "Bank Account",
        to: "/bank-account",
      },
      {
        component: CNavItem,
        name: "Category Services List",
        to: "/category-services",
      },
      {
        component: CNavItem,
        name: "Store List",
        to: "/store",
      },
    ],
  },

  {
    component: CNavTitle,
    name: "Extras",
  },
  {
    component: CNavGroup,
    name: "Pages",
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: "Login",
        to: "/login",
      },
      {
        component: CNavItem,
        name: "Register",
        to: "/register",
      },
      {
        component: CNavItem,
        name: "Error 404",
        to: "/404",
      },
      {
        component: CNavItem,
        name: "Error 500",
        to: "/500",
      },
    ],
  },
];

export default _nav;
