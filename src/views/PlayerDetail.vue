<template>
  <div class="max-w-4xl mx-auto p-6 md:p-10">
    <button @click="$router.push('/')" class="text-amber-500 mb-8 font-bold hover:text-amber-400 transition-colors">
      ← 메인으로 돌아가기
    </button>
    
    <div v-if="loading" class="text-neutral-400 text-center py-20 text-xl font-bold">
      플레이어 데이터를 불러오는 중입니다...
    </div>
    
    <div v-else-if="errorMsg" class="bg-red-500/10 border border-red-500/50 rounded-xl p-8 text-center">
      <p class="text-red-400 text-lg font-bold">{{ errorMsg }}</p>
    </div>

    <div v-else-if="player" class="bg-neutral-900 border border-neutral-800 rounded-2xl p-8 shadow-2xl">
      <div class="border-b border-neutral-800 pb-6 mb-6 flex justify-between items-end">
        <div>
          <h2 class="text-4xl font-black text-white">{{ player.name }}</h2>
          <p class="text-neutral-500 mt-2 font-mono">Account ID: {{ player.accountId }}</p>
        </div>
        <div class="text-right">
          <p class="text-sm text-neutral-400">평생 전적 K/D</p>
          <p class="text-4xl font-black text-emerald-400">{{ player.recentKD }}</p>
        </div>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div class="bg-neutral-950 p-4 rounded-xl border border-neutral-800">
          <p class="text-sm text-neutral-500 mb-1">매치 플레이</p>
          <p class="text-xl font-bold text-white">{{ player.matchesPlayed }}<span class="text-sm text-neutral-500 ml-1">판</span></p>
        </div>
        <div class="bg-neutral-950 p-4 rounded-xl border border-neutral-800">
          <p class="text-sm text-neutral-500 mb-1">우승 (Wins)</p>
          <p class="text-xl font-bold text-amber-500">{{ player.wins }}<span class="text-sm text-amber-500/50 ml-1">회</span></p>
        </div>
        <div class="bg-neutral-950 p-4 rounded-xl border border-neutral-800">
          <p class="text-sm text-neutral-500 mb-1">총 입힌 데미지</p>
          <p class="text-xl font-bold text-sky-400">{{ Math.floor(player.totalDamage).toLocaleString() }}</p>
        </div>
        <div class="bg-neutral-950 p-4 rounded-xl border border-neutral-800">
          <p class="text-sm text-neutral-500 mb-1">현재 티어</p>
          <p class="text-xl font-bold text-neutral-300">{{ player.tier }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { fetchPlayer } from '../api/apiClient.js';

const route = useRoute();
const player = ref(null);
const loading = ref(true);
const errorMsg = ref('');

onMounted(async () => {
  try {
    const res = await fetchPlayer(route.params.name);
    player.value = res.data;
  } catch (error) {
    errorMsg.value = error.response?.data?.error || "전적을 불러오는 데 실패했습니다.";
  } finally {
    loading.value = false;
  }
});
</script>