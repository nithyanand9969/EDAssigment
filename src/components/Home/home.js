import React from "react";
import "./home.css";
import Card from "../Card/card";

const home = () => {
  return (
    <>
      <div class="header">
        <div class="header-title">
          <div>
            <h4>Person Directory</h4>
          </div>
          <div class="recent-post">
            <h4>Recent Post</h4>
          </div>
        </div>
      </div>

      <div>
        <Card />
      </div>
    </>
  );
};

export default home;
