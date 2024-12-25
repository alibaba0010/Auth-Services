"use client";
import React, { useState } from "react";
import { RESET_PASSWORD } from "../../graphql/actions/resetPassword.actions";
import { useMutation } from "@apollo/client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import styles from "@/src/utils/style";
import toast from "react-hot-toast";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const passwordRegex = new RegExp(
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
);

const formSchema = z
  .object({
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long!")
      .max(15, "Password must be less than 20 characters")
      .refine((value) => passwordRegex.test(value), {
        message:
          "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
      }),
    confirmPassword: z.string(),
  })
  .refine(
    (values) => {
      return values.password === values.confirmPassword;
    },
    {
      message: "Passwords must match!",
      path: ["confirmPassword"],
    }
  );
type ResetPasswordSchema = z.infer<typeof formSchema>;

const ResetPassword = ({ token }: { token: string | string[] }) => {
  const [resetPassword, { loading }] = useMutation(RESET_PASSWORD);
  const [show, setShow] = useState(false);
  const [confirmPasswordshow, setconfirmPasswordshow] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ResetPasswordSchema>({
    resolver: zodResolver(formSchema),
    // defaultValues: { token },
  });
  const onSubmit = async (data: ResetPasswordSchema): Promise<void> => {
    try {
      await resetPassword({
        variables: {
          password: data.password,
          confirmPassword: data.confirmPassword,
          token,
        },
      });
      toast.success("Password reset successfully!, Login now");
      reset();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    }
  };
  return (
    <div className="w-full flex justify-center items-center h-screen">
      <div className="md:w-[500px] w-full">
        <h1 className={`${styles.title}`}>Reset Your Password</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="w-full mt-5 relative mb-1">
            <label htmlFor="password" className={`${styles.label}`}>
              Enter your password
            </label>
            <input
              {...register("password")}
              type={!show ? "password" : "text"}
              placeholder="password!@%"
              className={`${styles.input}`}
            />
            {!show ? (
              <AiOutlineEyeInvisible
                className="absolute bottom-3 right-2 z-1 cursor-pointer"
                size={20}
                onClick={() => setShow(true)}
              />
            ) : (
              <AiOutlineEye
                className="absolute bottom-3 right-2 z-1 cursor-pointer"
                size={20}
                onClick={() => setShow(false)}
              />
            )}
          </div>
          {errors.password && (
            <span className="text-red-500">{`${errors.password.message}`}</span>
          )}
          <div className="w-full mt-5 relative mb-1">
            <label htmlFor="confirmPassword" className={`${styles.label}`}>
              Confirm your password
            </label>
            <input
              {...register("confirmPassword")}
              type={!confirmPasswordshow ? "password" : "text"}
              placeholder="password!@%"
              className={`${styles.input}`}
            />
            {!confirmPasswordshow ? (
              <AiOutlineEyeInvisible
                className="absolute bottom-3 right-2 z-1 cursor-pointer"
                size={20}
                onClick={() => setconfirmPasswordshow(true)}
              />
            ) : (
              <AiOutlineEye
                className="absolute bottom-3 right-2 z-1 cursor-pointer"
                size={20}
                onClick={() => setconfirmPasswordshow(false)}
              />
            )}
          </div>
          {errors.confirmPassword && (
            <span className="text-red-500">{`${errors.confirmPassword.message}`}</span>
          )}
          <br />
          <input
            type="submit"
            value="Submit"
            disabled={isSubmitting || loading}
            className={`${styles.button} mt-3`}
          />
          <br />
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
