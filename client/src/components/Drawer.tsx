import React, { useEffect, useState } from "react";
import { useUserContext } from "../provider/UserContext";
import { toast } from "react-toastify";
import Logout from "./auth/Logout";

interface UserFile {
  _id: string;
  data: any[];
  fileName: string;
  userName: string;
  __v: number;
}

const Drawer: React.FC = () => {
  const { user, setCurrentData, setTableData, setFilteredData } =
    useUserContext();
  const [userData, setUserData] = useState<UserFile[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const fetchUserData = async () => {
    if (!user) {
      console.error("User not found");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`/api/excel/${user}/fetchUserFiles`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        console.error("Response is not JSON, received:", contentType);
        const errorText = await response.text();
        console.error("Error details:", errorText);
        return;
      }

      if (response.ok) {
        const data = await response.json();
        setUserData(data);
      } else {
        const errorData = await response.json();
        console.error("Error fetching data:", errorData);
      }
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteFile = async (fileId: string) => {
    try {
      const response = await fetch(`/api/excel/${fileId}/deleteFile`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete the file");
      }

      setUserData((prevData) => prevData.filter((file) => file._id !== fileId));
      fetchUserData();
      toast.success("File deleted successfully!");
    } catch (error) {
      console.error("Error deleting the file:", error);
      toast.error("Error deleting the file. Please try again.");
    }
  };

  const handleFileClick = (file: UserFile) => {
    setFilteredData([]);
    setCurrentData(file.data);
    setTableData(file.data);
    toast.success(`Displaying ${file.fileName}`);
  };

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  useEffect(() => {
    if (drawerOpen) {
      fetchUserData();
    }
  }, [drawerOpen, user]);

  return (
    <div className="drawer lg:bg-neutral-500 w-1/5 h-full sm:w-1">
      <input
        id="my-drawer-2"
        type="checkbox"
        className="drawer-toggle"
        checked={drawerOpen}
        onChange={handleDrawerToggle}
      />
      <div className="drawer-content flex flex-col items-center justify-center">
        <label
          htmlFor="my-drawer-2"
          className="btn bg-neutral-500 opacity-50 drawer-button fixed left-2 top-1/2 flex items-center justify-center"
        >
          <span className="text-xl text-black">{">"}</span>
        </label>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu text-base-content min-h-full flex flex-col justify-between w-1/4 p-4 bg-white">
          {loading ? (
            <div className="flex justify-center items-center">
              <img src="/Loading.gif" alt="Loading..." className="w-1/4" />
            </div>
          ) : userData && userData.length > 0 ? (
            userData.map((file) => (
              <div className="flex flex-col mb-3" key={file._id}>
                <div className="flex items-center border-2 border-neutral-200 p-2 rounded-md">
                  <a className="flex-grow">{file.fileName}</a>
                  <div className="flex">
                    <button
                      className="bg-green-300 p-1 rounded-md text-white mr-1 hover:bg-green-700"
                      onClick={() => handleFileClick(file)}
                    >
                      Display
                    </button>
                    <button
                      className="bg-red-400 p-1 rounded-md text-white hover:bg-red-600"
                      onClick={() => handleDeleteFile(file._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="flex justify-center items-center text-center text-xl text-red-400 font-semibold">
              No files found. Please upload a csv file.
            </div>
          )}
          <li className="mt-auto">
            <Logout />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Drawer;
