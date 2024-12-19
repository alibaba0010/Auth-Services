import styles from "@/src/utils/style";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { FC, useState } from "react";
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
import { formSchema } from "../validators/validator";

type RegisterSchema = z.infer<typeof formSchema>;

type Props = {
  setActiveState: (route: string) => void;
};

const Register: FC<Props> = ({ setActiveState }) => {
  const [show, setShow] = useState(false);
  const [registerUsermutation, { loading }] = useMutation(REGISTER_USER);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<RegisterSchema>({
    resolver: zodResolver(formSchema),
  });

  const onSubmitHandler = async (data: RegisterSchema) => {
    try {
      const res = await registerUsermutation({
        variables: data,
      });
      const { activation_token } = res.data.registerUser;
      localStorage.setItem("activation_token", activation_token);
      console.log("Response: ", res.data.registerUser);
      toast.success("Please check your email for activation code");
      reset();
      setActiveState("Verification");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
        </div>
        {errors.contact && (
          <span className="text-red-500 block mt-1">
            {`${errors.contact.message}`}
          </span>
        )}
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
            disabled={isSubmitting || loading}
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
