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
    <!-- Light / Dark / System as the OmniaUI segmented control (radio buttons, so arrow keys work). -->
    <div class="oc-segmented" role="radiogroup" aria-label="Appearance">
        <label
            v-for="{ value, icon, label } in tabs"
            :key="value"
            class="oc-segmented-item align-items-center gap-0.5 inline-flex"
        >
            <input
                type="radio"
                name="appearance"
                :value="value"
                :checked="appearance === value"
                @change="updateAppearance(value)"
            />
            <Icon :icon="icon" class="h-1 w-1" />
            {{ label }}
        </label>
    </div>
</template>
