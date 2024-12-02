import styles from "@/src/utils/style";
import React from "react";

// import PropTypes from "prop-types";
// import { Avatar } from "@nextui-org/avatar";

const Header = () => {
  return (
    // <header>
    //   <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
    // </header>
    <header className="w-full bg-[#0A0713]">
      <div className="w-[90%] m-auto h-[80px] flex items-center justify-between">
        <h1 className={`${styles.logo}`}>Alibaba Delivery</h1>
        {/* <NavItems /> */}
        {/* <ProfileDropDown /> */}
      </div>
    </header>
  );
};

Header.propTypes = {};

export default Header;
