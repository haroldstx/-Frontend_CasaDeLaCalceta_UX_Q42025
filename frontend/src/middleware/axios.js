import axios from "axios";

// Use relative baseURL so frontend served from backend uses same-origin requests
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || '',
    //
});

export default api;
