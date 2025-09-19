import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const Layout = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-7xl h-[90vh] bg-white rounded-2xl shadow-2xl flex">
        <Sidebar />
        <main className="flex-grow p-8 overflow-y-auto">
          <Outlet /> {/* Child routes will render here */}
        </main>
      </div>
    </div>
  );
};

export default Layout;
