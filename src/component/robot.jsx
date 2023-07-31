import React, { useEffect, useRef } from "react";
import teeth from "../assets/teeth.svg";

const Robot = () => {
  const eyeRef = useRef([]);

  const eyeball = (targetX, targetY) => {
    eyeRef.current.forEach((eye) => {
      const x = eye.getBoundingClientRect().left + eye.clientWidth / 2;
      const y = (eye.getBoundingClientRect().top ) + eye.clientHeight / 2 ;

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
        }
        else {
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

  // Throttle helper function
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
    <div className=" moving-animation robot">
      <div className="eye-container">
        <div className="left-eye">
          <div className="iris">
            <div className="pupil-primary"></div>
            <div className="pupil-secondary"></div>
            <div className="pupil-tertiary"></div>
          </div>
        </div>
        <div className="eye">
          <div className="iris" style={{ background: "var(--primary" }}>
            
          </div>
        </div>
      </div>

      <div className="square border-primary" />
      <div className="square border-secondary rotate-animation" />
      <div className="square border-tertiary rotate-animation2" />
      <div className="teeth_container">
        <img key="teeth1" id="teeth" alt="teeth" src={teeth} className="upper-teeth" />
        <img key="teeth2" id="teeth" alt="teeth" src={teeth} className="below-teeth"/>
      </div>
    </div>
  );
};

export default Robot;
