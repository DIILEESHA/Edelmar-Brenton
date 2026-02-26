import React, { useState, useEffect } from "react";
import "./co.css";

const Count = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date("march 14, 2028 15:30:00").getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(interval);
      } else {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

return (
    <div className="count">
      <div className="count_grid">
        <div className="count_sub">
          <h2 className="co_day">{timeLeft.days}</h2>
          <h3 className="co_value">Days</h3>
        </div>

        <span className="co_separator">:</span>

        <div className="count_sub">
          <h2 className="co_day">{timeLeft.hours}</h2>
          <h3 className="co_value">Hours</h3>
        </div>

        <span className="co_separator">:</span>

        <div className="count_sub uuu">
          <h2 className="co_day">{timeLeft.minutes}</h2>
          <h3 className="co_value">Mins</h3>
        </div>

        <span className="co_separator uuu">:</span>

        <div className="count_sub">
          <h2 className="co_day flickering">{timeLeft.seconds}</h2>
          <h3 className="co_value">Secs</h3>
        </div>
      </div>
    </div>
  );
};

export default Count;