<script setup lang="ts">
import { Link } from '@inertiajs/vue3';
import type { BreadcrumbItem } from '@/types';

/** OmniaUI breadcrumb (oc-breadcrumb); the last item is the current page. */
defineProps<{ breadcrumbs: BreadcrumbItem[] }>();
</script>

<template>
    <nav v-if="breadcrumbs.length" class="oc-breadcrumb" aria-label="Breadcrumb">
        <template v-for="(item, index) in breadcrumbs" :key="index">
            <span v-if="index === breadcrumbs.length - 1" class="oc-breadcrumb-item" aria-current="page">{{ item.title }}</span>
            <Link v-else class="oc-breadcrumb-item" :href="item.href">{{ item.title }}</Link>
        </template>
    </nav>
</template>
