import { React, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../redux/authSlice";
import { useDispatch } from "react-redux";
import { Button, Input, Logo } from "./index";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";

// Function to handle the login process
function LoginComponent() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  // register("fieldName", validationRules)  - this is how register function works to manage input state and validation properties
  const [error, setError] = useState("");
  const login = async (data) => {
    setError("");
    try {
      const session = await authService.login(data);

      if (session) {
        const userData = await authService.getCurrentUser();
        // Fetch current user data if login was successful
        if (userData) dispatch(authLogin(userData));
        navigate("/"); // Navigate to the homepage upon successful login
      }
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <div className="py-8">
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
            Login to your account
          </h2>
          <p className="mt-2 text-center text-base text-black/60">
            Don&apos;t have any account?&nbsp;
            <Link
              to="/signup"
              className=" text-primary font-bold transition-all duration-200 hover:underline"
            >
              Sign Up
            </Link>
          </p>
          {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
          <form onSubmit={handleSubmit(login)} className="mt-8">
            <div className="space-y-5">
              <Input
                label="Email"
                type="email"
                placeholder="Enter your email"
                {...register("email", {
                  required: true,
                  validate: {
                    // This ensures the email is in a valid format
                    matchPattern: (value) =>
                      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
                        value
                      ) || "Email address must be a valid address",
                  },
                })}
              />
              <Input
                label="Password"
                type="password"
                placeholder="Enter your password"
                {...register("password", {
                  required: true,
                })}
              />
              <Button
                btnText={"LogIn"}
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginComponent;
