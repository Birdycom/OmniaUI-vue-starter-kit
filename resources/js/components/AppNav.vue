<script setup lang="ts">
import { Link } from '@inertiajs/vue3';
import Icon from '@/components/Icon.vue';
import { useCurrentUrl } from '@/composables/useCurrentUrl';
import { toUrl } from '@/lib/utils';
import { dashboard } from '@/routes';
import type { NavItem } from '@/types';

// The navigation of the app: used by the sidebar, the mobile sheet and the header layout. Add items here.
const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: 'mdi:view-dashboard-outline',
    },
];
const footerNavItems: NavItem[] = [
    {
        title: 'Repository',
        href: 'https://github.com/Birdycom/omniaui-vue-starter-kit',
        icon: 'mdi:github',
    },
    {
        title: 'Documentation',
        href: 'https://omniaui.eu/ui/frameworks-vue',
        icon: 'mdi:book-open-variant-outline',
    },
];

const { isCurrentUrl } = useCurrentUrl();
</script>

<template>
    <div class="oc-sidebar-group">
        <div class="oc-sidebar-group-label">Platform</div>
        <ul class="oc-sidebar-menu">
            <li v-for="item in mainNavItems" :key="item.title">
                <Link
                    class="oc-sidebar-menu-button"
                    :href="item.href"
                    prefetch
                    :aria-current="isCurrentUrl(item.href) ? 'page' : undefined"
                >
                    <Icon
                        v-if="item.icon"
                        :icon="item.icon"
                        class="oc-sidebar-menu-icon"
                    />
                    <span class="oc-sidebar-menu-label">{{ item.title }}</span>
                </Link>
            </li>
        </ul>
    </div>
    <div class="oc-sidebar-separator" />
    <div class="oc-sidebar-group">
        <ul class="oc-sidebar-menu">
            <li v-for="item in footerNavItems" :key="item.title">
                <a
                    class="oc-sidebar-menu-button"
                    :href="toUrl(item.href)"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Icon
                        v-if="item.icon"
                        :icon="item.icon"
                        class="oc-sidebar-menu-icon"
                    />
                    <span class="oc-sidebar-menu-label">{{ item.title }}</span>
                </a>
            </li>
        </ul>
    </div>
</template>
