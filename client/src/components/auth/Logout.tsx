import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../provider/UserContext";

const Logout: React.FC = () => {
  const { user, setUser, setUserCookie, userCookie } = useUserContext();
  const navigate = useNavigate();
  const handleLogout = useCallback(async () => {
    try {
      const response = await fetch("/api/users/logout", {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        localStorage.removeItem("csvReaderToken");
        setUser(null);
        setUserCookie(null);
        navigate("/signin");
      } else {
        const errorData = await response.json();
        console.error("Logout failed:", errorData);
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  }, [user, userCookie]);

  return (
    <button
      className="bg-neutral-400 hover:bg-neutral-500 text-white font-semibold btn w-15 flex justify-center text-center mx-auto mt-2"
      onClick={handleLogout}
    >
      Logout
    </button>
  );
};

export default Logout;
