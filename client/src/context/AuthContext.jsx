import React, { createContext, useState, useContext, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            api.getMe().then(res => {
                setUser(res.data.data);
            }).catch(() => {
                localStorage.removeItem('token');
            }).finally(() => {
                setLoading(false);
            });
        } else {
            setLoading(false);
        }
    }, []);

    const login = async (email, password) => {
        const response = await api.login(email, password);
        localStorage.setItem('token', response.data.token);
        // After login, get user data
        const userResponse = await api.getMe();
        setUser(userResponse.data.data);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    const value = {
        user,
        login,
        logout,
        isAuthenticated: !!user,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
