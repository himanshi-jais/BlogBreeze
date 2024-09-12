import { React, useState } from "react";
import authService from "../appwrite/auth";
import { Link, useNavigate } from "react-router-dom";
import { Button, Logo, Input } from "./index";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { login } from "../redux/authSlice";

function SignUpComponent() {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const signUp = async (data) => {
    setError("");
    try {
      const userData = await authService.createAccount(data);

      if (userData) {
        const session = await authService.createSession(
          userData.email,
          userData.password
        );
        const currentUser = await authService.getCurrentUser();
        if (currentUser) {
          dispatch(login(currentUser));
          navigate("/");
        }
      }
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <div className="flex items-center justify-center w-full">
      <div
        className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
      >
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign Up
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Already have an account?&nbsp;
          <Link
            to="/login"
            className=" text-primary font-bold transition-all duration-200 hover:underline"
          >
            Login
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <form onSubmit={handleSubmit(signUp)} className="mt-8">
          <div className="space-y-5">
            <Input
              label="UserName"
              type="text"
              placeholder="Enter Your Name"
              {...register("name", {
                required: true,
              })}
            />
            <Input
              label="Email"
              type="email"
              placeholder="Your email"
              {...register("email", {
                required: true,
                validate: {
                  matchPattern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
                },
              })}
            />
            <Input
              label="Password"
              type="password"
              placeholder="Your password"
              {...register("password", {
                required: true,
              })}
            />
            <Button
              btnText={"SignUp"}
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUpComponent;
