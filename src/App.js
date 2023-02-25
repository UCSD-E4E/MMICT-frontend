import * as React from 'react';
import * as ReactDom from "react-dom";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import { statesData } from './data';
import './App.css';

import Visualization from './pages/Visualization/index.js';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Visualization />,
  }
])

export default function App() {
  return (
    <RouterProvider router={router} />
  );
}