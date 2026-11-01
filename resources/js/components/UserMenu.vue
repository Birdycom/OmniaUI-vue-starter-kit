<script setup lang="ts">
import { Link, router, usePage } from '@inertiajs/vue3';
import Icon from '@/components/Icon.vue';
import UserInfo from '@/components/UserInfo.vue';
import { getInitials } from '@/composables/useInitials';
import { logout } from '@/routes';
import { edit } from '@/routes/profile';

// The signed-in user with a popover menu (settings, log out). compact: avatar only, for the top bar.
const { id, compact = false } = defineProps<{
    id: string;
    compact?: boolean;
}>();
const page = usePage();
</script>

<template>
    <template v-if="page.props.auth.user">
        <button
            v-if="compact"
            type="button"
            class="oc-btn oc-btn--ghost oc-btn--icon"
            :popovertarget="id"
            aria-label="User menu"
            data-test="sidebar-menu-button"
        >
            <span class="oc-avatar oc-avatar--sm">{{
                getInitials(page.props.auth.user.name)
            }}</span>
        </button>
        <button
            v-else
            type="button"
            class="oc-sidebar-menu-button oc-sidebar-menu-button--lg"
            :popovertarget="id"
            data-test="sidebar-menu-button"
        >
            <UserInfo :user="page.props.auth.user" show-email />
            <Icon icon="mdi:unfold-more-horizontal" class="h-1 w-1 ml-auto" />
        </button>
        <div :id="id" class="oc-dropdown-menu app-user-menu" popover="auto">
            <div class="oc-dropdown-label">
                <UserInfo :user="page.props.auth.user" show-email />
            </div>
            <div class="oc-dropdown-separator" />
            <Link class="oc-dropdown-item" :href="edit()" prefetch
                ><Icon icon="mdi:cog-outline" class="h-1 w-1" /> Settings</Link
            >
            <Link
                class="oc-dropdown-item w-full"
                :href="logout()"
                as="button"
                data-test="logout-button"
                @click="router.flushAll()"
                ><Icon icon="mdi:logout" class="h-1 w-1" /> Log out</Link
            >
        </div>
    </template>
</template>
