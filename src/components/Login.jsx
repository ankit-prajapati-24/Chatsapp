import { useState, useRef } from "react";
import toast, { Toaster } from 'react-hot-toast';
import LoadingBar from 'react-top-loading-bar';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { apiConnecter } from './services/apiconnecter';
import { setuserdata } from "../slices/UserDataSlice";
import { useDispatch } from "react-redux";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const ref = useRef();

  async function SubmitHandeler(data) {
    console.log("my data", data);
    try {
      if (ref.current) {
        ref.current.continuousStart(); // Start the loading animation
      }
      const res = await apiConnecter("post", "Auth/Login", { Number: data.number, Password: data.password });
      console.log(res);
      if (ref.current) {
        ref.current.complete(); // Complete the loading animation
      }
      dispatch(setuserdata(res.data.user))
      toast.success("Login successfully");
      navigate("/Home");
    } catch (err) {
      if (ref.current) {
        ref.current.complete(); // Complete the loading animation
      }
      toast.error("Please try again later");
      console.log("error occurred", err);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1a202c]">
      <LoadingBar color="red" ref={ref} />
      <Toaster />
      <div className="p-8 rounded-lg shadow-lg bg-[#1a202c] ring-2 ring-[#1a202c] w-80 transform transition-transform duration-500 hover:scale-105">
        <h2 className="text-4xl font-italic mb-4 text-center text-black shining-text">Chatsapp</h2>
        <form onSubmit={handleSubmit(SubmitHandeler)}>
          <div className="mb-4">
            <label htmlFor="number" className="block text-left text-white font-semibold mb-2">Number</label>
            <input
              type="text"
              id="number"
              required
              name="number"
              className="w-full px-3 py-2 bg-transparent border-b-2 focus:outline-none focus:border-b-green-500 rounded-xl"
              placeholder="Enter your number"
              {...register("number", { required: true })}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-left text-white font-semibold mb-2">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full px-3 py-2 bg-transparent border-b-2 focus:outline-none focus:border-b-green-500 rounded-xl"
              {...register("password", { required: true })}
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-xl hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
          >
            Login
          </button>
          <div className='flex text-white text-sm p-2 items-center gap-1 mt-2 justify-center'>
            <h1>Create new account</h1>
            <Link to={"/Signup"} className='text-blue-500'>
              Sign up
            </Link>
          </div>
          <div className="flex justify-center mt-4">
            <Link to={"/ForgotPassword"} className='text-blue-500 text-sm'>
              Forgot Password?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
