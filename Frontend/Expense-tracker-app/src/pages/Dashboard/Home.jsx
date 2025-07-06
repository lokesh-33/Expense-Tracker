import React, { useState, useEffect } from 'react'; // Combine useState and useEffect
import DashboardLayout from '../../components/layouts/DashboardLayout';
import useUserAuth from '../../hooks/useUserAuth';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { useNavigate } from 'react-router-dom';
import InfoCard from '../../components/Cards/InfoCard'; // Correct path to InfoCard
import { LuHandCoins, LuWalletMinimal } from 'react-icons/lu'; // Import icons from lucide-react (if LuWalletMinimal is from there)
import { IoMdCard } from "react-icons/io"; // Import icon from react-icons/io
import { addThousandSeparator } from '../../utils/helper'; // Import the utility function
import RecentTransactions from '../../components/Dashboard/RecentTransactions';
import FinanceOverview from '../../components/Dashboard/FinanceOverview';
import ExpenseTransactions from '../../components/Dashboard/ExpenseTransactions';
import Last30DaysExpense from '../../components/Dashboard/Last30DaysExpense';
const Home = () => {
  useUserAuth();
  const navigate = useNavigate(); // For programmatic navigation

  // State to store dashboard data
  const [dashboardData, setDashBoardData] = useState(null);
  // State to manage loading status for API call
  const [loading, setLoading] = useState(false);

  // Function to fetch dashboard data from the backend
  const fetchDashboardData = async () => {
    if (loading) return; // Prevent multiple API calls if one is already in progress
    setLoading(true); // Set loading to true before fetching

    try {
      const response = await axiosInstance.get(
        `${API_PATHS.DASHBOARD.GET_DATA}` // API endpoint for dashboard data
      );
      if (response.data) {
        setDashBoardData(response.data); // Update state with fetched data
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error); // Log detailed error
      // TODO: Implement user-friendly error feedback (e.g., toast notification)
    } finally {
      setLoading(false); // Set loading to false after fetch (success or failure)
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (loading && !dashboardData) {
      return (
          <DashboardLayout activeMenu="Dashboard">
              <div className='my-5 mx-auto'>
                  <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                      {/* Placeholder/skeleton cards while loading */}
                      <InfoCard icon={<IoMdCard />} label="Total Balance" value="Loading..." color="bg-gray-400" />
                      <InfoCard icon={<LuHandCoins />} label="Total Income" value="Loading..." color="bg-gray-400" />
                      <InfoCard icon={<IoMdCard />} label="Total Expense" value="Loading..." color="bg-gray-400" />
                  </div>
              </div>
          </DashboardLayout>
      );
  }

  return (
    <DashboardLayout activeMenu="Dashboard">
      <div className='my-5 mx-auto'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          <InfoCard
            icon={<LuWalletMinimal />} // Suggestion: Use a wallet icon for balance
            label="Total Balance"
            value={addThousandSeparator(dashboardData?.totalBalance || 0)}
            color="bg-violet-500"
          />
          <InfoCard
            icon={<LuHandCoins />} // Suggestion: Use a hand-coins icon for income
            label="Total Income"
            value={addThousandSeparator(dashboardData?.totalIncome || 0)}
            color="bg-green-500"
          />
          <InfoCard
            icon={<IoMdCard />} // Suggestion: Use a different icon for expense if available
            label="Total Expense"
            value={addThousandSeparator(dashboardData?.totalExpense || 0)}
            color="bg-red-500"
          />
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-6'>
          <RecentTransactions
            transactions={dashboardData?.recentTransactions}
            onSeeMore={()=>(navigate("/expense"))}
          />

        <FinanceOverview
          totalBalance={dashboardData?.totalBalance || 0}
          totalIncome={dashboardData?.totalIncome || 0}
          totalExpense={dashboardData?.totalExpense || 0}
        />
        <ExpenseTransactions
         transactions={dashboardData?.last30DaysExpense?.transactions || []}
         onSeeMore={() => navigate("/expense")}
        />
        <Last30DaysExpense
          data={dashboardData?.last30DaysExpense?.transactions || []}
        />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Home;