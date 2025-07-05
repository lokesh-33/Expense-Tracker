import React from 'react';
import { LuArrowRight } from 'react-icons/lu';
import TransactionInfoCard from '../Cards/TransactionInfoCard';
import moment from 'moment'; // Make sure this is installed via npm

const ExpenseTransactions = ({ transactions = [], onSeeMore }) => {
  return (
    <div className='card'>
      <div className='flex items-center justify-between'>
        <h5 className='text-lg'>Expenses</h5>

        <button className='card-btn flex items-center gap-1' onClick={onSeeMore}>
          See All <LuArrowRight className='text-base' />
        </button>
      </div>

      <div className='mt-6 space-y-4'>
        {transactions.length === 0 ? (
          <p className='text-sm text-gray-500 text-center'>No expenses to show.</p>
        ) : (
          transactions.slice(0, 5).map((expense) => (
            <TransactionInfoCard
              key={expense._id}
              title={expense.category}
              icon={expense.icon}
              date={moment(expense.date).format('Do MMM YYYY')}
              amount={expense.amount}
              type='expense'
              hideDelBtn
            />
          ))
        )}
      </div>
    </div>
  );
};

export default ExpenseTransactions;
