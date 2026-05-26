 import axios from 'axios';
    
     const instance = axios.create({
       baseURL: import.meta.env.VITE_API_BASE_URL || 'http://13.125.91.73:8080'
    });
    
     export default instance;