import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../Button";
import Stats from "@/components/Stats";
import MarqueeDemo from "@/components/magicui/MarqueeDemo";

function Hero() {
  return (
    <div className="py-2  bg-black flex flex-col items-center">
      <h1 className="text-4xl md:text-5xl p-6 font-extrabold leading-tight tracking-tight">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#5175f5] to-orange-500">
          Trippy Your AI Travel
        </span>
        <span className="block text-blue-900 :text-white">Companion</span>
      </h1>

      {/* <img
        src="nature.jpg"
        alt="nature image"
        className="w-full max-w-4xl mx-auto h-80 object-cover rounded-xl"
      /> */}
      <p className="text-xl font-semibold text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
        Experience the future of travel planning with our AI-powered platform.
        Create personalized itineraries, discover hidden gems, and book with
        confidence.
      </p>

      <div className="">
      <Link to="/create-trip">
        <Button className="m-9">Get Started, It's Free</Button>
        <Button>View sample Trips </Button>
      </Link>

      </div>

      <MarqueeDemo/>
      <Stats />
    </div>
  );
}

export default Hero;

// Trippy Your AI Travel Companion
// Let's Plan, Explore, and Wander, Personalized Just for You!"
