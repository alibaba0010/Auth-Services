import React, { FC } from "react";
import ResetPassword from "../../auth/ResetPassword";

interface SearchParamsProps {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}
const Reset_Password: FC<SearchParamsProps> = ({ searchParams }) => {
  const token = searchParams["verify"] ?? "";
  console.log("Token: " + token);
  return (
    <div>
      <ResetPassword token={token}></ResetPassword>;
    </div>
  );
};

export default Reset_Password;
