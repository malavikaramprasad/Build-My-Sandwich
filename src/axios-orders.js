import axios from 'axios';

const instance = axios.create({
    baseURL:'https://build-my-sandwich.firebaseio.com/'
});

export default instance;