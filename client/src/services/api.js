import axios from 'axios';

// Create an instance of axios
const api = axios.create({
    baseURL: '/api', // The proxy will handle this
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor to include the token
api.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

// Authentication methods
export const login = (email, password) => api.post('/auth/login', { email, password });
export const register = (userData) => api.post('/auth/register', userData);
export const getMe = () => api.get('/auth/me');

// Student methods
export const getStudentsWithFaceData = async () => {
    const res = await api.get('/students');
    // Assuming your API returns { success: true, data: [...] }
    return res.data.data.filter(s => s.faceEmbedding && s.faceEmbedding.length > 0);
};

// Attendance methods
export const markAttendance = (rollNumber, scheduleId) => api.post('/attendance/mark', { rollNumber, scheduleId });


export default {
    login,
    register,
    getMe,
    getStudentsWithFaceData,
    markAttendance,
};
