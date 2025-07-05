import React from 'react';
import {
  LuUtensils,
  LuTrendingUp,
  LuTrash2,
  LuTrendingDown
} from "react-icons/lu";

const TransactionInfoCard = ({
  title,
  icon,
  date,
  amount,
  type,
  hideDelBtn,
  onDelete
}) => {
  return (
    <div className="group relative flex items-center justify-between gap-4 mt-2 p-3 rounded-lg hover:bg-gray-100 transition-all">
      
      {/* Icon */}
      <div className="w-12 h-12 flex items-center justify-center text-xl text-gray-800 bg-gray-100 rounded-full">
        {icon ? (
          <img src={icon} alt={title} className="w-6 h-6" />
        ) : (
          <LuUtensils />
        )}
      </div>

      {/* Title and Date */}
      <div className="flex-1">
        <p className="text-sm font-medium">{title}</p>
        <p className="text-xs text-gray-500">{date}</p>
      </div>

      {/* Amount and Delete Icon */}
      <div className="flex items-center gap-3">
        <div
          className={`flex items-center gap-1 px-2 py-1 rounded-md text-sm font-semibold min-w-fit
            ${type === "income" ? "text-green-600" : "text-red-500"}`}
        >
          {type === 'income' ? "+" : "-"} ₹{amount}
          {type === "income" ? <LuTrendingUp /> : <LuTrendingDown />}
        </div>

        {!hideDelBtn && (
          <button
            onClick={onDelete}
            className="text-red-500 hover:text-white hover:bg-red-500 transition-colors p-1 rounded-full flex items-center justify-center h-6 w-6"
          >
            <LuTrash2 size={16} />
          </button>
        )}
      </div>
    </div>
  );
};

export default TransactionInfoCard;
