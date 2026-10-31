<script setup lang="ts">
import { Head, Link, usePage } from '@inertiajs/vue3';
import AppLogo from '@/components/AppLogo.vue';
import { dashboard, login } from '@/routes';
/* @chisel-registration */
import { register } from '@/routes';
/* @end-chisel-registration */

const page = usePage();
const resources = [
    { title: 'Vue guide', text: 'The OmniaUI Vue components and how they map to the HTML snippets.', href: 'https://omniaui.eu/ui/frameworks-vue' },
    { title: 'Blocks', text: 'Dashboards, pricing, sign-in screens: add one with npx omniaui add.', href: 'https://omniaui.eu/ui/blocks' },
    { title: 'AI assistants', text: 'The OmniaCSS MCP server gives Claude, Cursor and Copilot the real classes.', href: 'https://omniacss.eu/docs/ai' },
];
</script>

<template>
    <Head title="Welcome" />
    <header class="app-welcome-bar">
        <Link class="app-brand" href="/"><AppLogo /></Link>
        <nav class="flex gap-0.5" aria-label="Account">
            <Link v-if="page.props.auth.user" class="oc-btn oc-btn--outline oc-btn--sm" :href="dashboard()">Dashboard</Link>
            <template v-else>
                <Link class="oc-btn oc-btn--ghost oc-btn--sm" :href="login()">Log in</Link>
                <!-- @chisel-registration -->
                <Link class="oc-btn oc-btn--sm" :href="register()">Register</Link>
                <!-- @end-chisel-registration -->
            </template>
        </nav>
    </header>

    <main>
        <div class="oc-block-hero">
            <span class="oc-block-hero-badge">Laravel · Inertia · Vue · OmniaUI</span>
            <h1>Your app starts here</h1>
            <p>
                Sign-in, two-factor, passkeys and settings are ready. Every screen is built with OmniaCSS utilities and OmniaUI Vue components: no Tailwind,
                no Reka UI, and only the CSS your app uses.
            </p>
            <div class="oc-block-hero-actions">
                <Link class="oc-btn oc-btn--lg" :href="page.props.auth.user ? dashboard() : login()">Get started</Link>
                <a class="oc-btn oc-btn--outline oc-btn--lg" href="https://omniaui.eu/ui/components" target="_blank" rel="noopener noreferrer">Browse components</a>
            </div>
        </div>

        <section class="app-welcome-links" aria-label="Resources">
            <a v-for="item in resources" :key="item.title" class="oc-card app-welcome-link" :href="item.href" target="_blank" rel="noopener noreferrer">
                <div class="oc-card-header">
                    <h2 class="oc-card-title">{{ item.title }}</h2>
                    <p class="oc-card-description">{{ item.text }}</p>
                </div>
            </a>
        </section>
    </main>
</template>
