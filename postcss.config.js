import fs from 'node:fs';
import path from 'node:path';
import omniacss from '@birdycom/omniacss/postcss';

// OmniaCSS builds only the utilities and OmniaUI components the app uses. Components used through the OmniaUI Vue
// package (<OcBadge>, <OcProgress> …) have their classes in that package, so the source of every Oc* component the app
// imports is scanned too (OcBadge -> src/components/OcBadge.vue).
const components = 'node_modules/@birdycom/omniaui-vue/src/components';

function usedComponents() {
    if (!fs.existsSync(components)) {
        return [];
    }

    const used = new Set();
    for (const file of fs.readdirSync('resources/js', { recursive: true }).filter((f) => /\.(ts|vue)$/.test(f))) {
        const source = fs.readFileSync(path.join('resources/js', file), 'utf8');
        for (const [, names] of source.matchAll(/import\s*\{([^}]+)\}\s*from\s*'@birdycom\/omniaui-vue'/g)) {
            for (const name of names.split(',').map((n) => n.trim().split(/\s+as\s+/)[0])) {
                if (fs.existsSync(`${components}/${name}.vue`)) used.add(`${components}/${name}.vue`);
            }
        }
    }

    // Components use other components (OcStatus renders OcStatusDot): follow their imports too.
    const queue = [...used];
    while (queue.length) {
        for (const [, name] of fs.readFileSync(queue.pop(), 'utf8').matchAll(/from '\.\/(Oc\w+)\.vue'/g)) {
            const file = `${components}/${name}.vue`;
            if (fs.existsSync(file) && !used.has(file)) {
                used.add(file);
                queue.push(file);
            }
        }
    }

    return [...used];
}

export default {
    plugins: [
        omniacss({
            content: ['resources/views/**/*.blade.php', 'resources/js/**/*.{ts,vue}', ...usedComponents()],
        }),
    ],
};
