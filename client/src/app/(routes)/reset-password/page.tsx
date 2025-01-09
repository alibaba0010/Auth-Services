"use client";
import React, { FC } from "react";
import ResetPassword from "../../auth/ResetPassword";

interface SearchParamsProps {
  searchParams: {
    // [key: string]: string | string[] | undefined;
    [key: string]: string | undefined;
  };
}
const Reset_Password: FC<SearchParamsProps> = ({
  searchParams,
}): React.ReactElement => {
  const token = (searchParams["verify"] as string) ?? "";

  // const token = searchParams["verify"] ?? "";
  console.log("Token: " + token);
  return (
    <div>
      <ResetPassword token={token} />
    </div>
  );
};

export default Reset_Password;
