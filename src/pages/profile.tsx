import ProfileHeader from "@/components/sections/profile/Header";
import { useSelector } from "@/hooks/useTypedSelector";
import { fetchUserProfile } from "@/store/feature/profile/user.slice";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

const profile = () => {
  const profile = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch();
    console.log(profile);
    fetchUserProfile("mbukeprince");
  }, []);

  return (
    <div className="font-sans">
      <ProfileHeader />
    </div>
  );
};

export default profile;
