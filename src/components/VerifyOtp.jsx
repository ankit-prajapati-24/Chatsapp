import { useState, useRef, useEffect } from "react";
import toast, { Toaster } from 'react-hot-toast';
import LoadingBar from 'react-top-loading-bar';
import { useForm } from "react-hook-form";
import OtpInput from "react-otp-input";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { apiConnecter } from "./services/apiconnecter";

const VerifyOtp = () => {
  const ref = useRef();
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(60); // 1-minute timer
  const [resendDisabled, setResendDisabled] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userform = useSelector((state) => state.User.SignData);
  const { password, name, mobile ,Email} = userform;

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer(timer - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setResendDisabled(false);
    }
  }, [timer]);

  const handleVerifyAndSignup = async (event) => {
    event.preventDefault();
    console.log("Verify", password, mobile, name, otp);
    try {
      if (ref.current) {
        ref.current.continuousStart();
      }
      const res = await apiConnecter("post", "Auth/Signup", { Name: name, Number: mobile, UserOTP: otp, Password: password,Email:Email });
      console.log(res);
      if (ref.current) {
        ref.current.complete();
      }
      toast.success("Signup successfully");
      navigate("/login");
    } catch (err) {
      if (ref.current) {
        ref.current.complete();
      }
      toast.error("Please Try Again Later");
      console.log("error occurred", err);
    }
  };

  const handleResendOtp = () => {
    setTimer(60);
    setResendDisabled(true);
    // Logic to resend OTP
    toast.success("OTP resent successfully");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1a202c]">
      <LoadingBar color="red" ref={ref} />
      <div className="bg-[#1a202c] shadow-lg p-6 rounded-lg flex items-center justify-center flex-col mx-auto">
        <h2 className="text-4xl font-italic mb-4 text-center text-white shining-text">Chatsapp</h2>
        <p className="text-3xl font-semibold mb-6 text-center text-gray-500 overflow-visible">Enter 6-Digit OTP</p>
        <form onSubmit={handleVerifyAndSignup} className="flex items-center justify-center flex-col">
          <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
            renderInput={(props) => (
              <input
                {...props}
                placeholder="-"
                style={{
                  boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                className="w-[48px] lg:w-[60px] border-0 text-black bg-gray-300 rounded-[0.5rem] text-richblack-5 aspect-square text-center focus:border-0 focus:outline-2 focus:outline-yellow-50"
              />
            )}
            containerStyle={{
              justifyContent: "space-between",
              gap: "0 6px",
            }}
          />
          <button
            type="submit"
            className="w-full bg-green-500 py-[12px] px-[12px] hover:scale-95 rounded-md border border-black max-w-[200px] justify-center items-center mt-6 font-medium text-richblack-900"
          >
            Verify
          </button>
        </form>
        <p className="mt-4 text-gray-400">Didn't receive the OTP? Check your inbox or spam folder.</p>
        <button
          onClick={handleResendOtp}
          disabled={resendDisabled}
          className={`mt-4 py-2 px-4 rounded ${resendDisabled ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-700'} text-white`}
        >
          Resend OTP {resendDisabled && `in ${timer}s`}
        </button>
      </div>
      <Toaster />
    </div>
  );
};

export default VerifyOtp;
