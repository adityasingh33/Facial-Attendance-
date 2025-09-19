    import React from 'react';

const StatCard = ({ title, value, color = 'text-gray-800' }) => (
    <div className="bg-white rounded-xl shadow p-6 text-center">
        <p className="text-sm text-gray-500 font-medium">{title}</p>
        <p className={`text-4xl font-bold mt-1 ${color}`}>{value}</p>
    </div>
);

export default StatCard;
