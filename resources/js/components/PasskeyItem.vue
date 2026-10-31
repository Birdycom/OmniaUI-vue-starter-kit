<script setup lang="ts">
import { KeyRound, Trash2 } from '@lucide/vue';
import { ref } from 'vue';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import type { Passkey } from '@/types/auth';

const props = defineProps<{
    passkey: Passkey;
}>();

const emit = defineEmits<{
    remove: [id: number, onError: () => void];
}>();

const isDeleting = ref(false);

const handleDelete = () => {
    isDeleting.value = true;
    emit('remove', props.passkey.id, () => {
        isDeleting.value = false;
    });
};
</script>

<template>
    <div class="flex align-items-center justify-between border-b p-1">
        <div class="flex align-items-center gap-1">
            <div
                class="flex h-2.5 w-2.5 noshrink align-items-center justify-center round-6 app-surface-muted"
            >
                <KeyRound class="h-1.2 w-1.2 app-fg-muted" />
            </div>
            <div class="space-y-1">
                <div class="flex align-items-center gap-0.6">
                    <p class="font-medium letterspacing-1">{{ passkey.name }}</p>
                    <span
                        v-if="passkey.authenticator"
                        class="inline-flex align-items-center gap-0.2 round-3 app-surface-muted p-inline-0.5 p-block-0.1 font-0.7 font-medium letterspacing-8 app-fg-muted uppercase"
                    >
                        {{ passkey.authenticator }}
                    </span>
                </div>
                <p class="font-0.8 app-fg-muted">
                    Added {{ passkey.created_at_diff }}
                    <template v-if="passkey.last_used_at_diff">
                        <span class="m-inline-0.2 app-fg-muted">/</span>
                        Last used {{ passkey.last_used_at_diff }}
                    </template>
                </p>
            </div>
        </div>

        <Dialog>
            <DialogTrigger as-child>
                <Button
                    variant="ghost"
                    size="sm"
                    class="app-fg-danger app-fg-danger"
                >
                    <Trash2 class="h-1 w-1" />
                    <span class="sr-only">Remove</span>
                </Button>
            </DialogTrigger>

            <DialogContent>
                <DialogTitle>Remove passkey</DialogTitle>
                <DialogDescription>
                    Are you sure you want to remove the"{{ passkey.name }}"
                    passkey? You will no longer be able to use it to sign in.
                </DialogDescription>
                <DialogFooter class="gap-0.5">
                    <DialogClose as-child>
                        <Button variant="secondary">Cancel</Button>
                    </DialogClose>
                    <Button
                        variant="destructive"
                        :disabled="isDeleting"
                        @click="handleDelete"
                    >
                        {{ isDeleting ? 'Removing...' : 'Remove passkey' }}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    </div>
</template>
