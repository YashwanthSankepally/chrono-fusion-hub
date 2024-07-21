import { useEffect } from "react";
import "./Clock.scss";

const Clock = () => {
  useEffect(() => {
    const hr = document.querySelector("#hr");
    const mn = document.querySelector("#mn");
    const sc = document.querySelector("#sc");

    const updateClock = () => {
      const day = new Date();
      const hh = day.getHours() * 30;
      const mm = day.getMinutes() * 6;
      const ss = day.getSeconds() * 6;

      hr.style.transform = `rotateZ(${hh + mm / 12}deg)`;
      mn.style.transform = `rotateZ(${mm}deg)`;
      sc.style.transform = `rotateZ(${ss}deg)`;
    };

    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container">
      <h1 className="text-white cfh-marquee-text">
        Track every moment with precision and style.
      </h1>

      <div className="clock">
        <div className="circle" id="sc" style={{ "--clr": "#04fc43" }}>
          <i></i>
        </div>
        <div className="circle circle2" id="mn" style={{ "--clr": "#fee800" }}>
          <i></i>
        </div>
        <div className="circle circle3" id="hr" style={{ "--clr": "#ff2972" }}>
          <i></i>
        </div>

        {[...Array(12)].map((_, i) => (
          <span key={i} style={{ "--i": i + 1 }}>
            <b>{i + 1}</b>
          </span>
        ))}
      </div>
    </div>
  );
};

export default Clock;
