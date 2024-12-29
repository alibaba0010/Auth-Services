"use server";

import prisma from "../lib/prismaDB";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const registerUser = async (user: any) => {
  console.log("Users: " + user);
  const { name, email } = user;
  console.log("Email: " + email);
  const userExists = await prisma.users.findUnique({ where: { email } });
  if (userExists) {
    return userExists;
  } else {
    const newUser = await prisma.users.create({
      data: { name, email },
    });
    return newUser;
  }
};
