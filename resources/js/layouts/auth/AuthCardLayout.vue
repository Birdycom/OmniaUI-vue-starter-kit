<script setup lang="ts">
import { Link } from '@inertiajs/vue3';
import AppLogoIcon from '@/components/AppLogoIcon.vue';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { home } from '@/routes';

defineProps<{
    title?: string;
    description?: string;
}>();
</script>

<template>
    <div
        class="flex min-h-svh flex-col align-items-center justify-center gap-1.5 app-surface-muted p-1.5 md:p-10"
    >
        <div class="flex w-full max-w-md flex-col gap-1.5">
            <Link
                :href="home()"
                class="flex align-items-center gap-0.5 align-self-center font-medium"
            >
                <div class="flex h-2.2 w-2.2 align-items-center justify-center">
                    <AppLogoIcon
                        class="size-9 fill-current text-black dark:text-white"
                    />
                </div>
            </Link>

            <div class="flex flex-col gap-1.5">
                <Card class="round-6">
                    <CardHeader class="p-inline-2.5 pt-2 pb-0 text-center">
                        <CardTitle class="font-1.2">{{ title }}</CardTitle>
                        <CardDescription>
                            {{ description }}
                        </CardDescription>
                    </CardHeader>
                    <CardContent class="p-inline-2.5 p-block-2">
                        <slot />
                    </CardContent>
                </Card>
            </div>
        </div>
    </div>
</template>
