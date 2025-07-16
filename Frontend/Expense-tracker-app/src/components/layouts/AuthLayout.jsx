import React from 'react';
import Card2 from '../../assets/images/card2.png';
import { LuTrendingUpDown } from "react-icons/lu";

const AuthLayout = ({ children }) => {
  return (
    <div className="flex w-screen h-screen">
      {/* Left Side - Login Form */}
      <div className="w-full md:w-[60vw] px-12 py-8 flex flex-col justify-center">
        <h2 className="text-lg font-medium text-black">Expense Tracker</h2>
        {children}
      </div>

      {/* Right Side - Background Illustration */}
      <div className="hidden md:block w-[40vw] h-screen bg-violet-50 relative overflow-hidden p-8">
        <div className="w-48 h-48 rounded-[40px] bg-purple-600 absolute -top-7 left-5" />
        <div className="w-48 h-56 rounded-[40px] border-[20px] border-fuchsia-600 absolute top-[30%] -right-10" />
        <div className="w-48 h-48 rounded-[40px] bg-violet-500 absolute -bottom-7 -left-5" />

        <div className="grid grid-cols-1 z-20">
            <StatsInfoCard 
              icon={<LuTrendingUpDown className="text-white" />}
              label="Track your income & Expenses"
              value="43,000"
              color="bg-purple-600"
            />
        </div>


        <img
          src={Card2}
          alt="Card Illustration"
          className="w-64 lg:w-[90%] absolute bottom-10 shadow-lg shadow-blue-400/15 rounded-full"
        />
      </div>
    </div>
  );
};

export default AuthLayout;
const StatsInfoCard = ({icon, label, value, color}) => (
  <div className="flex gap-6 bg-white p-4 rounded-xl shadow-md shadow-purple-400/10 border border-gray-200/50 z-10">
    <div 
      className={`w-12 h-12 flex items-center justify-center text-[26px] ${color} rounded-full drop-shadow-xl`}
    >
      {icon}
    </div>
    <div>
      <h6 className="text-xs text-gray-500 mb-1">{label}</h6>
      <span className="text-[20px] text-gray-500 ">{value}</span>
    </div>
  </div>
);
