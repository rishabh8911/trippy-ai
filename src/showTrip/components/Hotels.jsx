import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Corrected from 'react-router'
import { useQueryClient } from '@tanstack/react-query';

const fetchHotelImage = async (hotelName) => {
  if (!hotelName) return '/trip img.webp';

  try {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${hotelName}&client_id=${import.meta.env.VITE_UNSPLASH_ACCESS_KEY}&per_page=1`
    );
    const data = await response.json();
    if (data.results && data.results.length > 0) {
      return data.results[0].urls.regular;
    }
  } catch (error) {
    console.error(`Error fetching image for ${hotelName}:`, error);
  }

  return '/trip img.webp';
};

function Hotels({ trip }) {
  const hotels = trip?.tripData?.hotel_options || [];
  const [hotelImages, setHotelImages] = useState({});
  const queryClient = useQueryClient();

  useEffect(() => {
    const fetchImages = async () => {
      const images = {};

      await Promise.all(
        hotels.map(async (hotel) => {
          const hotelName = hotel?.hotel_name;
          if (hotelName) {
            // Try to get from React Query cache first
            const cached = queryClient.getQueryData(['hotelImage', hotelName]);

            if (cached) {
              images[hotelName] = cached;
            } else {
              const imageUrl = await fetchHotelImage(hotelName);
              images[hotelName] = imageUrl;
              queryClient.setQueryData(['hotelImage', hotelName], imageUrl);
            }
          }
        })
      );

      setHotelImages(images);
    };

    if (hotels.length > 0) {
      fetchImages();
    }
  }, [trip, hotels, queryClient]);

  return (
    <div>
      <h2 className="font-bold text-white text-xl mt-5 mb-3">Hotel Recommendations</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
        {hotels.map((hotel, index) => {
          const imageUrl = hotelImages[hotel?.hotel_name] || '/trip img.webp';

          return (
            <Link
              key={hotel.id || index}
              to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hotel?.hotel_name + ',' + hotel?.hotel_address)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="hover:scale-105 border rounded transition-all cursor-pointer gap-2">
                <img
                  src={imageUrl}
                  alt={hotel.hotel_name}
                  className="rounded-sm h-[180px] w-full object-cover"
                />
                <div className="my-2 flex flex-col gap-2">
                  <h2 className="font-medium text-white">🏨 {hotel?.hotel_name}</h2>
                  <h2 className="text-xs text-gray-300">🛣️ {hotel?.hotel_address}</h2>
                  <h2 className="text-sm text-gray-200">💰 {hotel?.price}</h2>
                  <h2 className="text-sm text-gray-200">⭐ {hotel?.rating} Reviews</h2>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Hotels;

