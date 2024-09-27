import { useEffect } from "react";
import { useUserContext } from "../../provider/UserContext";

const Logout: React.FC = () => {
  const { user, setUser, setUserCookie, userCookie } = useUserContext();
  const handleLogout = async () => {
    try {
      const response = await fetch("/api/users/logout", {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        // Clear the localStorage and context state
        localStorage.removeItem("csvReaderToken");
        setUser(null);
        setUserCookie(null);
        window.location.href = "/signin"; // Redirect after logout
      } else {
        const errorData = await response.json();
        console.error("Logout failed:", errorData);
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  useEffect(() => {
    console.log("User:", user);
    console.log("User Cookie:", userCookie);
  }, [user, userCookie]);

  return (
    <button
      className="bg-neutral-300 btn w-1/12 flex justify-center text-center mx-auto mt-2"
      onClick={handleLogout}
    >
      Logout
    </button>
  );
};

export default Logout;
