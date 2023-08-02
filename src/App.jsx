import { useEffect, useState, useRef } from "react";
import "./App.css";
import React from "react";
import Robot from "./component/robot";
import Plx from "react-plx";
import Box from "./component/box";
import Navbar from "./component/navbar";

const parallaxData = [
  {
    start: 0,
    end: 1000,
    properties: [
      {
        startValue: 1,
        endValue: 2,
        property: "scale",
      },
      {
        startValue: 0,
        endValue: 400,
        property: "translateX",
      },
      {
        startValue: 0,
        endValue: 500,
        property: "translateY",
      },
    ],
  },
];

const parallaxData2 = [
  {
    start: 500,
    end: 1000,
    properties: [
      {
        startValue: 1,
        endValue: 2,
        property: "scale",
      },
      {
        startValue: 0,
        endValue: 500,
        property: "translateX",
      },
      {
        startValue: 0,
        endValue: 0,
        property: "translateY",
      },
    ],
  },
];

const App = () => (
  <div style={{ overflow: "hidden" }}>
    <Navbar />
    <div className="container  w-screen pl-80">
      <Plx parallaxData={parallaxData}>
        <Robot />
      </Plx>

      <div className="flex flex-col items-start">
        <h1 className="text-4xl">Hi, Im Karim</h1>
        <h1 className="text-2xl">Fullstack Developer</h1>
      </div>
    </div>

    <div className="container-gray   overflow-hidden text-black p-14  w-screen">
      <div className=" max-w-screen-xl w-screen ">
        <div className="flex max-h-64  justify-start items-center  gap-24">
          <p className="max-w-md font-extralight relative z-10 ">
            For me, developing is like assembling a complex puzzle. With a
            passion for crafting the best stack and methodologies, I strive to
            create and ship products that stand out with excellence and
            perfection.
          </p>
        </div>

        <div className="flex  w-5/6     justify-end items-center  gap-10">
          <div>
            <h1>My Skills Included</h1>
            <p className="max-w-md font-extralight relative z-10 ">
              Javascript, Typescript, Python, PHP
            </p>
            <h2>For Front End</h2>
            <p className="max-w-md font-extralight relative z-10 ">
              React js, Next js, Vue js, Tailwind css, Bootstrap, Redux, MUI
            </p>
            <h2>For Back End End</h2>
            <p className="max-w-md font-extralight relative z-10 ">
              Express js, Laravel, Fast Api, Node js
            </p>
          </div>
        </div>
      </div>
      <Plx parallaxData={parallaxData2}>
        <Box />
      </Plx>
    </div>

    <div className="container  w-screen pl-80">
      <div className="flex flex-col items-start">
        <h1 className="text-4xl">Hi, Im Karim</h1>
        <h1 className="text-2xl">Fullstack Developer</h1>
      </div>
    </div>
  </div>
);
export default App;
