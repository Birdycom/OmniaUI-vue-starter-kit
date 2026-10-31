<script setup lang="ts">
type Props = {
    title: string;
    description?: string;
    variant?: 'default' | 'small';
};

withDefaults(defineProps<Props>(), {
    variant: 'default',
});
</script>

<template>
    <header :class="variant === 'small' ? '' : 'mb-2 flex flex-col gap-0.5'">
        <h2
            :class="
                variant === 'small'
                    ? 'mb-0.1 text-base font-medium'
                    : 'font-1.2 font-semibold letterspacing-1'
"
        >
            {{ title }}
        </h2>
        <p v-if="description" class="font-0.8 app-fg-muted">
            {{ description }}
        </p>
    </header>
</template>
