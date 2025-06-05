import React, { useEffect, useState } from "react";
import { googleLogout } from "@react-oauth/google";
import { useNavigate } from "react-router";
import { useGoogleLogin } from "@react-oauth/google";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { HiHome } from "react-icons/hi2";
import { useUser } from "@/context/UserContext";
import axios from "axios";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";

function Header() {
  const [showWelcomeText, setShowWelcomeMessage]= useState(false);
  const {user, setUser}= useUser();
  const [openDailog, setOpenDailog] = useState(false);
  //   const user = JSON.stringify(localStorage.getItem("user"));

  //auto hide text after 5 sec 

  useEffect(()=>{
    if (showWelcomeText){
      const timer= setTimeout(()=>setShowWelcomeMessage(false),4000);
      return ()=>clearTimeout(timer)
    }
  }, [showWelcomeText])

  

  const login = useGoogleLogin({
    onSuccess: (codeResp) => {
      console.log("coderesponse", codeResp);
      GetUserProfile(codeResp);
    },
    onError: (error) => console.log("google login error", error),
  });

  const GetUserProfile = (tokenInfo) => {
    console.log("token info", tokenInfo);

    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: "Application/json",
          },
        }
      )
      .then((res) => {
        
        localStorage.setItem("user", JSON.stringify(res.data));
        setUser(res.data); //state update
        setOpenDailog(false); 
        // window.location.reload();
      })
      .catch((err) => {
        console.error("error fetching user profile:", err);
      });
  };
  const navigate = useNavigate();
  function goToHomePage() {
    navigate("/");
  }

  return (
    <div className="p-1 border-rounded flex h-16  w-full justify-between ">
      <img src="image.png" alt="travel logo" />

      <div className="flex items-center gap-6">
        <button
          className="text-white font-semibold"
          onClick={() => {
            goToHomePage();
          }}
        >
          <HiHome className="size-6 " />{" "}
        </button>

        {user ? (
          <button
            onClick={() => {
              googleLogout();
              setUser(null);
              localStorage.removeItem("user");
              navigate("/");
            }}
            className="bg-black text-white font-semibold p-2 rounded h-10"
          >
            Log Out
          </button>
        ) : (
          <button
            onClick={() => setOpenDailog(true)}
            className="bg-black text-white font-semibold p-2 rounded h-10"
          >
            Sign in{" "}
          </button>
        )}
      </div>
      <Dialog open={openDailog} onOpenChange={setOpenDailog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>welcome</DialogTitle>

            <DialogDescription>
              <h2 className="font-bold text-lg mt-1">Sign with Google</h2>
              <p>Sign in with Google Authentication securely</p>

              <Button onClick={login} className="pt-1 w-full mt-4 flex">
                <FcGoogle className="h-8 w-8" />
                Sign in with Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      {showWelcomeText&& (
        <div className="fixed top-16 right-4 bg-green-500 text-white px-4 py-3 rounded shadow-lg z-50">
          <p>🎉 Welcome! Click on "Get Started" to plan your first AI-personalized trip.</p>
          </div>
          

      )}
    </div>
  );
}

export default Header;
