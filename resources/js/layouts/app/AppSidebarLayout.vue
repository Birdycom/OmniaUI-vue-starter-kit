<script setup lang="ts">
import { Link, usePage } from '@inertiajs/vue3';
import Icon from '@/components/Icon.vue';
import { ref } from 'vue';
import AppLogo from '@/components/AppLogo.vue';
import AppNav from '@/components/AppNav.vue';
import Breadcrumbs from '@/components/Breadcrumbs.vue';
import { Toaster } from '@/components/ui/sonner';
import UserMenu from '@/components/UserMenu.vue';
import { dashboard } from '@/routes';
import type { BreadcrumbItem } from '@/types';

// OmniaUI app shell: sidebar + header bar + scrolling content. The checkbox collapses the sidebar to icons (CSS only,
// remembered in the sidebar_state cookie like the official kit); below 48rem the navigation opens in a sheet.
const { breadcrumbs = [] } = defineProps<{ breadcrumbs?: BreadcrumbItem[] }>();
const page = usePage();
const sheet = ref<HTMLDialogElement>();

const remember = (event: Event) => {
    document.cookie = `sidebar_state=${!(event.target as HTMLInputElement).checked}; path=/; max-age=${60 * 60 * 24 * 7}`;
};
</script>

<template>
    <div class="oc-block-shell">
        <input
            id="app-sidebar-toggle"
            class="oc-block-shell-toggle"
            type="checkbox"
            aria-label="Collapse sidebar"
            :checked="page.props.sidebarOpen === false"
            @change="remember"
        />

        <aside class="oc-sidebar" aria-label="Main navigation">
            <div class="oc-sidebar-header">
                <Link
                    class="oc-sidebar-menu-button oc-sidebar-menu-button--lg"
                    :href="dashboard()"
                    prefetch
                    ><AppLogo
                /></Link>
            </div>
            <div class="oc-sidebar-content"><AppNav /></div>
            <div class="oc-sidebar-footer">
                <UserMenu id="user-menu-sidebar" />
            </div>
        </aside>

        <div class="oc-block-shell-main">
            <header class="oc-block-appbar">
                <button
                    class="oc-btn oc-btn--ghost oc-btn--icon oc-block-shell-menu-button"
                    type="button"
                    aria-label="Open menu"
                    @click="sheet?.showModal()"
                >
                    <Icon icon="mdi:menu" />
                </button>
                <label
                    class="oc-btn oc-btn--ghost oc-btn--icon app-collapse"
                    for="app-sidebar-toggle"
                    title="Collapse sidebar"
                >
                    <Icon icon="mdi:menu" /><span class="oc-visually-hidden"
                        >Collapse sidebar</span
                    >
                </label>
                <Breadcrumbs :breadcrumbs="breadcrumbs" />
                <div class="oc-block-appbar-actions app-mobile-only">
                    <UserMenu id="user-menu-appbar" compact />
                </div>
            </header>

            <main class="oc-block-shell-content"><slot /></main>
        </div>

        <dialog
            ref="sheet"
            class="oc-sheet oc-sheet--left"
            closedby="any"
            :aria-label="page.props.name"
        >
            <div class="oc-sheet-content">
                <button
                    class="oc-sheet-close"
                    type="button"
                    aria-label="Close"
                    @click="sheet?.close()"
                >
                    &times;
                </button>
                <div class="oc-sheet-header">
                    <h2 class="oc-sheet-title">{{ page.props.name }}</h2>
                </div>
                <nav
                    class="oc-sidebar app-sheet-nav"
                    aria-label="Main navigation"
                    @click="sheet?.close()"
                >
                    <div class="oc-sidebar-content"><AppNav /></div>
                </nav>
            </div>
        </dialog>

        <Toaster />
    </div>
</template>
