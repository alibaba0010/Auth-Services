"use server";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const registerUser = async (user: any) => {
  console.log("User registered: ", user);
  const { name, email } = user;
  const newUser = await prismadb.users.create({
    data: { name, email },
  });
  return { newUser };
};
