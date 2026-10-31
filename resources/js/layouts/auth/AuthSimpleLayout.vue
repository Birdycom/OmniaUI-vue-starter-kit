<script setup lang="ts">
import { Link } from '@inertiajs/vue3';
import AppLogoIcon from '@/components/AppLogoIcon.vue';
import { home } from '@/routes';

defineProps<{
    title?: string;
    description?: string;
}>();
</script>

<template>
    <div
        class="flex min-h-svh flex-col align-items-center justify-center gap-1.5 p-1.5 md:p-10"
    >
        <div class="w-full max-w-sm">
            <div class="flex flex-col gap-2">
                <div class="flex flex-col align-items-center gap-1">
                    <Link
                        :href="home()"
                        class="flex flex-col align-items-center gap-0.5 font-medium"
                    >
                        <div
                            class="mb-0.2 flex h-2.2 w-2.2 align-items-center justify-center round-3"
                        >
                            <AppLogoIcon
                                class="size-9 fill-current text-[var(--foreground)] dark:text-white"
                            />
                        </div>
                        <span class="sr-only">{{ title }}</span>
                    </Link>
                    <div class="space-y-2 text-center">
                        <h1 class="font-1.2 font-medium">{{ title }}</h1>
                        <p class="text-center font-0.8 app-fg-muted">
                            {{ description }}
                        </p>
                    </div>
                </div>
                <slot />
            </div>
        </div>
    </div>
</template>
