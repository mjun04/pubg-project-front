import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAppStore = defineStore('app', () => {
  const currentMap = ref('전체');
  const searchHistory = ref(JSON.parse(localStorage.getItem('searchHistory')) || []);

  const setMap = (mapName) => { currentMap.value = mapName; };
  
  const addSearchHistory = (name) => {
    if (!searchHistory.value.includes(name)) {
      searchHistory.value.unshift(name);
      if (searchHistory.value.length > 5) searchHistory.value.pop();
      localStorage.setItem('searchHistory', JSON.stringify(searchHistory.value));
    }
  };

  return { currentMap, searchHistory, setMap, addSearchHistory };
});