"use server";

import prisma from "../lib/prismaDB";
import * as bcrypt from "bcryptjs";

const generateRandomPassword = () => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()-_=+";
  const charactersLength = 8;

  const uniqueCharacters = [...Array.from(new Set(characters))];

  let password = "";

  for (let i = 0; i < charactersLength; i++) {
    const randomIndex = Math.floor(Math.random() * uniqueCharacters.length);
    password += uniqueCharacters[randomIndex];
  }

  return password;
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const registerUser = async (user: any) => {
  const { name, email } = user;
  const userExists = await prisma.users.findUnique({ where: { email } });
  if (userExists) {
    return userExists;
  } else {
    const password = generateRandomPassword();
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.users.create({
      data: { name, email, password: hashedPassword },
    });
    return newUser;
  }
};
