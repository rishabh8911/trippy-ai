import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { db } from "@/service/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { toast } from "sonner";
import Info from "../components/Info";
import Hotels from "../components/Hotels";
function ShowTrip() {
  //fetch document from firebase db

  const { tripId } = useParams(); 
   
  const [trip, setTrip] = useState([]);

  useEffect(() => {
    tripId && getTripData();
  }, [tripId]);

  // use to get trip info from firebase

  const getTripData = async () => {
    const docRef = doc(db, "trips", tripId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("document:", docSnap.data());
      setTrip(docSnap.data());
    } else {
      console.log("no data found");
      toast("no such data");
    }
  };

  return (
    <div>
      
      {trip ? <Info trip={trip} /> : <p>Trip not found.</p>}
      <Hotels trip={trip}/>
    </div>
  );
}
export default ShowTrip;
