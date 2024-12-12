import React, { useState } from "react";

function CreateTrip() {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const apiKey = process.env.REACT_APP_GEOAPIFY_API_KEY;

  const fetchSuggestions = async (input) => {
    if (!input) {
      setSuggestions([]);
      return;
    }

    const url = `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(input)}&apiKey=${apiKey}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      setSuggestions(data.features || []);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  };

  const handleChange = (e) => {
    const input = e.target.value;
    setQuery(input);
    fetchSuggestions(input);
  };

  const handleSelect = (place) => {
    setQuery(place.properties.formatted); // Set the selected place's name
    setSuggestions([]); // Clear suggestions
  };

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10 text-left">
      <h2 className="font-bold text-3xl">Tell us your travel preference</h2>
      <p className="mt-3 text-xl font-light text-[20px]">
        Just provide some basic information, and our trip planner will generate a customized itinerary based on your preferences.
      </p>
      <div>
        <h2 className="text-xl my-5 font-medium">What's your destination choice?</h2>
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Search for a destination..."
          className="border p-2 w-full"
        />
        <ul className="bg-white border mt-2 max-h-48 overflow-auto">
          {suggestions.map((suggestion) => (
            <li
              key={suggestion.properties.place_id}
              className="p-2 cursor-pointer hover:bg-gray-200"
              onClick={() => handleSelect(suggestion)}
            >
              {suggestion.properties.formatted}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default CreateTrip;
