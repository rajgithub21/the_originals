import React from 'react'
import { useState } from 'react';
import axios from 'axios'
import { backendUrl } from '../App';
import { toast } from 'react-toastify';

const Login = ({setToken}) => {
    const [email,setEmail]=useState('');
    const [password, setPassword] = useState('');
    const demoCredentials = {
      email: "admin_raj@gmail.com",
      password:"adminpassword_raj"
    };
    




    const onSubmitHandler=async(e)=>{
        try{
            e.preventDefault();
            const response=await axios.post(backendUrl+'/api/user/admin',{email,password});
            if(response.data.success){
                setToken(response.data.token);

            }else{
                toast.error(response.data.message)
            }
        }catch(err){
            console.log(err);
            toast.error(err.message);

        }
    }
    const fillDemoCredentials = () => {
      setEmail(demoCredentials.email);
      setPassword(demoCredentials.password);
    };
    const redirectToOriginals = () => {
      window.location.href = "https://the-originals-main.vercel.app/login";
    };

  return (
    <div className="flex items-center justify-center min-h-screen w-full">
      <div className="bg-white shadow-md rounded-lg px-8 py-6 max-w-md ">
        <h1 className="text-3xl font-bold mb-4">Admin Panel</h1>
        <form onSubmit={onSubmitHandler}>
          <div className="mb-3 min-w-80">
            <p className="text-sm font-medium text-gray-700 mb-2">
              Email Address
            </p>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="rounded w-full px-3 py-2 border border-gray-300 outline-none"
              type="email"
              placeholder="your@email.com"
              required
            />
          </div>
          <div className="mb-3 min-w-80">
            <p className="text-sm font-medium text-gray-700 mb-2">Password</p>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="rounded w-full px-3 py-2 border border-gray-300 outline-none"
              type="password"
              placeholder="password"
              required
            />
          </div>
          <button
            className="mt-2 w-full py-2 px-4 rounded-md text-white bg-black active:bg-gray-500"
            type="submit"
          >
            {" "}
            Login{" "}
          </button>
        </form>
        <button
          type="button"
          onClick={fillDemoCredentials}
          className="ml-16 text-xl mt-10 text-blue-500 underline "
        >
          Use Demo Credentials
        </button>
          <button
          type="button"
          onClick={redirectToOriginals}
          className="block mx-auto text-lg mt-4 text-purple-600 underline"
        >
          Go to Originals Login
        </button>
      </div>
    </div>
  );
}
export default Login;
