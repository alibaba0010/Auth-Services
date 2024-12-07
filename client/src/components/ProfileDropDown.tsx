"use client";
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import Cookies from "js-cookie";

import React, { useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import Auth from "../views/Auth";
import useUserInfo from "../hooks/useUserInfo";
import toast from "react-hot-toast";

const ProfileDropDown = () => {
  const [signedIn, setsignedIn] = useState(false);
  const [open, setOpen] = useState(false);
  const { user, loading } = useUserInfo();
  useEffect(() => {
    if (!loading) setsignedIn(!!user);
  }, [loading, user]);
  const logoutHandler = async () => {
    Cookies.remove("access_token");
    Cookies.remove("refresh_token");
    // logout logic goes here
    // setsignedIn(false);
    // setOpen(false);
    toast.success("Logged out successfully");

    window.location.reload();
  };
  return (
    <div className="flex items-center gap-4">
      {signedIn ? (
        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              as="button"
              className="transition-transform"
              // src={data?.user ? data.user.image : user.image}
              // src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
              src={user?.avatars?.url}
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Profile Actions" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">{user.email}</p>
            </DropdownItem>
            <DropdownItem key="settings">My Profile</DropdownItem>
            <DropdownItem key="all_orders">All Orders</DropdownItem>
            <DropdownItem key="team_settings">
              Apply for seller account
            </DropdownItem>
            <DropdownItem key="logout" color="danger" onClick={logoutHandler}>
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      ) : (
        <CgProfile
          className="text-3xl cursor-pointer"
          onClick={() => setOpen(!open)}
        />
      )}
      {open && <Auth setOpen={setOpen} />}
    </div>
  );
};

export default ProfileDropDown;
// setOpen={setOpen}
