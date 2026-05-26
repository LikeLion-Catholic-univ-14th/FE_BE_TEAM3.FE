 import axios from 'axios';
    
     const instance = axios.create({
       baseURL: import.meta.env.VITE_API_BASE_URL || 'https://fe-be-team-3-fe.vercel.app'
    });
    
     export default instance;