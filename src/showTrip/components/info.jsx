import React, { useEffect, useState } from "react";

const fetchDestinationImage = async (destination) => {
  if (!destination) return "/trip img.webp";
  try {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${destination}&client_id=${import.meta.env.VITE_UNSPLASH_ACCESS_KEY}&per_page=1`
    );
    const data = await response.json();
    if (data.results && data.results.length > 0) {
      return data.results[0].urls.regular;
    }
  } catch (error) {
    console.error("Error fetching destination image:", error);
  }
  return "/trip img.webp";
};

function Info({ trip }) {
  const [placeImage, setPlaceImage] = useState("/trip img.webp");

  const userSelection = trip?.userSelection
    ? JSON.parse(trip.userSelection)
    : null;

  const location = userSelection?.location || userSelection?.trip_details?.location;

  useEffect(() => {
    const getImage = async () => {
      const image = await fetchDestinationImage(location);
      setPlaceImage(image);
    };

    if (location) {
      getImage();
    }
  }, [location]);

  return (
    <div>
      <img
        src={placeImage}
        className="h-[330px] w-full object-cover rounded-xl"
        alt={location}
      />
      <div className="flex flex-col gap-5 my-5">
        <h2 className="font-bold text-white text-2xl">
          {location}
        </h2>

        <div className="flex gap-5 flex-wrap">
          <h2 className="p-1 bg-gray-500 text-white px-3 rounded-full">
            No. of Days: {userSelection?.trip_details?.duration}
          </h2>
          <h2 className="p-1 px-3 rounded-full bg-gray-500 text-white ">
            {userSelection?.trip_details?.budget}
          </h2>
          <h2 className="p-1 px-3 rounded-full bg-gray-500 text-white ">
            Travelers: {userSelection?.trip_details?.travelers}
          </h2>
        </div>
      </div>
    </div>
  );
}

export default Info;




