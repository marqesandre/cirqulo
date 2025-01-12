import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', crimeRate: 400 },
  { name: 'Feb', crimeRate: 300 },
  { name: 'Mar', crimeRate: 200 },
  { name: 'Apr', crimeRate: 278 },
  { name: 'May', crimeRate: 189 },
  { name: 'Jun', crimeRate: 239 },
  { name: 'Jul', crimeRate: 349 },
  { name: 'Aug', crimeRate: 200 },
  { name: 'Sep', crimeRate: 300 },
  { name: 'Oct', crimeRate: 400 },
  { name: 'Nov', crimeRate: 500 },
  { name: 'Dec', crimeRate: 600 },
];

const ViolenceChart = () => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="crimeRate" stroke="#8884d8" activeDot={{ r: 8 }} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default ViolenceChart;