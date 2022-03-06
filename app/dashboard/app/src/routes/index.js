import React from "react";

import async from "../components/Async";

import {
  Briefcase,
  Sliders,
} from "react-feather";

// Dashboards components
const Overview = async(() => import("../pages/Overview"));

// Pages components
const Wallet = async(() => import("../pages/Wallet"));

const overviewRoutes = {
  id: "Overview",
  path: "/",
  icon: <Sliders />,
  containsHome: true,
  children: null,
  component: Overview
};

const walletRoutes = {
  id: "Wallet",
  path: "/wallet",
  icon: <Briefcase />,
  component: Wallet,
  children: null
};

// Routes using the Dashboard layout
export const dashboardLayoutRoutes = [
  overviewRoutes,
  walletRoutes,
];

// Routes visible in the sidebar
export const sidebarRoutes = [
  overviewRoutes,
  walletRoutes,
];
