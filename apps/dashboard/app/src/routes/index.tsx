import React from "react";

import async from "../components/Async";

import {
  Sliders,
  Lock,
  BarChart2
} from "react-feather";


// Dashboards components
const Default = async(() => import("../pages/Overview"));
const Trades = async(() => import("../pages/Trades"));
const AssetList = async(() => import("../pages/AssetList"));

const dashboardsRoutes = {
  id: "Overview",
  path: "/",
  icon: <Sliders />,
  containsHome: true,
  children: null,
  component: Default
};

const tradesRoutes = {
  id: "Trades",
  path: "/trades",
  icon: <BarChart2 />,
  component: Trades,
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
  tradesRoutes,
  adminRoutes
];


// Routes visible in the sidebar
export const sidebarRoutes = [
  dashboardsRoutes,
  tradesRoutes,
  adminRoutes
];
