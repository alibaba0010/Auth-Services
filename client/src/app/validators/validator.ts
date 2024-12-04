import { z } from "zod";

const passwordRegex = new RegExp(
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
);

export const formSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Name must be more than 3 characters")
    .max(20, "Name must be less than 20 characters"),

  email: z.string().email("Invalid email address"),

  contact: z
    .number()
    .int()
    .positive()
    .refine(
      (value) => {
        const phoneString = value.toString();
        return phoneString.length >= 10 && phoneString.length <= 15;
      },
      {
        message: "Phone number must be between 7 and 15 digits",
      }
    ),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters long!")
    .max(15, "Password must be less than 20 characters")
    .refine((value) => passwordRegex.test(value), {
      message:
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
    }),
});
