import axios from 'axios';

const instance = axios.create({
    baseURL: '/api/places/'
});

export default instance;