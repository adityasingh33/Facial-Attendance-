import React from 'react';
import { useAuth } from '../context/AuthContext';

const StudentDashboard = () => {
    const { user } = useAuth();

    return (
        <div>
            <h2 className="text-3xl font-bold text-gray-800">Hello, {user?.name.split(' ')[0]}</h2>
            <p className="text-gray-500 mb-8">Here is your attendance summary.</p>
            {/* Rest of the UI */}
            <div className="text-center mt-10 p-10 border-2 border-dashed rounded-lg">
                <h3 className="text-xl font-semibold text-gray-700">Student Dashboard Content</h3>
                <p className="text-gray-500 mt-2">More student-specific components can be added here.</p>
            </div>
        </div>
    );
};

export default StudentDashboard;
