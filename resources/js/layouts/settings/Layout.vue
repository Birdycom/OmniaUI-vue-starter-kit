<script setup lang="ts">
import { Link } from '@inertiajs/vue3';
import Heading from '@/components/Heading.vue';
import Icon from '@/components/Icon.vue';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useCurrentUrl } from '@/composables/useCurrentUrl';
import { toUrl } from '@/lib/utils';
import { edit as editAppearance } from '@/routes/appearance';
import { edit as editProfile } from '@/routes/profile';
import { edit as editSecurity } from '@/routes/security';
import type { NavItem } from '@/types';

const sidebarNavItems: NavItem[] = [
    {
        title: 'Profile',
        href: editProfile(),
    },
    {
        title: 'Security',
        href: editSecurity(),
    },
    {
        title: 'Appearance',
        href: editAppearance(),
    },
];

const { isCurrentOrParentUrl } = useCurrentUrl();
</script>

<template>
    <div class="p-inline-1 p-block-1.5">
        <Heading
            title="Settings"
            description="Manage your profile and account settings"
        />

        <div class="lg:flex-row lg:space-x-12 flex flex-col">
            <aside class="max-w-xl lg:w-12 w-full">
                <nav
                    class="space-y-1 space-x-0 flex flex-col"
                    aria-label="Settings"
                >
                    <Button
                        v-for="item in sidebarNavItems"
                        :key="toUrl(item.href)"
                        size="sm"
                        variant="ghost"
                        :class="[
                            'justify-flex-start w-full',
                            {
                                'app-surface-muted': isCurrentOrParentUrl(
                                    item.href,
                                ),
                            },
                        ]"
                        as-child
                    >
                        <Link :href="item.href">
                            <Icon
                                v-if="item.icon"
                                :icon="item.icon"
                                class="h-1 w-1"
                            />
                            {{ item.title }}
                        </Link>
                    </Button>
                </nav>
            </aside>

            <Separator class="m-block-1.5 lg:hidden" />

            <div class="md:max-w-2xl flex-1">
                <section class="max-w-xl space-y-12">
                    <slot />
                </section>
            </div>
        </div>
    </div>
</template>
