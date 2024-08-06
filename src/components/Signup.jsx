import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useSelector,useDispatch } from 'react-redux';
import   {setSignData, SignData} from '../slices/UserDataSlice'
import { apiConnecter } from './services/apiconnecter';
const Signup = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const dispach = useDispatch();
    const navigate = useNavigate();
    async function SubmitHandeler(data){ 
           console.log("my data",data);
           dispach(setSignData(data));
           try{
            
               const response = await apiConnecter("post","Auth/SendOtp",{Number:data.mobile,Email:data.Email});
            console.log("response",response);
                  navigate("/VerifyOtp");

        }catch(e){
            console.log("error occured",e);
        }      
    }

  return (
    <div className="min-h-screen flex bg-[#1a202c] items-center justify-center ">
      <div className=" bg-[#1a202c] p-8 rounded-lg  shadow-lg w-80 transform transition-transform duration-500 hover:scale-105"
    //    style={{ backgroundImage: 'url(https://static.vecteezy.com/system/resources/previews/021/744/074/large_2x/colorful-fluid-background-design-premium-free-vector.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <h2 className="text-4xl font-italic mb-4 text-center text-white shining-text">Chatsapp</h2>
        <form onSubmit={handleSubmit(SubmitHandeler)}>
          <div className="mb-4">
            <label htmlFor="name" className="block  text-left text-white  font-semibold mb-2">Name</label>
            <input
              type="text"
              id="name"
              required
              name="name"
              className="w-full px-3 py-2  bg-transparent rounded-xl border-b-2 focus:outline-none focus:border-b-green-500 "
              placeholder="Enter your name"
              {...register("name", { required: true })}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="mobile" className="block text-left text-white font-semibold mb-2">Mobile Number</label>
            <input
              type="text"
              id="mobile"
              name="mobile"
              className="w-full px-3 py-2  bg-transparent rounded-xl  border-b-2 focus:outline-none focus:border-b-green-500 "
              placeholder="Enter your mobile number"
              {...register("mobile")}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="mobile" className="block text-left text-white font-semibold mb-2">Email</label>
            <input
              type="email"
              id="Email"
              name="Email"
              className="w-full px-3 py-2  bg-transparent rounded-xl  border-b-2 focus:outline-none focus:border-b-green-500 "
              placeholder="Enter your Email"
              {...register("Email")}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-left text-white font-semibold mb-2">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full px-3 py-2  bg-transparent rounded-xl border-b-2 focus:outline-none focus:border-b-green-500 "
              placeholder="Enter your password"
              {...register("password")}
              required

            />
          </div>
          <div className="mb-6">
            <label htmlFor="confirmPassword" className="block text-left text-white font-semibold mb-2">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className="w-full px-3 py-2  bg-transparent rounded-xl border-b-2 focus:outline-none focus:border-b-green-500 "
              placeholder="Confirm your password"
              {...register("confirmPassword")}
              required
            />
          </div>
        <button
            type="submit"
            className="w-full  bg-green-500 text-white rounded-xl py-2 px-4  hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300"
          >
          Sign up
          </button>
          <div className='flex p-2 items-center gap-1 mt-2 text-white text-sm justify-center'>
            <h1> already have an account?</h1>
            <Link to={"/Login"} className='text-blue-500'>
           Login
          </Link>
           </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
