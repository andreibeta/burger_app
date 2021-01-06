import axios from 'axios';

const instance = axios.create({
    baseURL:'https://react-my-burger-b6392.firebaseio.com/'
});

export default instance;