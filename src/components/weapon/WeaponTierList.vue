<template>
  <div class="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden mb-8 shadow-xl">
    <div class="px-6 py-4 bg-neutral-950 border-b border-neutral-800 flex justify-between items-center">
      <h2 class="text-xl font-bold text-white">👑 메타 티어표</h2>
      <span class="text-xs text-neutral-500">픽률 및 K/D 기반</span>
    </div>
    <div class="divide-y divide-neutral-800">
      <div v-for="tier in tierList" :key="tier.grade" class="flex min-h-[70px]">
        <div :class="['w-20 flex items-center justify-center font-black text-2xl border-r border-neutral-800', tier.color]">
          {{ tier.grade }}
        </div>
        <div class="flex-1 p-4 flex flex-wrap gap-3 bg-neutral-900/50">
          <div v-for="w in tier.weapons" :key="w.id" class="px-3 py-2 bg-neutral-800 border border-neutral-700 hover:border-amber-500/50 transition-colors rounded-lg text-neutral-200 font-bold flex items-center text-sm">
            {{ w.name }} <span class="ml-2 text-xs text-amber-500 font-mono">{{ w.metaScore.toFixed(1) }}</span>
          </div>
          <div v-if="tier.weapons.length === 0" class="text-neutral-600 text-sm flex items-center px-2 italic">무기 없음</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({ weapons: { type: Array, default: () => [] } });

const tierConfig = [
  { grade: 'S', color: 'text-red-500 bg-red-500/10' },
  { grade: 'A', color: 'text-amber-500 bg-amber-500/10' },
  { grade: 'B', color: 'text-emerald-500 bg-emerald-500/10' },
  { grade: 'C', color: 'text-sky-500 bg-sky-500/10' }
];

const tierList = computed(() => {
  const scored = props.weapons.map(w => ({
    ...w, metaScore: (w.pickRate * 1.5) + (w.avgKD * 10)
  })).sort((a, b) => b.metaScore - a.metaScore);

  const tiers = tierConfig.map(t => ({ ...t, weapons: [] }));
  scored.forEach((w, idx) => {
    const p = idx / scored.length;
    if (p <= 0.15) tiers[0].weapons.push(w);
    else if (p <= 0.4) tiers[1].weapons.push(w);
    else if (p <= 0.7) tiers[2].weapons.push(w);
    else tiers[3].weapons.push(w);
  });
  return tiers;
});
</script>