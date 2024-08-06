import { useState, useRef } from "react";
import toast, { Toaster } from 'react-hot-toast';
import LoadingBar from 'react-top-loading-bar';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { apiConnecter } from './services/apiconnecter';

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const ref = useRef();

  async function SubmitHandler(data) {
    console.log("my data", data);
    try {
      if (ref.current) {
        ref.current.continuousStart(); // Start the loading animation
      }
      // Example API call
      const res = await apiConnecter("post", "Auth/SendOtp", { Number: data.number });
      console.log(res);
      if (ref.current) {
        ref.current.complete(); // Complete the loading animation
      }
      toast.success("OTP sent to your number");
      navigate("/ResetPassword");
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
        <form onSubmit={handleSubmit(SubmitHandler)}>
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
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-xl hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
          >
            Send OTP
          </button>
          <div className='flex text-white text-sm p-2 items-center gap-1 mt-2 justify-center'>
            <h1>Remember your password?</h1>
            <Link to={"/Login"} className='text-blue-500'>
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
