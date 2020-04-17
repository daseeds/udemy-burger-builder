import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://udemy-burger-builder-d11c5.firebaseio.com/'
});

export default instance;