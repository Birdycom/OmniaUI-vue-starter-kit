<script setup lang="ts">
import { Link } from '@inertiajs/vue3';
import AppLogo from '@/components/AppLogo.vue';
import Breadcrumbs from '@/components/Breadcrumbs.vue';
import { Toaster } from '@/components/ui/sonner';
import UserMenu from '@/components/UserMenu.vue';
import { useCurrentUrl } from '@/composables/useCurrentUrl';
import { dashboard } from '@/routes';
import type { BreadcrumbItem } from '@/types';

// Alternative layout: navigation in a top bar. Use it in layouts/AppLayout.vue instead of the sidebar layout.
const { breadcrumbs = [] } = defineProps<{ breadcrumbs?: BreadcrumbItem[] }>();
const { isCurrentUrl } = useCurrentUrl();
</script>

<template>
    <header class="oc-block-appbar app-topbar">
        <Link class="app-brand" :href="dashboard()" prefetch><AppLogo /></Link>
        <nav class="oc-block-appbar-nav" aria-label="Main navigation">
            <ul class="oc-navmenu">
                <li>
                    <Link class="oc-navmenu-link" :href="dashboard()" :aria-current="isCurrentUrl(dashboard()) ? 'page' : undefined" prefetch>Dashboard</Link>
                </li>
            </ul>
        </nav>
        <div class="oc-block-appbar-actions"><UserMenu id="user-menu-header" compact /></div>
    </header>
    <main class="app-page">
        <Breadcrumbs :breadcrumbs="breadcrumbs" />
        <slot />
    </main>
    <Toaster />
</template>
