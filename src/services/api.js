import axios from 'axios';

const apiCodeBurguer = axios.create({
  baseURL: 'http://localhost:3030'
});

apiCodeBurguer.interceptors.request.use(async config => {
  const userData = await localStorage.getItem('codeburguer:userData');
  const token = userData && JSON.parse(userData).token; // Se tiver algo no localStorage a aplicação irá pegar e parsear, se nã, então não irá parserar nada
  config.headers.Authorization = `Bearer ${token}`;

  return config;
});

export default apiCodeBurguer;
