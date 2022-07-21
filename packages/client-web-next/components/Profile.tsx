import { useState } from "react";
import useUser from "./hooks/useUser";
import { NavigationContext } from "../hooks/NavigationContext";

// export interface User {
//   email: string;
// }

const Profile = () => {
  //   const { user, isLoggedIn } = useUser({ redirectTo: "" });

  //   if (!user || isLoggedIn === false) {
  //     return <div>Loading...</div>;
  //   }

  return (
    <NavigationContext.Consumer>
      {({ profile }) => (
        <div>{profile && (profile.username || profile.nickname)}</div>
      )}
    </NavigationContext.Consumer>
  );
};

export default Profile;
