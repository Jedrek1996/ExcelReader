import React from "react";

const Drawer: React.FC = () => {
  return (
    <div className="drawer lg:drawer-open lg:bg-neutral-500 w-1/4 sm:w-1">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center justify-center">
        <label
          htmlFor="my-drawer-2"
          className="btn btn-primary drawer-button lg:hidden absolute left-0 top-1/2 transform -translate-y-1/2 flex items-center justify-center"
          style={{ zIndex: 10 }}
        >
          <span className="text-2xl">{">"}</span>
        </label>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu text-base-content min-h-full p-4">
          <li>
            <a>Sidebar Item 1</a>
          </li>
          <li>
            <a>Sidebar Item 2</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Drawer;
