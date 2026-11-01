<script setup lang="ts">
import { router } from '@inertiajs/vue3';
import Icon from '@/components/Icon.vue';
import type { Passkey } from '@/types/auth';
import Heading from '@/components/Heading.vue';
import PasskeyItem from '@/components/PasskeyItem.vue';
import PasskeyRegister from '@/components/PasskeyRegister.vue';
import { destroy } from '@/actions/Laravel/Passkeys/Http/Controllers/PasskeyRegistrationController';

export type Props = {
    canManagePasskeys?: boolean;
    passkeys?: Passkey[];
};

withDefaults(defineProps<Props>(), {
    canManagePasskeys: false,
    passkeys: () => [],
});

const handleDelete = (id: number, onError: () => void) => {
    router.delete(destroy.url(id), {
        preserveScroll: true,
        onError,
    });
};

const handleRegisterSuccess = () => {
    router.reload();
};
</script>

<template>
    <div v-if="canManagePasskeys" class="space-y-6">
        <Heading
            variant="small"
            title="Passkeys"
            description="Manage your passkeys for passwordless sign-in"
        />

        <div class="rounded-lg overflow-hidden border">
            <template v-if="passkeys.length">
                <PasskeyItem
                    v-for="passkey in passkeys"
                    :key="passkey.id"
                    :passkey="passkey"
                    @remove="handleDelete"
                />
            </template>

            <div v-else class="p-2 text-center">
                <div
                    class="m-inline-auto mb-1 h-3.5 w-3.5 align-items-center round-8 app-surface-muted flex justify-center"
                >
                    <Icon
                        icon="mdi:key-outline"
                        class="h-1.7 w-1.7 app-fg-muted"
                    />
                </div>
                <p class="font-medium">No passkeys yet</p>
                <p class="mt-0.2 font-0.8 app-fg-muted">
                    Add a passkey to sign in without a password
                </p>
            </div>
        </div>

        <PasskeyRegister @success="handleRegisterSuccess" />
    </div>
</template>
