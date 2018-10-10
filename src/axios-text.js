import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://texteditor-1679a.firebaseio.com/'
});

export default instance;