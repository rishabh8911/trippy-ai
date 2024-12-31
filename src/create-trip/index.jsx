import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { SelectBudget } from "@/constants/options";
import { SelectTravelslist } from "@/constants/options";
import { Button } from "@/components/ui/Button";

function CreateTrip() {
  const [query, setQuery] = useState("");
  const [place, setPlace] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [tripData, setTripData] = useState({
    destination: "",
    days: "",
    budget: "",
    travelCompanions: "",
  });

  const apiKey = import.meta.env.VITE_GEOAPIFY_API_KEY;

  const fetchSuggestions = async (input) => {
    if (!input) {
      setSuggestions([]);
      return;
    }

    const url = `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(input)}&apiKey=${apiKey}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log("API Response:", data);
      setSuggestions(data.features || []);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  const handleChange = (e) => {
    const input = e.target.value;
    setQuery(input);
    fetchSuggestions(input);
  };

  const handleSelect = (place) => {
    const selected = place.properties.formatted; // Save the selected place
    setPlace(selected);
    setTripData((prevData) => ({ ...prevData, destination: selected }));
    setQuery(selected);
    setSuggestions([]);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTripData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleBudgetSelect = (budget) => {
    setTripData((prevData) => ({
      ...prevData,
      budget,
    }));
  };

  const handleCompanionSelect = (companions) => {
    setTripData((prevData) => ({
      ...prevData,
      travelCompanions: companions,
    }));
  };

  const handleGenerateTrip = () => {
    console.log("Generated Trip Data:", tripData);
   
  };

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10 text-left">
      <h2 className="font-bold text-3xl">Tell us your travel preference</h2>
      <p className="mt-3 text-xl font-light text-[20px]">
        Just provide some basic information, and our trip planner will generate a customized itinerary based on your
        preferences.
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
      <div>
        <h2 className="text-xl font-semibold mt-9 mb-3">How many days are you planning the trip?</h2>
        <Input
          placeholder="ex.3"
          type="number"
          name="days"
          value={tripData.days}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <h2 className="text-xl my-3 font-medium">What is your Budget?</h2>
      </div>
      <div className="grid grid-cols-3 cursor-pointer gap-5 mt-5">
        {SelectBudget.map((item, index) => (
          <div
            key={index}
            // for dynamic styling we use {`styling`}
            className={`p-4 border rounded-lg hover:shadow ${
              tripData.budget === item.type ? "bg-gray-200" : ""
            }`}
            onClick={() => handleBudgetSelect(item.type)}
          >
            <h2 className="text-lg font-bold">{item.type}</h2>
            <h2 className="text-sm text-gray-600">{item.desc}</h2>
          </div>
        ))}
      </div>
      <div>
        <h2 className="text-xl my-3 font-medium">Who do you plan on traveling with on your next adventure?</h2>
      </div>
      <div className="grid grid-cols-3 cursor-pointer gap-5 mt-5">
        {SelectTravelslist.map((item, index) => (
          <div
            key={index}
            className={`p-4 border rounded-lg hover:shadow ${
              tripData.travelCompanions === item.title ? "bg-gray-200" : ""
            }`}
            onClick={() => handleCompanionSelect(item.title)}
          >
            <h2 className="text-lg font-bold">{item.title}</h2>
            <h2 className="text-sm text-gray-600">{item.desc}</h2>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-10">
        <Button onClick={handleGenerateTrip}>Generate Trip</Button>
      </div>
    </div>
  );
}

export default CreateTrip;
