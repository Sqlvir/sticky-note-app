import React, { useState } from 'react'
//import Navbar from '../../components/Navbar/Navbar'
import {Link, useNavigate} from 'react-router-dom'
import PasswordInput from '../../components/Input/PasswordInput'
import { validateEmail } from '../../utils/helper'
import Logo from '../../assets/sticky-notes.png';
import axiosInstance from '../../utils/axiosInstance';


const login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
     e.preventDefault();

     if(!validateEmail(email))
      {
         setError("Please enter a valid email address.");
         return;
      } 

      if(!password) {
        setError("Please enter the password");
        return;
      }

      setError("");

      //Login API call

      try {
         const response = await axiosInstance.post("/login", {
             email: email,
             password: password,
         });

         if(response.data && response.data.accessToken){
          localStorage.setItem("token", response.data.accessToken);
          navigate("/stickynote");
         }
      } catch (error) {
         if (error.response && error.response.data && error.response.data.message){
          setError(error.response.data.message);
         } else {
          setError("An unexpected error occurred. Please try again.");
         }
      }
  };

  return (
    <>
      {/*<Navbar />*/}

      <div className='flex item-center justify-center mt-48'>
        <div className='w-96 border rounded bg-white px-7 py-10 login-box'>
          <form onSubmit={handleLogin} className='form-style'>
          <h2 className='text-xl font-medium text-black item-center justify-center py-2'><span>Sticky</span> <img src={Logo} /></h2>
          <h4 className='text-2xl mb-7 text-center'>Welcome to LogIn</h4>
            <input
               type="text"
               placeholder="Email"
               className="input-box"
               data-testid="email-input"
               value={email}
               onChange={(e) => setEmail(e.target.value)}
            />
            
            <PasswordInput 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {error && <p className='text-red-500 text-xs pb-1'>{error}</p>}

            <button type='submit' className='btn-primary signin-button'>SignIn</button>
              
            <p className='text-sm text-center mt-4'>
              Not yet registered?{" "}
              <Link to="/signup" className='font-medium text-primary underline signup-text'>Create Account</Link>
            </p>
          
          </form>
        </div>
      </div>
    </>
  )
}

export default login
