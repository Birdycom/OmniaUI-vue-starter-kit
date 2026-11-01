# OmniaUI Vue starter kit

A Laravel 13 + Inertia 3 + Vue 3 starter kit built with [OmniaCSS](https://omniacss.eu) and
[OmniaUI](https://omniaui.eu) instead of Tailwind, shadcn-vue and Reka UI. Same features as Laravel's official Vue kit,
same Fortify backend, same Wayfinder routes and the same 40 tests (vue-tsc clean):

- Log in, register, forgot / reset password, email verification, password confirmation
- Two-factor authentication (QR code, setup key, recovery codes) and passkeys
- Settings: profile, password, two-factor, passkeys, appearance (light / dark / system), delete account
- An app shell with a collapsible sidebar (a sheet on phones) and a top-bar layout
- A dashboard made of free OmniaUI Vue components: KPI tiles, an SVG line chart, status rows and a table

```bash
laravel new my-app --using=birdycom/omniaui-vue-starter-kit
cd my-app && composer run dev
```

## How it was made

The official kit was converted with OmniaCSS's own tools, so you can do the same with your existing app:

1. `npx omniacss-migrate codemod resources/js --write` rewrote the Tailwind classes it could map one to one to native OmniaCSS names.
2. The shadcn components in `resources/js/components/ui` were replaced by thin versions on top of OmniaUI with the same
   exports (`Button`, `Input`, `Dialog`, `InputOTP` …, as Vue render functions in `components/ui/omnia.ts`), so the pages kept their imports.
3. The app shell (sidebar, header, user menu, breadcrumbs) was rewritten with the OmniaUI sidebar and app-shell block.
4. The few theme-token classes OmniaCSS does not have yet (`text-muted-foreground` …) became four small rules in
   `resources/css/layout.css`.

## How the styling works

- `resources/css/app.css` has `@omniaui;` (components) and `@omnia;` (utilities). The PostCSS plugin keeps only what the
  app uses: about **58 kB of CSS (12 kB gzip)** for the whole kit, components included.
- `postcss.config.js` scans `resources/js` and the source of every `@birdycom/omniaui-vue` component the app imports (and the components those use).
- Theme tokens live in `resources/css/theme.css`; every component follows light and dark mode through `light-dark()`.
- `vite.config.ts` dedupes Vue, so the app and the OmniaUI components share one copy.

## Icons

The icons are the OmniaCSS webicons, drawn by the `iconify-icon` web component. These Iconify sets are installed:
Material Design Icons (`mdi:`), MDI Light (`mdi-light:`), Material Symbols (`material-symbols:`), SVG Spinners
(`svg-spinners:`), Flags (`flag:`) and VSCode Icons (`vscode-icons:`). Write `<Icon icon="mdi:cog-outline" />` (`resources/js/components/Icon.vue`) anywhere in
`resources/`; `vite-icons.js` finds every `<set>:<name>` and bundles only those icons, so the app never calls the
Iconify API. Size an icon with classes (`h-1 w-1`), the default is 1.25rem. Find names on
https://omniaui.eu/ui/webicons.

## Components and Pro

Import components from `@birdycom/omniaui-vue` (145 of them: `OcModal`, `OcDropdown`, `OcDataTable`, `OcChartLine` …) or add the
source with `npx omniaui add <name> --framework vue`. With an OmniaUI Pro license, `@birdycom/omniaui-pro-vue` adds
the Pro blocks (charts gallery, calendars, inbox, CMS dashboard …) to the same build.

## AI assistants

```bash
claude mcp add omniacss -- npx -y @birdycom/omniacss-mcp
```

The MCP server checks every class and gives the reference markup of every component; without MCP, point the assistant
at https://omniacss.eu/llms.txt and https://omniaui.eu/llms.txt.

## License

MIT. Based on the MIT-licensed [laravel/vue-starter-kit](https://github.com/laravel/vue-starter-kit).
