import styles from "@/src/utils/style";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { z } from "zod";

import { useForm } from "react-hook-form";
import {
  AiFillGithub,
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useMutation } from "@apollo/client";
import { REGISTER_USER } from "../../graphql/actions/register.actions";
import toast from "react-hot-toast";

const formSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Name must be more than 3 characters")
    .max(20, "Contact must be less than 15 digits"),

  email: z.string().email(),
  contact: z
    .number()
    .min(11, "Contact must be at least 11 digits")
    .max(15, "Contact must be less than 15 digits"),
  password: z
    .string()
    .min(8, "Password must be at least 8characters long!")
    .max(15, "Contact must be less than 15 digits"),
});

type RegisterSchema = z.infer<typeof formSchema>;

const Register = ({
  setActiveState,
}: {
  setActiveState: (e: string) => void;
}) => {
  const [show, setShow] = useState(false);
  const [registerUsermutation, { loading, error, data }] =
    useMutation(REGISTER_USER);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<RegisterSchema>({
    resolver: zodResolver(formSchema),
  });

  const onSubmitHandler = async (data: RegisterSchema) => {
    console.log("Data saved", data);
    const res = await registerUsermutation({
      variables: data,
    });
    console.log("Res: ", JSON.stringify(res));
    console.log("Response: ", res.data);
    toast.success("Please check your email for activation code");
    reset();
    try {
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div>
      <h1 className={`${styles.title}`}>Register with Alibaba Delivery</h1>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <div className="w-full relative mb-3">
          <label className={`${styles.label}`}>Enter your Name</label>
          <input
            {...register("name")}
            type="text"
            placeholder="johndoe**"
            className={`${styles.input}`}
          />
        </div>
        <label className={`${styles.label}`}>Enter your Email</label>
        <input
          {...register("email")}
          type="email"
          placeholder="loginmail@gmail.com"
          className={`${styles.input}`}
        />
        {errors.email && (
          <span className="text-red-500 block mt-1">
            {`${errors.email.message}`}
          </span>
        )}
        <div className="w-full relative mt-3">
          <label className={`${styles.label}`}>Enter your Phone Number</label>
          <input
            {...register("contact", { valueAsNumber: true })}
            type="number"
            placeholder="+8801*******"
            className={`${styles.input}`}
          />
          {errors.contact && (
            <span className="text-red-500 block mt-1">
              {`${errors.contact.message}`}
            </span>
          )}
        </div>
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
        <div className="w-full mt-5">
          <input
            type="submit"
            value="Register"
            disabled={isSubmitting} // || loading
            className={`${styles.button} mt-3`}
          />
        </div>
        <br />
        <h5 className="text-center pt-4 font-Poppins text-[16px] text-white">
          Or join with
        </h5>
        <div className="flex items-center justify-center my-3">
          <FcGoogle size={30} className="cursor-pointer mr-2" />
          <AiFillGithub size={30} className="cursor-pointer ml-2" />
        </div>
        <h5 className="text-center pt-4 font-Poppins text-[14px]">
          Already have an account?
          <span
            className="text-[#2190ff] pl-1 cursor-pointer"
            onClick={() => setActiveState("Login")}
          >
            Login
          </span>
        </h5>
        <br />
      </form>
    </div>
  );
};

export default Register;
