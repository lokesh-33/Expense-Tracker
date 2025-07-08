import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { useInView } from 'react-intersection-observer';

const CustomBarChart = ({ data }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });
  const [animate, setAnimate] = useState(false);

  // Trigger animation when chart comes into view
  React.useEffect(() => {
    if (inView) setAnimate(true);
  }, [inView]);

  const getBarColor = (index) => {
    return index % 2 === 0 ? '#875cf5' : '#cfbefb';
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white shadow-md rounded-lg p-2 border border-gray-300">
          <p className="text-xs font-semibold text-purple-800 mb-1">
            {payload[0].payload.category}
          </p>
          <p className="text-sm text-gray-600">
            Amount:{' '}
            <span className="text-sm font-medium text-gray-900">
              ₹{Number(payload[0].payload.amount).toLocaleString()}
            </span>
          </p>
        </div>
      );
    }
    return null;
  };
  console.log("Chart Data:", data);


  return (
    <div
      ref={ref}
      className="bg-white mt-6 relative z-10 overflow-visible"
    >
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid stroke="none" />
          <XAxis
            dataKey="category"
            tick={{ fontSize: 12, fill: '#555' }}
            stroke="none"
          />
          <YAxis
            tick={{ fontSize: 12, fill: '#555' }}
            stroke="none"
          />
          <Tooltip content={<CustomTooltip />} wrapperStyle={{ zIndex: 50 }} />
          <Bar
            dataKey="amount"
            isAnimationActive={animate}
            animationBegin={0}
            animationDuration={1000}
            animationEasing="ease-out"
            radius={[10, 10, 0, 0]}
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={getBarColor(index)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomBarChart;
