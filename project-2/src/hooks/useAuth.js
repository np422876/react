import { useState, useEffect } from "react";

function useAuth() {

  const [isLoggedIn, setIsLoggedIn] =
    useState(false);

  useEffect(() => {

    const loginStatus =
      localStorage.getItem(
        "isLoggedIn"
      );

    if (loginStatus === "true") {

      setIsLoggedIn(true);

    }

  }, []);

  return {
    isLoggedIn,
    setIsLoggedIn
  };

}

export default useAuth;