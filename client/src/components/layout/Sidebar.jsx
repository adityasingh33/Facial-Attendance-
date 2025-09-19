import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Sidebar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const baseLinkClass = "w-full text-left px-4 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center";
    const activeLinkClass = "bg-blue-600 text-white shadow-md";
    const inactiveLinkClass = "text-gray-600 hover:bg-gray-100";

    const studentLinks = [ { name: 'Dashboard', path: '/' }, ];
    const teacherLinks = [
        { name: 'Dashboard', path: '/' },
        { name: 'Scan Attendance', path: '/scan' },
    ];
    const links = user?.role === 'student' ? studentLinks : teacherLinks;

    return (
        <div className="w-64 bg-white p-6 flex flex-col h-full rounded-l-2xl border-r border-gray-200">
            <h1 className="text-2xl font-bold text-gray-800 mb-10">Smart System</h1>
            <nav className="flex-grow">
                <ul>
                    {links.map(link => (
                        <li key={link.path} className="mb-4">
                            <NavLink
                                to={link.path}
                                end
                                className={({ isActive }) => `${baseLinkClass} ${isActive ? activeLinkClass : inactiveLinkClass}`}
                            >
                                {link.name}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>
            <div>
                <button
                    onClick={handleLogout}
                    className={`${baseLinkClass} ${inactiveLinkClass}`}
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
