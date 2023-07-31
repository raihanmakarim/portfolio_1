import { useEffect, useState, useRef } from "react";
import "./App.css";
import React from "react";
import robot_sit from "./assets/robot_sit.png";
import Robot from "./component/robot";
import Type from "./component/type";

import square from "./assets/square.svg";
import block from "./assets/block.svg";

import Plx from "react-plx";
import useScrollBlock from "./helper/useScrollBlock";

const parallaxData = [
  {
    start: 0,
    end: 5000,
    properties: [
      {
        startValue: 1,
        endValue: 0.5,
        property: "scale",
      },
      {
        startValue: 0,
        endValue: 600,
        property: "translateX",
      },
      {
        startValue: 0,
        endValue: 100,
        property: "translateY",
      },
      // {
      //   startValue: 0,
      //   endValue: -200,
      //   property: "translateX",
      // },
    ],
  },
];

const parallaxData2 = [
  {
    start: 0,
    end: 1000,
    properties: [
      {
        startValue: 0,
        endValue: 180,
        property: "rotate",
      },
      {
        startValue: 1,
        endValue: 3,
        property: "scaleZ",
      },
      {
        startValue: 0,
        endValue: -1000,
        property: "translateX",
      },
      // {
      //   startValue: 0,
      //   endValue: -1000,
      //   property: "translateY",
      // },
    ],
  },
];

const App = () => (
  <div>
    <h1>Hello There</h1>
    <h1>Im Karim a Fullstack Developer</h1>
    <Robot />
  </div>
);
export default App;
