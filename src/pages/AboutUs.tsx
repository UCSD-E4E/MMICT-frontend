import React from "react";
import TeamInfo from "../components/TeamInfo";
import ProjectInfo from "../components/ProjectInfo";
import '../assets/css/AboutUs.css'
import PastTeamInfo from "../components/PastTeamInfo";

export default function AboutUs() {
  return (
    <div className="background">
      <div className="title-div">
        <h1 className="title">About Us</h1>
      </div>
      <div>
        <ProjectInfo />
        <TeamInfo />
        <PastTeamInfo />
      </div>
    </div>
  );
}
