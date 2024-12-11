import React from "react";
import {Link} from "react-router-dom";
import { Button } from "../Button";


function Hero() {
  return (
    <div className="py-2 flex flex-col items-center">
      <h1 className=" font-extrabold text-[30px] justify-center flex-row flex-wrap">
        <span className="text-blue-400 ">"Trippy Your AI Travel Companion:</span>
        <br />Let's Plan, Explore, and Wander, Personalized Just for You!"
      </h1>
      <Link to="/create-trip">
      <Button className="mt-12">Get Started, It's Free</Button></Link>
      
      
    </div>
  );

}

export default Hero;
