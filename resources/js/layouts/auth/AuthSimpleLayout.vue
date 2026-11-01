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
        class="align-items-center gap-1.5 p-1.5 md:p-10 flex min-h-svh flex-col justify-center"
    >
        <div class="max-w-sm w-full">
            <div class="gap-2 flex flex-col">
                <div class="align-items-center gap-1 flex flex-col">
                    <Link
                        :href="home()"
                        class="align-items-center gap-0.5 font-medium flex flex-col"
                    >
                        <div
                            class="mb-0.2 h-2.2 w-2.2 align-items-center round-3 flex justify-center"
                        >
                            <AppLogoIcon
                                class="size-9 dark:text-white fill-current text-[var(--foreground)]"
                            />
                        </div>
                        <span class="sr-only">{{ title }}</span>
                    </Link>
                    <div class="space-y-2 text-center">
                        <h1 class="font-1.2 font-medium">{{ title }}</h1>
                        <p class="font-0.8 app-fg-muted text-center">
                            {{ description }}
                        </p>
                    </div>
                </div>
                <slot />
            </div>
        </div>
    </div>
</template>
