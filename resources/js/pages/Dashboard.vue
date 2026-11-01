<script setup lang="ts">
import {
    OcBadge,
    OcChartLine,
    OcHeading,
    OcProgress,
    OcStatCard,
    OcStatus,
    OcTable,
    OcUser,
} from '@birdycom/omniaui-vue';
import { Head, usePage } from '@inertiajs/vue3';
import Icon from '@/components/Icon.vue';
import { dashboard } from '@/routes';

// A starting point built from free OmniaUI Vue components: KPI tiles, an SVG line chart (no chart library), status
// rows and a table with a sortable column. Replace the sample numbers with your own data.
defineOptions({
    layout: {
        breadcrumbs: [{ title: 'Dashboard', href: dashboard() }],
    },
});

const page = usePage();
const columns = [
    { key: 'name', label: 'Name', sortable: true },
    { key: 'plan', label: 'Plan' },
    { key: 'state', label: 'Status' },
    { key: 'joined', label: 'Joined', numeric: true },
];
const day = (n: number) =>
    new Date(Date.now() - n * 864e5).toISOString().slice(0, 10);
const rows = [
    {
        name: 'Ada Lovelace',
        plan: 'Team',
        variant: 'success',
        state: 'Active',
        joined: day(0),
    },
    {
        name: 'Alan Turing',
        plan: 'Pro',
        variant: 'success',
        state: 'Active',
        joined: day(3),
    },
    {
        name: 'Grace Hopper',
        plan: 'Free',
        variant: 'warning',
        state: 'Trial',
        joined: day(6),
    },
    {
        name: 'Linus Torvalds',
        plan: 'Pro',
        variant: 'secondary',
        state: 'Invited',
        joined: day(9),
    },
];
</script>

<template>
    <Head title="Dashboard" />
    <div class="app-dashboard">
        <OcHeading
            :level="1"
            :title="`Welcome back, ${page.props.auth.user.name}`"
            description="Here is what happens in your app today."
        />

        <div class="oc-stat-card-grid">
            <OcStatCard
                value="2,481"
                label="Visitors"
                trend="+12%"
                tone="accent"
                stripe
                ><template #icon
                    ><Icon icon="mdi:account-multiple-outline" /></template
            ></OcStatCard>
            <OcStatCard
                value="€ 18,240"
                label="Revenue"
                trend="+4.6%"
                tone="success"
                stripe
                ><template #icon><Icon icon="mdi:chart-bar" /></template
            ></OcStatCard>
            <OcStatCard
                value="312"
                label="Messages"
                trend="-3%"
                trend-direction="down"
                tone="warning"
                stripe
                ><template #icon><Icon icon="mdi:email-outline" /></template
            ></OcStatCard>
        </div>

        <div class="app-dashboard-grid">
            <div class="oc-card">
                <div class="oc-card-content">
                    <OcChartLine
                        title="Visitors"
                        sub="Last six months"
                        value="2,481"
                        variant="area"
                        :series="[
                            {
                                name: 'Desktop',
                                values: [186, 305, 237, 273, 309, 354],
                            },
                            {
                                name: 'Mobile',
                                values: [80, 200, 160, 190, 230, 262],
                            },
                        ]"
                    />
                </div>
            </div>

            <div class="oc-card">
                <div class="oc-card-header">
                    <h2 class="oc-card-title">System status</h2>
                    <p class="oc-card-description">
                        Background work of this app
                    </p>
                </div>
                <div class="oc-card-content gap-1 flex flex-col">
                    <OcStatus tone="done" meta="06:30"
                        >Nightly backup finished</OcStatus
                    >
                    <OcStatus tone="working" meta="now"
                        >Sending the newsletter</OcStatus
                    >
                    <OcStatus tone="waiting" meta="2"
                        >Jobs in the queue</OcStatus
                    >
                    <OcProgress :value="68" label="Storage used" levels />
                </div>
            </div>
        </div>

        <div class="oc-card">
            <div class="oc-card-header">
                <h2 class="oc-card-title">Recent sign-ups</h2>
            </div>
            <div class="oc-card-content">
                <OcTable :columns="columns" :rows="rows" row-key="name" striped>
                    <template #cell-name="{ row }">
                        <OcUser :name="row.name" avatar-size="sm" />
                    </template>
                    <template #cell-state="{ row }">
                        <OcBadge :variant="row.variant">{{
                            row.state
                        }}</OcBadge>
                    </template>
                </OcTable>
            </div>
        </div>
    </div>
</template>
