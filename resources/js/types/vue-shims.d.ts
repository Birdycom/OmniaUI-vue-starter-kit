declare module '*.vue' {
    import type { DefineComponent } from 'vue';
    const component: DefineComponent;
    export default component;
}

declare module 'virtual:omnia-icons' {
    const icons: import('iconify-icon').IconifyJSON[];
    export default icons;
}
