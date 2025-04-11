import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { db } from "@/service/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { toast } from "sonner";
import Info from "../showTrip/components/Info";
import Hotels from "../showTrip/components/Hotels";
import Visit from "../showTrip/components/Visit";
import Footer from "../showTrip/components/Footer";
function ShowTrip() {
  //fetch document from firebase db

  const { tripId } = useParams(); 
   
  // const [trip, setTrip] = useState([]);
  const [trip, setTrip] = useState(null);

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
      <Visit trip={trip}/>
      <Footer/>
    </div>
  )
}
export default ShowTrip;
