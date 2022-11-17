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
    name: "Setup",
    to: "",
    items: [
      {
        component: CNavItem,
        name: "User List",
        to: "/users",
      },
      {
        component: CNavItem,
        name: "Bank List",
        to: "/bank",
      },
      {
        component: CNavItem,
        name: "Branch List",
        to: "/branch",
      },

      // {
      //   component: CNavItem,
      //   name: "Financial Organization",
      //   to: "/orgnization",
      // },
      // {
      //   component: CNavItem,
      //   name: "Partner",
      //   to: "/partner",
      // },
      // {
      //   component: CNavItem,
      //   name: "Partner-Branch",
      //   to: "/partner-branch",
      // },
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
      // {
      //   component: CNavItem,
      //   name: "Services",
      //   to: "/service",
      // },
      {
        component: CNavItem,
        name: "Settelment Account",
        to: "/settelment",
      },
      {
        component: CNavItem,
        name: "Default Service",
        to: "/default-servic/add-default-service",
      },
    ],
  },

  {
    component: CNavGroup,
    name: "Merchant Management",
    to: "/merchant_management",
    items: [
      {
        component: CNavItem,
        name: "Merchant Management",
        to: "/merchant_management",
      },
      {
        component: CNavItem,
        name: "Merchant List",
        to: "/merchant",
      },
      {
        component: CNavItem,
        name: "Merchant Service",
        to: "/merchant-service",
      },
      {
        component: CNavItem,
        name: "Merchant Store",
        to: "/merchant-store",
      },
      // {
      //   component: CNavItem,
      //   name: "Bank Payment",
      //   to: "/bank-payment",
      // },
    ],
  },

  // {
  //   component: CNavGroup,
  //   name: "Setup",
  //   to: "",
  //   items: [
  //     {
  //       component: CNavItem,
  //       name: "Bank Account",
  //       to: "/bank-account",
  //     },
  //     {
  //       component: CNavItem,
  //       name: "Category Services List",
  //       to: "/category-services",
  //     },
  //     {
  //       component: CNavItem,
  //       name: "Store List",
  //       to: "/store",
  //     },
  //   ],
  // },

  // {
  //   component: CNavTitle,
  //   name: "Extras",
  // },
  // {
  //   component: CNavGroup,
  //   name: "Pages",
  //   icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
  //   items: [
  //     {
  //       component: CNavItem,
  //       name: "Login",
  //       to: "/login",
  //     },
  //     {
  //       component: CNavItem,
  //       name: "Register",
  //       to: "/register",
  //     },
  //     {
  //       component: CNavItem,
  //       name: "Error 404",
  //       to: "/404",
  //     },
  //     {
  //       component: CNavItem,
  //       name: "Error 500",
  //       to: "/500",
  //     },
  //   ],
  // },
];

export default _nav;
