import React, { useState } from "react";
import { FiMenu } from "react-icons/fi";
import MobileNav from "../header/MobileNav"
import AvatarDropDown from "./AvatarDropDown";

const NavBar = () => {
  const [showMobileNav, setShowMobileNav] = useState(false);

  return (
    <>
      <div className="w-full bg-secondary  flex items-center justify-between py-4 px-6 sticky top-0 shadow-sm ">
        <div className="text-white">
          <h1 className="text-xl font-bold text-primary">RBAC</h1>
        </div>
        <div className="flex gap-4">
          <div>
            <AvatarDropDown />
          </div>
          <button
            className="text-white p-2 block lg:hidden"
            onClick={() => setShowMobileNav((prev) => !prev)}
          >
            <FiMenu className="text-primary" />
          </button>
        </div>
      </div>
      {showMobileNav && <MobileNav />}
    </>
  );
};

export default NavBar;
