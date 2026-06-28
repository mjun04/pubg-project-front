import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://pubg-project.onrender.com', // 백엔드 주소
  headers: { 'Content-Type': 'application/json' }
});

export const fetchWeapons = (mapName) => apiClient.get(`/weapons?map=${mapName}`);
export const fetchPlayer = (playerName) => apiClient.get(`/players/${playerName}`);