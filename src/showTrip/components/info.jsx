import React from "react";
import { Share } from "lucide-react";

function Info({ trip }) {
  const userSelection = trip?.userSelection
    ? JSON.parse(trip.userSelection)
    : null;
  console.log("tripp1 data:", trip);

  return (
    <div className="">
      <img src="/trip img.webp" alt="" className="w-full object-cover"  />
      <div>
        <div className="flex flex-col gap-5 my-5">
          <h2 className="font-bold text-2xl ">
            {userSelection?.trip_details?.location}
          </h2>

          <div className="flex gap-5">
            <h2 className=" p-1 px-3 rounded-full bg-gray-400">
              No. of Days: {userSelection?.trip_details?.duration}
            </h2>
            <h2 className="p-1 px-3 rounded-full bg-gray-400">
              {userSelection?.trip_details?.budget}
            </h2>
            <h2 className="p-1 px-3 rounded-full bg-gray-400">
              No. of travelers: {userSelection?.trip_details?.travelers}
            </h2>
          </div>
        </div>
        <button>share </button>
      </div>
    </div>
  );
}

export default Info;
