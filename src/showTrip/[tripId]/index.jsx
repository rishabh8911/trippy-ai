import React, {useEffect}from "react";
import { useParams } from "react-router";
import { db } from "@/service/firebaseConfig";
import {doc, getDoc} from "firebase/firestore";
import { toast } from "sonner";
import Info from "../components/info";
function ShowTrip(){
  
    //fetch document from firebase db

    const {tripId}=useParams();


    useEffect(()=>{
      tripId&&getTripData();
    },[tripId])

    // use to get info from firebase

    const getTripData=async ()=>{
        const docRef=doc(db,'trips',tripId)
        const docSnap= await getDoc(docRef )

        if (docSnap.exists()){
          console.log("document:",docSnap.data());
          
        }else{
          console.log("no data found");
          toast('no such data')
          
        }
    }

  return (
    <div>
      <Info trip={trip}/>
    </div>
  )
}
export default ShowTrip;
