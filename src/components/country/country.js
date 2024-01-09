import React, { useState, useEffect } from "react";

const Clock = ({ selectedCountry }) => {
  const [time, setTime] = useState("");
  const [countryList, setCountryList] = useState([]);

  useEffect(() => {
    const fetchCountryList = async () => {
      try {
        const response = await fetch("http://worldtimeapi.org/api/timezone");
        const data = await response.json();
        setCountryList(data);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountryList();
  }, []);

  useEffect(() => {
    const fetchTimeByCountry = async () => {
      try {
        const response = await fetch(
          `http://worldtimeapi.org/api/timezone/${selectedCountry}`
        );
        const data = await response.json();
        setTime(data.datetime);
      } catch (error) {
        console.error("Error fetching time:", error);
      }
    };

    fetchTimeByCountry();
  }, [selectedCountry]);

  return (
    <div>
      <h5>Current Time ({selectedCountry}):</h5>
      <h5>{time}</h5>

      <h3>List of Countries:</h3>
      <ul>
        {countryList.map((country, index) => (
          <li key={index}>{country}</li>
        ))}
      </ul>
    </div>
  );
};

export default Clock;
