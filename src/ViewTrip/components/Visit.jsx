import React from "react";
import { Link } from "react-router";
import { useQuery } from "@tanstack/react-query";

const fetchPlaceImage = async (placeName) => {
  if (!placeName) return '/trip img.webp';

  try {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${placeName}&client_id=${import.meta.env.VITE_UNSPLASH_ACCESS_KEY}&per_page=1`
    );
    const data = await response.json();
    if (data.results && data.results.length > 0) {
      return data.results[0].urls.regular;
    }
  } catch (error) {
    console.error(`Error fetching image for ${placeName}:`, error);
  }

  return '/trip img.webp';
};

function Visit({ trip }) {
  console.log("Itinerary Data:", trip?.tripData?.itinerary);

  return (
    <div>
      <h2 className="font-bold p-5 text-white text-lg text-center">Places to Visit</h2>

      <div className="flex flex-col items-center">
        {Object.entries(trip?.tripData?.itinerary || {}).map(([day, details]) => (
          <div key={day} className="mb-6 w-full">
            <h2 className="font-medium text-white text-lg text-center">📅 {day}</h2>
            <p className="text-gray-200 mb-2 text-center">🎯 {details.theme}</p>

            {Array.isArray(details.activities) ? (
              <div className="grid grid-cols-2 text-white sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 w-full lg:w-5/6 mx-auto">
                {details.activities.map((activity, i) => {
                  const { data: imageUrl = '/trip img.webp' } = useQuery({
                    queryKey: ['placeImage', activity.place_name],
                    queryFn: () => fetchPlaceImage(activity.place_name),
                    staleTime: 60 * 1000,
                    enabled: !!activity.place_name,
                  });

                  return (
                    <Link
                      to={
                        "https://www.google.com/maps/search/?api=1&query=" +
                        activity.place_details +
                        "," +
                        activity.place_name
                      }
                      target="_blank"
                      key={i}
                    >
                      <div className="flex flex-col lg:flex-row border p-4 rounded-xl shadow-md gap-4">
                        {/* Image Section */}
                        <div className="w-full lg:w-1/3 flex justify-center">
                          <img
                            src={imageUrl}
                            alt={activity.place_name}
                            className="w-full lg:w-64 h-40 object-cover rounded-md"
                          />
                        </div>

                        {/* Details Section */}
                        <div className="flex flex-col justify-center text-start w-full gap-2">
                          <h3 className="font-semibold text-lg">
                            {activity.place_name}
                          </h3>
                          <p className="text-gray-200">{activity.place_details}</p>
                          <p className="text-sm">
                            🎟️ Ticket: {activity.ticket_pricing}
                          </p>
                          <p className="text-sm">
                            🕒 Travel Time: {activity.time_travel}
                          </p>
                          <p className="text-sm">
                            ⭐ Rating: {activity.rating} / 5
                          </p>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            ) : (
              <p>No activities listed.</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Visit;



