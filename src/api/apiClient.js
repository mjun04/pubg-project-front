import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://pubg-project.onrender.com/api', // 백엔드 주소
  headers: { 'Content-Type': 'application/json' }
});

export const fetchWeapons = (mapName) => apiClient.get('/weapons', { 
  params: { map: mapName } 
});

export const fetchPlayer = (playerName) => apiClient.get(`/players/${playerName}`);