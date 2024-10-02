import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import Cookies from "js-cookie";

interface UserContextType {
  user: string | null;
  setUser: (user: string | null) => void;
  userCookie: string | null;
  setUserCookie: (cookie: string | null) => void;
  currentData: any[] | null;
  setCurrentData: (data: any[] | null) => void;
  filteredData: any[] | null;
  setFilteredData: (data: any[] | null) => void;
  tableData: any[] | null;
  setTableData: (data: any[] | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<string | null>(null);
  const [userCookie, setUserCookie] = useState<string | null>(null);
  const [currentData, setCurrentData] = useState<any[] | null>(null);
  const [filteredData, setFilteredData] = useState<any[] | null>(null);
  const [tableData, setTableData] = useState<any[] | null>(null);

  useEffect(() => {
    const csvReaderUser = Cookies.get("csvReaderUser");
    if (csvReaderUser) {
      setUser(csvReaderUser);
    } else {
      console.error("CSVReaderUser cookie not found or undefined");
    }
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        userCookie,
        setUserCookie,
        currentData,
        setCurrentData,
        filteredData,
        setFilteredData,
        tableData,
        setTableData,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
