import styles from "@/src/utils/style";
import React from "react";
import NavItems from "../NavItems";
import ProfileDropDown from "../ProfileDropDown";

// import { Avatar } from "@nextui-org/avatar";

const Header = () => {
  return (
    <header className="w-full bg-[#0A0713]">
      <div className="w-[90%] m-auto h-[80px] flex items-center justify-between">
        <h1 className={`${styles.logo}`}>Alibaba Delivery</h1>
        <NavItems activeItem={0} />
        <ProfileDropDown />
      </div>
    </header>
  );
};

Header.propTypes = {};

export default Header;
