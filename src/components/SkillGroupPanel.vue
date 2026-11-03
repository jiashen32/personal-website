<script setup lang="ts">
import type { SkillGroup } from '@/data/profile'

defineProps<{ group: SkillGroup }>()
</script>

<template>
  <div>
    <div class="flex items-baseline justify-between gap-4 border-b border-line pb-3">
      <h3 class="text-lg font-semibold tracking-tight">{{ group.label }}</h3>
      <span class="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-mute">{{ group.en }}</span>
    </div>

    <ul class="mt-5 space-y-4">
      <li
        v-for="item in group.items"
        :key="item.name"
        class="flex items-center justify-between gap-4"
      >
        <span class="text-sm text-ink-soft">{{ item.name }}</span>
        <span
          class="flex shrink-0 gap-1"
          role="img"
          :aria-label="`熟练度 ${item.level} / 5`"
        >
          <span
            v-for="step in 5"
            :key="step"
            class="h-1 w-3.5"
            :class="step <= item.level ? 'bg-accent' : 'bg-line'"
          ></span>
        </span>
      </li>
    </ul>
  </div>
</template>
