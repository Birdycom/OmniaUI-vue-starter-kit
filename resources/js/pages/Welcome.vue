<script setup lang="ts">
import { Head, Link, usePage } from '@inertiajs/vue3';
import AppLogo from '@/components/AppLogo.vue';
import Icon from '@/components/Icon.vue';
import { dashboard, login } from '@/routes';
/* @chisel-registration */
import { register } from '@/routes';
/* @end-chisel-registration */

const page = usePage();
const year = new Date().getFullYear();

const features = [
    {
        icon: 'mdi:account-lock-outline',
        title: 'Authentication',
        text: 'Log in, register, forgot and reset password, e-mail verification.',
    },
    {
        icon: 'mdi:shield-check-outline',
        title: 'Two-factor',
        text: 'Authenticator apps with QR code setup and recovery codes.',
    },
    {
        icon: 'mdi:fingerprint',
        title: 'Passkeys',
        text: 'Sign in with Face ID, Touch ID or a security key.',
    },
    {
        icon: 'mdi:cog-outline',
        title: 'Settings',
        text: 'Profile, password, appearance and account deletion.',
    },
    {
        icon: 'mdi:theme-light-dark',
        title: 'Light and dark',
        text: 'Follows the system, or the choice saved in the settings.',
    },
    {
        icon: 'material-symbols:interests-outline',
        title: 'Webicons',
        text: 'MDI, Material Symbols, flags, spinners and more: only the icons you use are bundled.',
    },
];

const stats = [
    { value: '0', label: 'Tailwind classes' },
    { value: '< 15 kB', label: 'CSS for the whole app, gzipped' },
    { value: '100+', label: 'OmniaUI components' },
    { value: 'MIT', label: 'Free to use' },
];

const steps = [
    {
        title: 'Install',
        text: 'One laravel new command, then composer run dev.',
    },
    {
        title: 'Brand it',
        text: 'Change colors, radius and font in resources/css/theme.css.',
    },
    {
        title: 'Add blocks',
        text: 'Pricing, FAQ or a dashboard: npx omniaui add and done.',
    },
    { title: 'Ship', text: 'The build keeps only the CSS your app uses.' },
];

const faq = [
    {
        question: 'Do I need Tailwind?',
        answer: 'No. OmniaCSS generates the utilities and OmniaUI brings the components. Tailwind class names can mean something else here (w-5 is 5rem), so do not mix them.',
    },
    {
        question: 'Where do the icons come from?',
        answer: 'From the OmniaCSS webicons: Material Design Icons and MDI Light, Material Symbols, SVG Spinners, Flags and VSCode Icons. Name an icon in a component and the build bundles it: nothing is loaded from another server.',
    },
    {
        question: 'How do I change the look?',
        answer: 'Edit the theme tokens in resources/css/theme.css. Every component reads them, in light and in dark mode.',
    },
    {
        question: 'Is it free?',
        answer: 'Yes. The kit, OmniaCSS and OmniaUI are free. OmniaUI Pro adds extra blocks if you want them.',
    },
];

const resources = [
    {
        title: 'Vue guide',
        text: 'The OmniaUI Vue components and how they map to the HTML snippets.',
        href: 'https://omniaui.eu/ui/frameworks-vue',
    },
    {
        title: 'Blocks',
        text: 'Dashboards, pricing, sign-in screens: add one with npx omniaui add.',
        href: 'https://omniaui.eu/ui/blocks',
    },
    {
        title: 'AI assistants',
        text: 'The OmniaCSS MCP server gives Claude, Cursor and Copilot the real classes.',
        href: 'https://omniacss.eu/docs/ai',
    },
];

const install = `$ laravel new my-app \\
    --using=birdycom/omniaui-vue-starter-kit
$ cd my-app && composer run dev

  ✓ sign-in, two-factor, passkeys
  ✓ profile, password, appearance
  ✓ 40 tests pass`;
</script>

<template>
    <div class="app-welcome">
        <Head title="Welcome" />
        <header class="app-welcome-bar">
            <Link class="app-brand" href="/"><AppLogo /></Link>
            <nav class="gap-0.5 flex" aria-label="Account">
                <Link
                    v-if="page.props.auth.user"
                    class="oc-btn oc-btn--outline oc-btn--sm"
                    :href="dashboard()"
                    >Dashboard</Link
                >
                <template v-else>
                    <Link
                        class="oc-btn oc-btn--ghost oc-btn--sm"
                        :href="login()"
                        >Log in</Link
                    >
                    <!-- @chisel-registration -->
                    <Link class="oc-btn oc-btn--sm" :href="register()"
                        >Register</Link
                    >
                    <!-- @end-chisel-registration -->
                </template>
            </nav>
        </header>

        <main>
            <!-- Hero: the pitch on the left, the install commands on the right. -->
            <section class="oc-section-pad">
                <div class="oc-container oc-split">
                    <div>
                        <p class="oc-eyebrow">
                            Laravel · Inertia · Vue · OmniaUI
                        </p>
                        <h1 class="oc-display">
                            Your app starts
                            <span class="oc-text-gradient">here</span>.
                        </h1>
                        <p class="oc-lead">
                            Sign-in, two-factor, passkeys and settings are
                            ready. Every screen is built with OmniaCSS utilities
                            and OmniaUI Vue components: no Tailwind, no Reka UI,
                            and only the CSS your app uses.
                        </p>
                        <div class="gap-1 mt-2 flex flex-wrap">
                            <Link
                                class="oc-btn oc-btn--lg"
                                :href="
                                    page.props.auth.user ? dashboard() : login()
                                "
                                >Get started</Link
                            >
                            <a
                                class="oc-btn oc-btn--outline oc-btn--lg"
                                href="https://omniaui.eu/ui/components"
                                target="_blank"
                                rel="noopener noreferrer"
                                >Browse components</a
                            >
                        </div>
                    </div>
                    <div class="app-welcome-code">
                        <span
                            class="oc-icon-tile oc-icon-tile--float oc-accent--green"
                            aria-hidden="true"
                            ><Icon icon="mdi:shield-check-outline"
                        /></span>
                        <span
                            class="oc-icon-tile oc-icon-tile--float oc-accent--violet"
                            aria-hidden="true"
                            ><Icon icon="mdi:fingerprint"
                        /></span>
                        <span
                            class="oc-icon-tile oc-icon-tile--float oc-accent--orange"
                            aria-hidden="true"
                            ><Icon icon="mdi:palette-outline"
                        /></span>
                        <div class="oc-code-window">
                            <div class="oc-code-window__bar">
                                <i></i><i></i><i></i
                                ><span class="oc-code-window__title"
                                    >terminal</span
                                >
                            </div>
                            <pre class="oc-code-window__body">{{
                                install
                            }}</pre>
                        </div>
                    </div>
                </div>
            </section>

            <div class="oc-container">
                <div class="oc-block-stats">
                    <div
                        v-for="item in stats"
                        :key="item.label"
                        class="oc-block-stat"
                    >
                        <div class="oc-block-stat-value">{{ item.value }}</div>
                        <div class="oc-block-stat-label">{{ item.label }}</div>
                    </div>
                </div>
            </div>

            <div class="oc-block-features">
                <h2>Everything a new app needs</h2>
                <p>
                    The boring parts are done, tested and styled, so you can
                    start on what makes your app different.
                </p>
                <div class="oc-block-features-grid">
                    <div
                        v-for="item in features"
                        :key="item.title"
                        class="oc-block-feature-card"
                    >
                        <div class="oc-block-feature-icon">
                            <Icon :icon="item.icon" />
                        </div>
                        <h3>{{ item.title }}</h3>
                        <p>{{ item.text }}</p>
                    </div>
                </div>
            </div>

            <section class="oc-section-pad oc-section-pad--tight">
                <div class="oc-container">
                    <p class="oc-eyebrow">Make it yours</p>
                    <h2 class="oc-display oc-display--md">
                        From install to
                        <span class="oc-text-gradient">launch</span>.
                    </h2>
                    <ol class="oc-steps">
                        <li v-for="step in steps" :key="step.title">
                            <h3>{{ step.title }}</h3>
                            <p>{{ step.text }}</p>
                        </li>
                    </ol>
                </div>
            </section>

            <section class="oc-block-faq" aria-labelledby="oc-faq-title">
                <div class="oc-block-faq-inner">
                    <div class="oc-block-faq-head">
                        <p class="oc-eyebrow">FAQ</p>
                        <h2 id="oc-faq-title" class="oc-block-faq-title">
                            Frequently asked questions
                        </h2>
                        <p class="oc-block-faq-lead">
                            Short answers to what people ask first.
                        </p>
                    </div>
                    <div class="oc-accordion oc-block-faq-list">
                        <details
                            v-for="(item, index) in faq"
                            :key="item.question"
                            class="oc-accordion-item"
                            name="oc-faq"
                            :open="index === 0"
                        >
                            <summary class="oc-accordion-trigger">
                                {{ item.question }}
                            </summary>
                            <div class="oc-accordion-content">
                                {{ item.answer }}
                            </div>
                        </details>
                    </div>
                    <p class="oc-block-faq-more">
                        More questions?
                        <a
                            class="oc-link-arrow"
                            href="https://omniacss.eu/docs/"
                            target="_blank"
                            rel="noopener noreferrer"
                            >Read the docs</a
                        >
                    </p>
                </div>
            </section>

            <section class="app-welcome-links" aria-label="Resources">
                <a
                    v-for="item in resources"
                    :key="item.title"
                    class="oc-card app-welcome-link"
                    :href="item.href"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <div class="oc-card-header">
                        <h2 class="oc-card-title">{{ item.title }}</h2>
                        <p class="oc-card-description">{{ item.text }}</p>
                    </div>
                </a>
            </section>

            <div class="oc-block-cta">
                <h2>Ready to build?</h2>
                <p>
                    Create an account and look around: every screen in this kit
                    is yours to change.
                </p>
                <div class="oc-block-hero-actions">
                    <Link
                        class="oc-btn oc-btn--lg"
                        :href="page.props.auth.user ? dashboard() : login()"
                        >Get started</Link
                    >
                </div>
            </div>
        </main>

        <footer class="app-welcome-footer">
            <span>&copy; {{ year }} {{ page.props.name }}</span>
            <span>
                Built with
                <a
                    class="oc-link"
                    href="https://omniacss.eu"
                    target="_blank"
                    rel="noopener noreferrer"
                    >OmniaCSS</a
                >
                and
                <a
                    class="oc-link"
                    href="https://omniaui.eu"
                    target="_blank"
                    rel="noopener noreferrer"
                    >OmniaUI</a
                >
            </span>
        </footer>
    </div>
</template>
