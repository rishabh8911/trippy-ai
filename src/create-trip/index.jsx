import React from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";

function CreateTrip(){
    return(
        <div className="sm:px-10 md:px-32 lg:px-56  xl:px-10 px-5 mt-10 text-left">
            <h2 className="font-bold text-3xl">Tell us your travel preference</h2>
            <p className=" mt-3 text-xl font-light text-[20px]">Just provide some basic information, and our trip planner will generate a customized itinerary based on your preferences.</p>
            <div>
                <div>
                    <h2 className="text-xl my-5 font-medium ">Whats your destination choice?</h2>
                    <GooglePlacesAutocomplete
                    apiKey='' />
                </div>

            </div>
         


        </div>

       
    )
}

export default CreateTrip
