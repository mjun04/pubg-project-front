<template>
  <div class="max-w-7xl mx-auto p-6 md:p-10">
    <header class="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-6">
      <div>
        <h1 class="text-4xl font-black text-amber-500 tracking-tighter uppercase">METAMETER</h1>
        <p class="text-neutral-400 mt-1 font-medium">배그 무기 티어 & 실시간 K/D 분석</p>
      </div>
      <div class="relative w-full md:w-80">
        <input v-model="searchQ" @keyup.enter="search" type="text" placeholder="플레이어 닉네임 검색..." 
          class="w-full bg-neutral-900 border border-neutral-800 rounded-lg py-3 px-4 text-white focus:border-amber-500 outline-none transition-colors">
      </div>
    </header>

    <main>
      <div class="flex gap-3 mb-6 border-b border-neutral-800 pb-4 overflow-x-auto">
        <button v-for="map in ['전체', 'Erangel', 'Miramar', 'Taego', 'Rondo', 'Sanhok', 'Vikendi', 'Deston']" :key="map" @click="appStore.setMap(map)"
          :class="['px-6 py-2 rounded-full font-bold whitespace-nowrap transition-colors', appStore.currentMap === map ? 'bg-amber-500 text-neutral-950' : 'bg-neutral-800 text-neutral-400 hover:bg-neutral-700']">
          {{ map }}
        </button>
      </div>

      <div class="mb-8 relative max-w-md">
        <input v-model="weaponSearch" type="text" placeholder="총기 이름으로 빠르게 찾기 (예: 베릴, M416)" 
          class="w-full bg-neutral-900 border border-neutral-800 rounded-lg py-3 px-4 text-white focus:border-amber-500 outline-none transition-colors">
      </div>

      <WeaponTierList :weapons="filteredWeapons" v-if="filteredWeapons.length > 0" />
      <div v-else class="text-center py-20 text-neutral-500 font-bold text-lg">"{{ weaponSearch }}" 검색 결과가 없습니다.</div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" v-if="filteredWeapons.length > 0">
        <div v-for="(w, idx) in filteredWeapons" :key="w.id" class="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-lg hover:border-amber-500/50 transition-colors">
          <div class="flex justify-between items-start mb-4">
            <h2 class="text-2xl font-extrabold text-white flex items-center gap-2">
              <span class="text-amber-500">#{{ idx + 1 }}</span> {{ w.name }}
            </h2>
            <div class="text-right">
              <p class="text-xs text-neutral-500">선택률</p>
              <p class="text-xl font-mono font-bold text-emerald-400">{{ w.pickRate }}%</p>
            </div>
          </div>
          <div class="flex gap-4 mb-5 bg-neutral-950 p-3 rounded-xl border border-neutral-800/50">
            <div class="flex-1 text-center border-r border-neutral-800">
              <p class="text-xs text-neutral-500 mb-1">평균 순위</p>
              <p class="text-lg font-bold text-white">Top {{ w.avgRank }}</p>
            </div>
            <div class="flex-1 text-center">
              <p class="text-xs text-neutral-500 mb-1">평균 K/D</p>
              <p class="text-lg font-bold text-sky-400">{{ w.avgKD }}</p>
            </div>
          </div>
          <div>
            <h3 class="text-sm font-bold text-neutral-400 mb-3">최고 효율 파츠 조합</h3>
            <ul class="space-y-2">
              <li v-for="part in w.topAttachments" :key="part.name" class="flex justify-between items-center bg-neutral-800/50 p-3 rounded-lg">
                <span class="font-medium text-neutral-200 text-sm">{{ part.name }}</span>
              
              </li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { fetchWeapons } from '../api/apiClient.js';
import { useAppStore } from '../store/useAppStore.js';
import WeaponTierList from '../components/weapon/WeaponTierList.vue';
const router = useRouter();
const appStore = useAppStore();

const searchQ = ref('');
const weaponSearch = ref('');
const weapons = ref([]);

// 실시간 무기 검색 필터링 로직
const filteredWeapons = computed(() => {
  if (!weaponSearch.value) return weapons.value;
  const keyword = weaponSearch.value.toLowerCase().replace(/\s+/g, '');
  return weapons.value.filter(w => w.name.toLowerCase().replace(/\s+/g, '').includes(keyword));
});

const loadData = async () => {
  try {
    const res = await fetchWeapons(appStore.currentMap);
    weapons.value = res.data;
    weaponSearch.value = '';
  } catch(e) {
    console.error(e);
  }
};

onMounted(loadData);
watch(() => appStore.currentMap, loadData);

const search = () => {
  if (searchQ.value.trim()) {
    appStore.addSearchHistory(searchQ.value.trim());
    router.push(`/player/${searchQ.value.trim()}`);
  }
};
</script>