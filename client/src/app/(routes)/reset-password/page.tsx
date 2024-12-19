import React, { FC } from "react";

interface SearchParamsProps {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}
const Reset_Password: FC<SearchParamsProps> = ({ searchParams }) => {
  console.log("Sarch = " + searchParams);
  return <div>Reset-Password</div>;
};

export default Reset_Password;
