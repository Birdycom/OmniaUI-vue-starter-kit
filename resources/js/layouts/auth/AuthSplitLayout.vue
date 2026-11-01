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
        class="align-items-center p-inline-2 sm:px-0 lg:max-w-none lg:grid-cols-2 lg:px-0 relative grid h-dvh flex-col justify-center"
    >
        <div
            class="none app-surface-muted p-2.5 text-white lg:flex relative h-full flex-col dark:border-r"
        >
            <div class="inset-0 bg-black-30 absolute" />
            <Link
                :href="home()"
                class="align-items-center font-1.1 font-medium relative z-20 flex"
            >
                <AppLogoIcon class="mr-0.5 size-8 text-white fill-current" />
                {{ name }}
            </Link>
        </div>
        <div class="lg:p-2">
            <div
                class="m-inline-auto space-y-6 flex w-full flex-col justify-center"
            >
                <div class="space-y-2 flex flex-col text-center">
                    <h1
                        class="font-1.2 font-medium letterspacing-1"
                        v-if="title"
                    >
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
