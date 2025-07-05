import React, { useContext, useState } from 'react'
import AuthLayout from '../../components/layouts/AuthLayout';
import Input from '../../components/Inputs/input';
import { useNavigate } from 'react-router-dom'; 
import { Link } from 'react-router-dom';
import { validateEmail } from '../../utils/helper'; // Import the email validation function
import ProfilePhotoSelector from '../../components/Inputs/ProfilePhotoSelector'; // Import the ProfilePhotoSelector component
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { UserContext } from '../../context/UserContext';
import uploadImage from '../../utils/uploadImage';

const SignUp = () => {
  const [profilePic, setProfilePic] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const {updateUser} = useContext(UserContext);
  const navigate = useNavigate();

  // Handle signup submission
  const handleSignUp = async (e) => {
    e.preventDefault();

    let profileImageUrl ="";
    if(!fullName){
      setError("Full name is required");
      return; 
    }
    if(!validateEmail(email)){
      setError("Please enter a valid email address");
      return; 
    }
    if(!password){
      setError("Password is required");
      return; 
    }

    setError(null);

    //Sign up API call
    try{

      //upload image if present
      if(profilePic){
        const imgUploadRes = await uploadImage(profilePic);
        profileImageUrl = imgUploadRes.imageUrl || "";
      }
      const respose = await axiosInstance.post(API_PATHS.AUTH.REGISTER,{
        fullName,
        email,
        password,
        profileImageUrl,
      });
      const {token, user} = respose.data;
      if(token){
        localStorage.setItem("token",token);
        updateUser(user);
        navigate("/dashboard");
      }
    } catch(error){
      if(error.respose && error.respose.data.message){
        setError(error.response.data.message);
      } else{
        setError("Something went wrong");
      }
    }
  };



  return (
    <div>
      <AuthLayout>
        <div className="lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center">
          <h3 className="text-xl font-semibold text-black ">Create an Account</h3>
          <p className="text-xs text-slate-700 mt[5px] mb-6">
            Join us today by entering your details below.
          </p>
          <form onSubmit={handleSignUp}>
            <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <Input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                label="Full Name"
                placeholder="Enter your full name"
                type="text"
              />
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                label="Email Address"
                placeholder="Enter your email"
                type="text"
              />

              <div className='col-span-2'>
                <Input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  label="Password"
                  placeholder="Enter your password"
                  type="password"
                />
              </div> 
            </div>
            {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}
            <button type="submit" className="btn-primary">
              SIGN UP 
              </button>
              <p className="text-[13px] text-slate-800 mt-3">
                Already have an account?{" "}
                <Link className='font-medium text-primary underline' to="/login">
                  Login
                </Link>
              </p>
          </form>
        </div>
      </AuthLayout>
    
    </div>
  )
}

export default SignUp