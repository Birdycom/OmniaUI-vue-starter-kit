<script setup lang="ts">
import { Link, usePage } from '@inertiajs/vue3';
import AppLogoIcon from '@/components/AppLogoIcon.vue';
import { home } from '@/routes';

const page = usePage();
const name = page.props.name;

defineProps<{
    title?: string;
    description?: string;
}>();
</script>

<template>
    <div
        class="relative grid h-dvh flex-col align-items-center justify-center p-inline-2 sm:px-0 lg:max-w-none lg:grid-cols-2 lg:px-0"
    >
        <div
            class="relative none h-full flex-col app-surface-muted p-2.5 text-white lg:flex dark:border-r"
        >
            <div class="absolute inset-0 bg-black-30" />
            <Link
                :href="home()"
                class="relative z-20 flex align-items-center font-1.1 font-medium"
            >
                <AppLogoIcon class="mr-0.5 size-8 fill-current text-white" />
                {{ name }}
            </Link>
        </div>
        <div class="lg:p-2">
            <div
                class="m-inline-auto flex w-full flex-col justify-center space-y-6"
            >
                <div class="flex flex-col space-y-2 text-center">
                    <h1 class="font-1.2 font-medium letterspacing-1" v-if="title">
                        {{ title }}
                    </h1>
                    <p class="font-0.8 app-fg-muted" v-if="description">
                        {{ description }}
                    </p>
                </div>
                <slot />
            </div>
        </div>
    </div>
</template>
