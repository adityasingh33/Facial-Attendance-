import React from 'react';
import StatCard from '../components/common/StatCard';
import { useAuth } from '../context/AuthContext';

const TeacherDashboard = () => {
    const { user } = useAuth();
    // In a real app, you would fetch this data
    const MOCK_STUDENTS_LIST = [
        { _id: 's1', name: 'James Smith', rollNumber: '101', status: 'Present', time: '9:05 AM' },
        { _id: 's2', name: 'Emily Johnson', rollNumber: '102', status: 'Absent', time: '9:10 AM' },
    ];

    return (
        <div>
            <h2 className="text-3xl font-bold text-gray-800">Hello, {user?.name?.split(' ')[0] || 'Teacher'}</h2>
            <p className="text-gray-500 mb-8">Here are today's quick stats.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <StatCard title="Total Students" value="150" />
                <StatCard title="Present Today" value="130" color="text-green-500" />
                <StatCard title="Absent Today" value="20" color="text-red-500" />
            </div>
            <div className="bg-white p-6 rounded-2xl shadow">
                <h3 className="font-bold text-lg mb-4">Recent Attendance Records</h3>
                <table className="w-full text-left">
                    <thead><tr className="border-b"><th className="py-2">Name</th><th>Roll No</th><th>Status</th><th>Time</th></tr></thead>
                    <tbody>
                        {MOCK_STUDENTS_LIST.map(student => (
                            <tr key={student._id} className="border-b">
                                <td className="py-3">{student.name}</td><td>{student.rollNumber}</td>
                                <td><span className={student.status === 'Present' ? 'text-green-500' : 'text-red-500'}>{student.status}</span></td>
                                <td>{student.time}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TeacherDashboard;

