import React, { useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Ai_Prompt, SelectBudget } from "@/constants/options";
import { SelectTravelslist } from "@/constants/options";
import { Button } from "../components/ui/Button";

import { toast } from "sonner";
import { chatSession } from "@/service/AImodel";
import {getFirestore} from "firebase/firestore";
import { doc, setDoc} from "firebase/firestore"; 
import { db } from "@/service/firebaseConfig";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";

function CreateTrip() {
  const navigate= useNavigate();
  const [query, setQuery] = useState("");
  const [place, setPlace] = useState(null);
  const [loading,setLoading]= useState(false);
  const [openDailog, setOpenDailog] = useState(false);
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

    const url = `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(
      input
    )}&apiKey=${apiKey}`;
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

  const login = useGoogleLogin({
    onSuccess:(codeResp)=>{
      console.log("coderesponse",codeResp);
      GetUserProfile(codeResp);

    },
    onError:(error)=>console.log("google login error",error)
    
    
  })

  const SaveAiTrip= async(tripData)=>{
    setLoading(true);
    const user = JSON.parse( localStorage.getItem('user'));
    const docId=Date.now().toString()

// Add a new document in collection "cities"
   await setDoc(doc(db, "trips", docId), {
    userSelection: tripData,
    tripData: JSON.parse(tripData),
    userEmail: user?.email,
    id: docId
  
});
  setLoading(false);
 
  navigate('/show-trip/'+docId)
  }

  const handleGenerateTrip = async () => {
    console.log("generating trip...");
    
    const user = localStorage.getItem("user");

    if (!user) {
      console.log("user not authenticated");
      setOpenDailog(true);
      return;
    }

    const { destination, days, travelCompanions, budget } = tripData;
    // "||" used to combine multiple conditions where anyone is true triggers he code the block
    if (!destination || !days || !budget || !travelCompanions) {
      toast("Please fill in all details");
      return;
    }
    // .replace method is called on a string
    const FINAL_PROMPT = Ai_Prompt.replace("{destination}", destination)
      .replace("{totalDays}", days)
      .replace("{traveler}", travelCompanions)
      .replace("{budget}", budget);

    console.log("Generated Trip Data:", tripData);
    console.log("FINAL PROMPT:", FINAL_PROMPT);

    const result = await chatSession.sendMessage(FINAL_PROMPT);
    console.log(result?.response?.text());
    setLoading(false)
    SaveAiTrip(result?.response?.text())
  };

  const GetUserProfile=(tokenInfo)=>{
    console.log("token info",tokenInfo);
    
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,{
      headers:{
        Authorization:`Bearer ${tokenInfo?.access_token}`,
        Accept:'Application/json'
      }

    }).then((res)=>{
      console.log("response=",res);
      localStorage.setItem('user',JSON.stringify(res.data))
      setOpenDailog(false);
      handleGenerateTrip();
      
    }).catch((err)=>{
      console.error("error fetching user profile:",err);
      
    })    
  }

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10 text-left">
      <h2 className="font-bold text-white text-3xl">Tell us your travel preference</h2>
      <p className="mt-3 text-xl text-white font-light text-[20px]">
        Just provide some basic information, and our trip planner will generate
        a customized itinerary based on your preferences.
      </p>
      <div>
        <h2 className="text-xl text-white my-5 font-medium">
          What's your destination choice?
        </h2>
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Search for a destination..."
          className="border bg-black text-white rounded p-2 w-full"
        />
        <ul className="bg-black text-white rounded border mt-2 max-h-48 overflow-auto">
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
        <h2 className="text-xl text-white font-semibold mt-9 mb-3">
          How many days are you planning the trip?
        </h2>
        <Input
          placeholder="ex.3"
          type="number"
          name="days"
          className="text-white "
          value={tripData.days}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <h2 className="text-xl text-white my-3 font-medium">What is your Budget?</h2>
      </div>
      <div className="grid grid-cols-3 b cursor-pointer gap-5 mt-5">
        {SelectBudget.map((item, index) => (
          <div
          
            key={index}
            // for dynamic styling we use {`styling`}
            className={`p-4 border rounded-lg hover:shadow ${
              tripData.budget === item.type ? "bg-slate-950" : ""
            }`}
            onClick={() => handleBudgetSelect(item.type)}
          >
            <h2 className="text-lg text-white font-bold">{item.type}</h2>
            <h2 className="text-sm text-gray-600">{item.desc}</h2>
          </div>
        ))}
      </div>
      <div>
        <h2 className="text-xl text-white my-3 font-medium">
          Who do you plan on traveling with on your next adventure?
        </h2>
      </div>
      <div className="grid grid-cols-3 cursor-pointer gap-5 mt-5">
        {SelectTravelslist.map((item, index) => (
          <div
            key={index}
            className={`p-4 border rounded-lg hover:shadow ${
              tripData.travelCompanions === item.title ? "bg-slate-950" : ""
            }`}
            onClick={() => handleCompanionSelect(item.title)}
          >
            <h2 className="text-lg text-white font-bold">{item.title}</h2>
            <h2 className="text-sm text-gray-600">{item.desc}</h2>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-10">
        <Button
         disabled={loading}
         

         onClick={handleGenerateTrip}>
          { loading?
            <AiOutlineLoading3Quarters className='h-7 w-7 animate-spin'/>:'Generate Trip✨'

          }
               </Button>
      </div>
      <Dialog open={openDailog}>
        
        <DialogContent>
          <DialogHeader>
            <DialogTitle>welcome</DialogTitle>
           
            <DialogDescription>
              <h2 className="font-bold text-lg mt-1">Sign with Google</h2>
              <p>Sign in with Google Authentication securely</p>
              <Button 
              
              onClick={login}
              className="pt-1 w-full mt-4 flex"> 
              <FcGoogle className="h-8 w-8" />
              Sign in with Google</Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateTrip;
