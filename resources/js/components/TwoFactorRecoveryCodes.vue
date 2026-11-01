<script setup lang="ts">
import { Form } from '@inertiajs/vue3';
import Icon from '@/components/Icon.vue';
import { nextTick, onMounted, ref, useTemplateRef } from 'vue';
import AlertError from '@/components/AlertError.vue';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { useTwoFactorAuth } from '@/composables/useTwoFactorAuth';
import { regenerateRecoveryCodes } from '@/routes/two-factor';

const { recoveryCodesList, fetchRecoveryCodes, errors } = useTwoFactorAuth();
const isRecoveryCodesVisible = ref<boolean>(false);
const recoveryCodeSectionRef = useTemplateRef('recoveryCodeSectionRef');

const toggleRecoveryCodesVisibility = async () => {
    if (!isRecoveryCodesVisible.value && !recoveryCodesList.value.length) {
        await fetchRecoveryCodes();
    }

    isRecoveryCodesVisible.value = !isRecoveryCodesVisible.value;

    if (isRecoveryCodesVisible.value) {
        await nextTick();
        recoveryCodeSectionRef.value?.scrollIntoView({ behavior: 'smooth' });
    }
};

onMounted(async () => {
    if (!recoveryCodesList.value.length) {
        await fetchRecoveryCodes();
    }
});
</script>

<template>
    <Card class="w-full">
        <CardHeader>
            <CardTitle class="gap-0.7 flex">
                <Icon icon="mdi:lock-outline" class="size-4" />2FA recovery
                codes
            </CardTitle>
            <CardDescription>
                Recovery codes let you regain access if you lose your 2FA
                device. Store them in a secure password manager.
            </CardDescription>
        </CardHeader>
        <CardContent>
            <div
                class="gap-0.7 sm:flex-row sm:align-items-center sm:justify-between flex flex-col select-none"
            >
                <Button @click="toggleRecoveryCodesVisibility" class="w-fit">
                    <Icon
                        :icon="
                            isRecoveryCodesVisible
                                ? 'mdi:eye-off-outline'
                                : 'mdi:eye-outline'
                        "
                        class="size-4"
                    />
                    {{ isRecoveryCodesVisible ? 'Hide' : 'View' }} recovery
                    codes
                </Button>

                <Form
                    v-if="isRecoveryCodesVisible && recoveryCodesList.length"
                    v-bind="regenerateRecoveryCodes.form()"
                    method="post"
                    :options="{ preserveScroll: true }"
                    @success="fetchRecoveryCodes"
                    #default="{ processing }"
                >
                    <Button
                        variant="secondary"
                        type="submit"
                        :disabled="processing"
                    >
                        <Icon icon="mdi:refresh" class="h-1 w-1" /> Regenerate
                        codes
                    </Button>
                </Form>
            </div>
            <div
                :class="[
                    'relative overflow-hidden transition-all duration-300',
                    isRecoveryCodesVisible
                        ? 'h-auto opacity-100'
                        : 'h-0 opacity-0',
                ]"
            >
                <div v-if="errors?.length" class="mt-1.5">
                    <AlertError :errors="errors" />
                </div>
                <div v-else class="mt-0.7 space-y-3">
                    <div
                        ref="recoveryCodeSectionRef"
                        class="gap-0.2 rounded-lg app-surface-muted p-1 app-mono font-0.8 grid"
                    >
                        <div v-if="!recoveryCodesList.length" class="space-y-2">
                            <div
                                v-for="n in 8"
                                :key="n"
                                class="h-1 animate-pulse round-2 app-surface-muted"
                            ></div>
                        </div>
                        <div
                            v-else
                            v-for="(code, index) in recoveryCodesList"
                            :key="index"
                        >
                            {{ code }}
                        </div>
                    </div>
                    <p class="font-0.7 app-fg-muted select-none">
                        Each recovery code can be used once to access your
                        account and will be removed after use. If you need more,
                        click
                        <span class="font-bold">Regenerate codes</span> above.
                    </p>
                </div>
            </div>
        </CardContent>
    </Card>
</template>
