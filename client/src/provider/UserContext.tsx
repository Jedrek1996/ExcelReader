import React, { createContext, useState, useContext, ReactNode } from "react";

interface UserContextType {
  user: string | null;
  setUser: (user: string | null) => void;
  userCookie: string | null;
  setUserCookie: (cookie: string | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<string | null>(null);
  const [userCookie, setUserCookie] = useState<string | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser, userCookie, setUserCookie }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within an UserProvider");
  }
  return context;
};
