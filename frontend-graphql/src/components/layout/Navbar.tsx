import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { HomeIcon, UserIcon, BellIcon, PlusIcon, LogoutIcon } from '@heroicons/react/outline';

const Navbar: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  
  const handleLogout = () => {
    logout();
    navigate('/signin');
  };
  
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="text-primary-600 font-bold text-xl">
                SocialApp
              </Link>
            </div>
          </div>
          
          <div className="flex items-center">
            {isAuthenticated ? (
              <>
                <Link to="/" className="p-2 rounded-full text-gray-400 hover:text-primary-600 hover:bg-gray-100 mr-2">
                  <HomeIcon className="h-6 w-6" />
                </Link>
                
                <Link to="/create" className="p-2 rounded-full text-gray-400 hover:text-primary-600 hover:bg-gray-100 mr-2">
                  <PlusIcon className="h-6 w-6" />
                </Link>
                
                <div className="relative ml-3">
                  <div>
                    <button
                      onClick={() => setShowDropdown(!showDropdown)}
                      className="flex rounded-full bg-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      <span className="sr-only">Open user menu</span>
                      <div className="h-8 w-8 rounded-full flex items-center justify-center">
                        <UserIcon className="h-5 w-5 text-gray-500" />
                      </div>
                    </button>
                  </div>
                  
                  {showDropdown && (
                    <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Link
                        to={`/profile/${user?.id}`}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setShowDropdown(false)}
                      >
                        Profile
                      </Link>
                      <button
                        onClick={() => {
                          setShowDropdown(false);
                          handleLogout();
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Sign out
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex space-x-4">
                <Link
                  to="/signin"
                  className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="bg-primary-600 text-white hover:bg-primary-700 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;