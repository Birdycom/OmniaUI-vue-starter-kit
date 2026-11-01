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
        class="align-items-center gap-1.5 app-surface-muted p-1.5 md:p-10 flex min-h-svh flex-col justify-center"
    >
        <div class="max-w-md gap-1.5 flex w-full flex-col">
            <Link
                :href="home()"
                class="align-items-center gap-0.5 align-self-center font-medium flex"
            >
                <div class="h-2.2 w-2.2 align-items-center flex justify-center">
                    <AppLogoIcon
                        class="size-9 text-black dark:text-white fill-current"
                    />
                </div>
            </Link>

            <div class="gap-1.5 flex flex-col">
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
