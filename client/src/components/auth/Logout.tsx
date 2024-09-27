import React from "react";

const Logout: React.FC = () => {
  const handleLogout = async () => {
    try {
      const response = await fetch("/api/users/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        window.location.href = "/signin";
      } else {
        const errorData = await response.json();
        console.error("Logout failed:", errorData);
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

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
