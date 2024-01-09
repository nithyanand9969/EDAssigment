import React, { useState, useEffect } from "react";
import "./clock.css";

const Clock = () => {
  const [time, setTime] = useState(""); // Initialize time state

  useEffect(() => {
    const intervalID = setInterval(() => {
      const currentDate = new Date(); // Get current date and time
      const formattedTime = currentDate.toLocaleTimeString(); // Format time as a string
      setTime(formattedTime); // Update the time state with the current time
    }, 1000); // Update every second

    // Clear the interval on component unmount to avoid memory leaks
    return () => clearInterval(intervalID);
  }, []); // Empty dependency array to run the effect only once

  return (
    <div>
  
      <h5>{time}</h5>
    </div>
  );
};

export default Clock;
