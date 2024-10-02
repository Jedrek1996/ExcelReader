import { useUserContext } from "./UserContext";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

export const InitializeFields = () => {
  const { setUser, user } = useUserContext();

  useEffect(() => {
    if (!user) {
      initialize();
    }
  }, [user]);

  const initialize = () => {
    const csvReaderUser = Cookies.get("CSVReaderUser");

    if (csvReaderUser) {
      setUser(JSON.parse(csvReaderUser));
    } else {
      console.error("CSVReaderUser cookie not found");
    }
  };
};
