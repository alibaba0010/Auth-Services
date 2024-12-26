"use server";

import prisma from "../lib/prismaDB";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const registerUser = async (user: any) => {
  const { name, email } = user;
  const userExists = await prisma.users.findUnique({ where: { email } });
  if (userExists) {
    return userExists;
  }
  const newUser = await prisma.users.create({
    data: { name, email },
  });
  return newUser;
};
