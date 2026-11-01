<script setup lang="ts">
import { Form } from '@inertiajs/vue3';
import { useClipboard } from '@vueuse/core';
import Icon from '@/components/Icon.vue';
import { computed, nextTick, ref, useTemplateRef, watch } from 'vue';
import AlertError from '@/components/AlertError.vue';
import InputError from '@/components/InputError.vue';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from '@/components/ui/input-otp';
import { Spinner } from '@/components/ui/spinner';
import { useAppearance } from '@/composables/useAppearance';
import { useTwoFactorAuth } from '@/composables/useTwoFactorAuth';
import { confirm } from '@/routes/two-factor';
import type { TwoFactorConfigContent } from '@/types';

type Props = {
    requiresConfirmation: boolean;
    twoFactorEnabled: boolean;
};

const { resolvedAppearance } = useAppearance();

const props = defineProps<Props>();
const isOpen = defineModel<boolean>('isOpen');

const { copy, copied } = useClipboard();
const { qrCodeSvg, manualSetupKey, clearSetupData, fetchSetupData, errors } =
    useTwoFactorAuth();

const showVerificationStep = ref(false);
const code = ref<string>('');

const pinInputContainerRef = useTemplateRef('pinInputContainerRef');

const modalConfig = computed<TwoFactorConfigContent>(() => {
    if (props.twoFactorEnabled) {
        return {
            title: 'Two-factor authentication enabled',
            description:
                'Two-factor authentication is now enabled. Scan the QR code or enter the setup key in your authenticator app.',
            buttonText: 'Close',
        };
    }

    if (showVerificationStep.value) {
        return {
            title: 'Verify authentication code',
            description: 'Enter the 6-digit code from your authenticator app',
            buttonText: 'Continue',
        };
    }

    return {
        title: 'Enable two-factor authentication',
        description:
            'To finish enabling two-factor authentication, scan the QR code or enter the setup key in your authenticator app',
        buttonText: 'Continue',
    };
});

const handleModalNextStep = () => {
    if (props.requiresConfirmation) {
        showVerificationStep.value = true;

        nextTick(() => {
            pinInputContainerRef.value?.querySelector('input')?.focus();
        });

        return;
    }

    clearSetupData();
    isOpen.value = false;
};

const resetModalState = () => {
    if (props.twoFactorEnabled) {
        clearSetupData();
    }

    showVerificationStep.value = false;
    code.value = '';
};

watch(
    () => isOpen.value,
    async (isOpen) => {
        if (!isOpen) {
            resetModalState();

            return;
        }

        if (!qrCodeSvg.value) {
            await fetchSetupData();
        }
    },
);
</script>

<template>
    <Dialog :open="isOpen" @update:open="isOpen = $event">
        <DialogContent class="sm:max-w-md">
            <DialogHeader
                class="align-items-center gap-0.5 flex flex-col text-center"
            >
                <div class="mb-0.7 round-full p-0.1 shadow-sm w-auto border">
                    <div
                        class="round-full app-surface-muted p-0.6 relative overflow-hidden border"
                    >
                        <div
                            class="inset-0 absolute grid grid-cols-5 opacity-50"
                        >
                            <div
                                v-for="i in 5"
                                :key="`col-${i}`"
                                class="border-r"
                            />
                        </div>
                        <div
                            class="inset-0 absolute grid grid-rows-5 opacity-50"
                        >
                            <div
                                v-for="i in 5"
                                :key="`row-${i}`"
                                class="border-b"
                            />
                        </div>
                        <Icon
                            icon="mdi:qrcode-scan"
                            class="size-6 relative z-20"
                        />
                    </div>
                </div>
                <DialogTitle>{{ modalConfig.title }}</DialogTitle>
                <DialogDescription class="text-center">
                    {{ modalConfig.description }}
                </DialogDescription>
            </DialogHeader>

            <div
                class="align-items-center space-y-5 relative flex w-auto flex-col justify-center"
            >
                <template v-if="!showVerificationStep">
                    <AlertError v-if="errors?.length" :errors="errors" />
                    <template v-else>
                        <div
                            class="m-inline-auto max-w-md align-items-center relative flex overflow-hidden"
                        >
                            <div
                                class="m-inline-auto aspect-1 w-16 rounded-lg relative overflow-hidden border"
                            >
                                <div
                                    v-if="!qrCodeSvg"
                                    class="inset-0 aspect-1 animate-pulse align-items-center absolute z-10 flex h-auto w-full justify-center"
                                >
                                    <Spinner class="size-6" />
                                </div>
                                <div
                                    v-else
                                    class="p-1.2 relative z-10 overflow-hidden border"
                                >
                                    <div
                                        v-html="qrCodeSvg"
                                        class="aspect-1 align-items-center flex size-full justify-center"
                                        :style="{
                                            filter:
                                                resolvedAppearance === 'dark'
                                                    ? 'invert(1) brightness(1.5)'
                                                    : undefined,
                                        }"
                                    />
                                </div>
                            </div>
                        </div>

                        <div class="align-items-center space-x-5 flex w-full">
                            <Button class="w-full" @click="handleModalNextStep">
                                {{ modalConfig.buttonText }}
                            </Button>
                        </div>

                        <div
                            class="align-items-center relative flex w-full justify-center"
                        >
                            <div class="inset-0 absolute top-1/2 h-px w-full" />
                            <span class="p-inline-0.5 p-block-0.2 relative"
                                >or, enter the code manually</span
                            >
                        </div>

                        <div
                            class="align-items-center space-x-2 flex w-full justify-center"
                        >
                            <div
                                class="align-items-stretch round-6 flex w-full overflow-hidden border"
                            >
                                <div
                                    v-if="!manualSetupKey"
                                    class="align-items-center app-surface-muted p-0.7 flex h-full w-full justify-center"
                                >
                                    <Spinner />
                                </div>
                                <template v-else>
                                    <input
                                        type="text"
                                        readonly
                                        :value="manualSetupKey"
                                        class="p-0.7 h-full w-full"
                                    />
                                    <button
                                        @click="copy(manualSetupKey || '')"
                                        class="p-inline-0.7 app-surface-muted relative block h-auto border-l"
                                    >
                                        <Icon
                                            v-if="copied"
                                            icon="mdi:check"
                                            class="w-1 text-green-10"
                                        />
                                        <Icon
                                            v-else
                                            icon="mdi:content-copy"
                                            class="h-1 w-1"
                                        />
                                    </button>
                                </template>
                            </div>
                        </div>
                    </template>
                </template>

                <template v-else>
                    <Form
                        v-bind="confirm.form()"
                        error-bag="confirmTwoFactorAuthentication"
                        reset-on-error
                        @finish="code = ''"
                        @success="isOpen = false"
                        v-slot="{ errors, processing }"
                    >
                        <input type="hidden" name="code" :value="code" />
                        <div
                            ref="pinInputContainerRef"
                            class="space-y-3 relative w-full"
                        >
                            <div
                                class="align-items-center space-y-3 p-block-0.5 flex w-full flex-col justify-center"
                            >
                                <InputOTP
                                    id="otp"
                                    v-model="code"
                                    :maxlength="6"
                                    :disabled="processing"
                                    autofocus
                                >
                                    <InputOTPGroup>
                                        <InputOTPSlot
                                            v-for="index in 6"
                                            :key="index"
                                            :index="index - 1"
                                        />
                                    </InputOTPGroup>
                                </InputOTP>
                                <InputError :message="errors?.code" />
                            </div>

                            <div
                                class="align-items-center space-x-5 flex w-full"
                            >
                                <Button
                                    type="button"
                                    variant="outline"
                                    class="w-auto flex-1"
                                    @click="showVerificationStep = false"
                                    :disabled="processing"
                                >
                                    Back
                                </Button>
                                <Button
                                    type="submit"
                                    class="w-auto flex-1"
                                    :disabled="processing || code.length < 6"
                                >
                                    Confirm
                                </Button>
                            </div>
                        </div>
                    </Form>
                </template>
            </div>
        </DialogContent>
    </Dialog>
</template>
