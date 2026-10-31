<script setup lang="ts">
import { usePage } from '@inertiajs/vue3';
import AppLogoIcon from '@/components/AppLogoIcon.vue';

const name = usePage().props.name;
</script>

<template>
    <span class="app-brand-mark"><AppLogoIcon /></span>
    <span class="oc-sidebar-menu-label font-semibold">{{ name }}</span>
</template>
