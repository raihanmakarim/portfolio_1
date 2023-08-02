import React, { useEffect, useRef } from "react";
import "../styles/robot.css";

const Robot = () => {
  const eyeRef = useRef([]);

  const eyeball = (targetX, targetY) => {
    eyeRef.current.forEach((eye) => {
      const x = eye.getBoundingClientRect().left + eye.clientWidth / 2;
      const y = eye.getBoundingClientRect().top + eye.clientHeight / 2;

      const isInsideIris =
        targetX >= x - eye.clientWidth / 2 &&
        targetX <= x + eye.clientWidth / 2 &&
        targetY >= y - eye.clientHeight / 2 &&
        targetY <= y + eye.clientHeight / 2;

      if (!isInsideIris) {
        const radian = Math.atan2(targetX - x, targetY - y);
        const transformX = Math.round(Math.sin(radian) * 100);
        const transformY = Math.round(Math.cos(radian) * 100);

        const prevLeft = eye.dataset.prevLeft || x;
        const leftDifference = Math.abs(x - prevLeft);

        if (leftDifference < 10) {
          eye.style.transform = `translate(${transformX}%, ${transformY}%)`;
          eye.dataset.prevLeft = x;
        } else {
          eye.dataset.prevLeft = x;
        }
      }
    });
  };

  const throttledEyeball = useRef(null);

  useEffect(() => {
    eyeRef.current = Array.from(document.querySelectorAll(".iris"));

    throttledEyeball.current = throttle(eyeball, 1000 / 60);
  }, []);

  useEffect(() => {
    const handleMouseMove = (event) => {
      const Y = event.pageY - window.scrollY;

      throttledEyeball.current(event.pageX, Y);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const throttle = (func, limit) => {
    let lastCall = 0;
    return (...args) => {
      const now = Date.now();
      if (now - lastCall >= limit) {
        lastCall = now;
        func(...args);
      }
    };
  };

  return (
    <div className="robot-container">
      <div className="eye-container">
        <div className="eye">
          <div className="iris" style={{ background: "var(--primary" }}></div>
        </div>
        <div className="eye">
          <div className="iris" style={{ background: "var(--primary" }}></div>
        </div>
      </div>

      <div className="fire">
        <div className="fire-left">
          <div className="main-fire"></div>
          <div className="particle-fire"></div>
        </div>
        <div className="fire-center">
          <div className="main-fire"></div>
          <div className="particle-fire"></div>
        </div>
        <div className="fire-right">
          <div className="main-fire"></div>
          <div className="particle-fire"></div>
        </div>
        <div className="fire-bottom">
          <div className="main-fire"></div>
        </div>
      </div>
    </div>
  );
};

export default Robot;
