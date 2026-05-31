import { useState, useEffect } from "react";

function useAuth() {

  const [isLoggedIn, setIsLoggedIn] =
    useState(false);

  useEffect(() => {

    const status =
      localStorage.getItem(
        "isLoggedIn"
      );

    setIsLoggedIn(
      status === "true"
    );

  }, []);

  return {
    isLoggedIn,
    setIsLoggedIn
  };

}

export default useAuth;