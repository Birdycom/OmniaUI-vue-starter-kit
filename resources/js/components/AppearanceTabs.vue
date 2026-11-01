<script setup lang="ts">
import Icon from '@/components/Icon.vue';
import { useAppearance } from '@/composables/useAppearance';

const { appearance, updateAppearance } = useAppearance();

const tabs = [
    { value: 'light', icon: 'mdi:white-balance-sunny', label: 'Light' },
    { value: 'dark', icon: 'mdi:weather-night', label: 'Dark' },
    { value: 'system', icon: 'mdi:monitor', label: 'System' },
] as const;
</script>

<template>
    <div
        class="gap-0.2 rounded-lg bg-linen-20 p-0.2 dark:bg-neutral-800 inline-flex"
    >
        <button
            v-for="{ value, icon, label } in tabs"
            :key="value"
            @click="updateAppearance(value)"
            :class="[
                'align-items-center round-3 p-inline-0.8 p-block-0.3 flex transition-colors',
                appearance === value
                    ? 'bg-white shadow-xs dark:bg-neutral-700 dark:text-neutral-100'
                    : 'text-black-2 hover:bg-neutral-200/60 hover:text-black dark:text-neutral-400 dark:hover:bg-neutral-700/60',
            ]"
        >
            <Icon :icon="icon" class="-ml-1 h-1 w-1" />
            <span class="ml-0.3 font-0.8">{{ label }}</span>
        </button>
    </div>
</template>
