<script setup lang="ts">
import { getInitials } from '@/composables/useInitials';
import type { User } from '@/types';

/** OmniaUI user (avatar + name, optionally the email). */
const { user, showEmail = false } = defineProps<{
    user: User;
    showEmail?: boolean;
}>();
</script>

<template>
    <span class="oc-user">
        <span class="oc-avatar oc-avatar--sm">
            <img v-if="user.avatar" :src="user.avatar" :alt="user.name" />
            <template v-else>{{ getInitials(user.name) }}</template>
        </span>
        <span class="oc-user-text">
            <span class="oc-user-name">{{ user.name }}</span>
            <span v-if="showEmail" class="oc-user-email">{{ user.email }}</span>
        </span>
    </span>
</template>
