import React from 'react'

function Info({trip}) {
    const userSelection = trip?.userSelection? JSON.parse(trip.userSelection): null;
    console.log("tripp1 data:", trip);
    
    return (
        <div>
            <img src="/trip img.webp" alt="" />
            <div>
                <h2 className='font-black'>{userSelection?.trip_details?.location}</h2>
                <div>
                <h2>{userSelection?.trip_details?.itinerary}</h2>
                <h2 className='font-black'>{userSelection?.trip_details?.budget}</h2>
                <h2 className='font-black'>No. of traveler: {userSelection?.trip_details?.traveler}</h2>
                

                </div>


            </div>
        </div>
    )
}

export default Info
