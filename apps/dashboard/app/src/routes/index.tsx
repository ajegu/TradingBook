import React from "react";

import async from "../components/Async";

import {
  Briefcase,
  Sliders,
} from "react-feather";



// Dashboards components
const Default = async(() => import("../pages/Overview"));

const Projects = async(() => import("../pages/Wallet"));

const dashboardsRoutes = {
  id: "Overview",
  path: "/",
  icon: <Sliders />,
  containsHome: true,
  children: null,
  component: Default
};

const projectsRoutes = {
  id: "Trades",
  path: "/trades",
  icon: <Briefcase />,
  component: Projects,
  children: null
};

// Routes using the Dashboard layout
export const dashboardLayoutRoutes = [
  dashboardsRoutes,
  projectsRoutes,
];


// Routes visible in the sidebar
export const sidebarRoutes = [
  dashboardsRoutes,
  projectsRoutes,
];
