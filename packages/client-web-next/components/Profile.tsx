import { useState } from "react";
import useUser from "./hooks/useUser";

export interface User {
  email: string;
}

const Profile = () => {
  const { user, isLoggedIn } = useUser({ redirectTo: "" });

  if (!user || isLoggedIn === false) {
    return <div>Loading...</div>;
  }

  return <div>{user && user.email}</div>;
};

export default Profile;
