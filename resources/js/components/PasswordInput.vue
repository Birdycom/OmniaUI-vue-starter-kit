<script setup lang="ts">
import { OcPasswordInput } from '@birdycom/omniaui-vue';
import { onMounted, useTemplateRef } from 'vue';

// OmniaUI password input: the show/hide button is part of the field (oc-input-reveal).
defineOptions({ inheritAttrs: false });

const props = defineProps<{ autofocus?: boolean }>();
const wrapper = useTemplateRef<HTMLElement>('wrapper');
const input = () => wrapper.value?.querySelector('input') ?? null;

onMounted(() => props.autofocus && input()?.focus());

defineExpose({
    $el: {
        get value() {
            return input();
        },
    },
    focus: () => input()?.focus(),
});
</script>

<template>
    <div ref="wrapper"><OcPasswordInput v-bind="$attrs" /></div>
</template>
