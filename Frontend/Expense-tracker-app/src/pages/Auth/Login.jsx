import React, { useContext } from 'react';
import AuthLayout from '../../components/layouts/AuthLayout';
import Input from '../../components/Inputs/input';
import { useNavigate } from 'react-router-dom'; 
import { Link } from 'react-router-dom';
import { validateEmail } from '../../utils/helper'; // Import the email validation function
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { UserContext } from '../../context/UserContext';


const Login = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState(null);
  const { updateUser } = useContext(UserContext);
  // Handle login submission 
  const handleLogin = async (e) => {
    e.preventDefault();
    if(!validateEmail(email)){
      setError('Please enter a valid email address.');
      return;
    }
    if(!password){
      setError('Please enter your password.');
      return;
    }

    setError("");
    //Login API call
    try{
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });
      const {token, user} = response.data;
      console.log("Logged in user:", user);


      if(token){
        localStorage.setItem("token",token);
        updateUser(user);
        navigate("/dashboard");
      }
    }catch(error){
      if(error.response && error.response.data.message){
        setError(error.response.data.message);
      }
      else{
        setError("Something went wrong. Please try again");
      }
    }

    // Add login logic here
    console.log('Login attempted with email:', email);
  };
  const navigate = useNavigate(); 
  return (
    <AuthLayout>
      <div className="w-full md:w-[70%] h-full flex flex-col justify-center">
        <h3 className="text-xl font-serif text-black">Welcome Back</h3>
        <p className="text-xs text-slate-700 mt-1 mb-6">
          Please enter your details to log in.
        </p>
        <form onSubmit={handleLogin} >
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label="Email Address"
            placeholder="youremail@gmail.com"
            type="text"
          />
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label="Password"
            placeholder="Enter your password"
            type="password"
          /> 
          {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>} 
          <button type="submit" className="btn-primary">
            LOGIN</button>
          <p className="text-[13px] text-slate-800 mt-3">
            Don't have an account?{' '}
            <Link className="font-medium text-blue-400 underline" to="/signup">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default Login;
