import { useState, useEffect } from "react";
import { profileData } from "../../globals/apis";
import * as HttpStatus from "../../globals/http.contants";

export interface Options {
  redirectTo: string;
}

export interface User {
  email: string;
}

export default function useUser(options: Options) {
  const { redirectTo } = options;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<null | User>(null);

  //   profileData().then((res) => {
  //     if (res.status === HttpStatus.UNAUTHORIZED) {
  //       //   setIsLoggedIn(false);
  //       //   setUser(null);
  //     } else {
  //       //   setIsLoggedIn(true);
  //       //   // todo
  //       //   setUser(res);
  //     }
  //     console.log("profileData", res);
  //   });

  return {
    user,
    isLoggedIn,
  };
}
