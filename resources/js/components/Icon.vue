<script setup lang="ts">
// An OmniaCSS webicon (mdi:, mdi-light:, material-symbols:, svg-spinners:, flag:, vscode-icons:), bundled by
// vite-icons.js: <Icon icon="mdi:cog-outline" />. Find names on omniaui.eu/ui/webicons.
// 1.25rem unless a class sizes it (h-1 w-1, oc-sidebar-menu-icon, …).
defineProps<{ icon: string }>();
</script>

<template>
    <iconify-icon :icon="icon" height="unset" aria-hidden="true" />
</template>
