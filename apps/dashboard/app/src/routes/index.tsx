import React from "react";

import async from "../components/Async";

import {
  Briefcase,
  Sliders,
  Lock
} from "react-feather";


// Dashboards components
const Default = async(() => import("../pages/Overview"));
const Projects = async(() => import("../pages/Wallet"));
const AssetList = async(() => import("../pages/AssetList"));

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

const adminRoutes = {
  id: "Admin",
  path: '/admin',
  icon: <Lock />,
  component: null,
  children: [
    {
      path: '/admin/asset',
      name: 'Assets',
      component: AssetList
    }
  ]
};

// Routes using the Dashboard layout
export const dashboardLayoutRoutes = [
  dashboardsRoutes,
  projectsRoutes,
  adminRoutes
];


// Routes visible in the sidebar
export const sidebarRoutes = [
  dashboardsRoutes,
  projectsRoutes,
  adminRoutes
];
