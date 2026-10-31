// The shadcn-vue components of the official kit, rebuilt on OmniaUI classes with the same names and props.
// Modals are native <dialog> elements, the OTP field is one real input with drawn cells, toasts use oc-toast.
import { cloneVNode, computed, defineComponent, h, inject, nextTick, provide, reactive, ref, watch } from 'vue';
import type { InjectionKey, PropType, VNode } from 'vue';
import { cn } from '@/lib/utils';

/** Renders the slot's single child with extra props (as-child), or the given tag. */
function render(tag: string, asChild: boolean | undefined, props: Record<string, unknown>, children?: () => VNode[]) {
    if (asChild && children) {
        const [child] = children();

        return child ? cloneVNode(child, props, true) : null;
    }

    return h(tag, props, children?.());
}

const simple = (name: string, tag: string, base: string) =>
    defineComponent({
        name,
        inheritAttrs: false,
        props: { class: { type: null, default: undefined } },
        setup(props, { attrs, slots }) {
            return () => h(tag, { ...attrs, class: cn(base, props.class) }, slots.default?.());
        },
    });

export const Button = defineComponent({
    name: 'Button',
    inheritAttrs: false,
    props: {
        variant: { type: String as PropType<'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'>, default: 'default' },
        size: { type: String as PropType<'default' | 'sm' | 'lg' | 'icon'>, default: 'default' },
        asChild: Boolean,
        class: { type: null, default: undefined },
    },
    setup(props, { attrs, slots }) {
        const classes = computed(() =>
            cn(
                'oc-btn',
                props.variant !== 'default' && `oc-btn--${props.variant}`,
                (props.size === 'sm' || props.size === 'lg') && `oc-btn--${props.size}`,
                props.size === 'icon' && 'oc-btn--icon',
                props.class,
            ),
        );

        return () => render('button', props.asChild, { ...attrs, class: classes.value }, slots.default);
    },
});

export const Input = defineComponent({
    name: 'Input',
    inheritAttrs: false,
    props: {
        modelValue: { type: [String, Number], default: undefined },
        defaultValue: { type: [String, Number], default: undefined },
        class: { type: null, default: undefined },
    },
    emits: ['update:modelValue'],
    setup(props, { attrs, emit }) {
        return () =>
            h('input', {
                ...attrs,
                class: cn('oc-input', props.class),
                value: props.modelValue ?? props.defaultValue,
                onInput: (event: Event) => emit('update:modelValue', (event.target as HTMLInputElement).value),
            });
    },
});

export const Label = simple('Label', 'label', 'oc-field-label');

export const Checkbox = defineComponent({
    name: 'Checkbox',
    inheritAttrs: false,
    props: { modelValue: { type: Boolean, default: undefined }, defaultValue: Boolean, class: { type: null, default: undefined } },
    emits: ['update:modelValue'],
    setup(props, { attrs, emit }) {
        return () =>
            h('input', {
                ...attrs,
                type: 'checkbox',
                class: cn('oc-checkbox', props.class),
                checked: props.modelValue ?? props.defaultValue,
                onChange: (event: Event) => emit('update:modelValue', (event.target as HTMLInputElement).checked),
            });
    },
});

export const Spinner = defineComponent({
    name: 'Spinner',
    props: { class: { type: null, default: undefined } },
    setup(props) {
        return () => h('span', { role: 'status', 'aria-label': 'Loading', class: cn('oc-spinner oc-spinner--sm', props.class) });
    },
});

export const Separator = defineComponent({
    name: 'Separator',
    props: { class: { type: null, default: undefined } },
    setup(props) {
        return () => h('hr', { class: cn('oc-separator', props.class) });
    },
});

export const Avatar = simple('Avatar', 'span', 'oc-avatar oc-avatar--sm');
export const AvatarImage = defineComponent({
    name: 'AvatarImage',
    props: { src: { type: String, default: undefined }, alt: { type: String, default: '' } },
    setup(props) {
        return () => (props.src ? h('img', { src: props.src, alt: props.alt }) : null);
    },
});
export const AvatarFallback = defineComponent({
    name: 'AvatarFallback',
    setup(_, { slots }) {
        return () => slots.default?.();
    },
});

export const Alert = defineComponent({
    name: 'Alert',
    inheritAttrs: false,
    props: { variant: { type: String, default: 'default' }, class: { type: null, default: undefined } },
    setup(props, { attrs, slots }) {
        return () =>
            h(
                'div',
                { ...attrs, role: 'alert', class: cn('oc-alert', props.variant === 'destructive' ? 'oc-alert--danger' : 'oc-alert--info', props.class) },
                slots.default?.(),
            );
    },
});
export const AlertTitle = simple('AlertTitle', 'p', 'oc-alert-title');
export const AlertDescription = simple('AlertDescription', 'div', 'oc-alert-description');

export const Card = simple('Card', 'div', 'oc-card');
export const CardHeader = simple('CardHeader', 'div', 'oc-card-header');
export const CardTitle = simple('CardTitle', 'h3', 'oc-card-title');
export const CardDescription = simple('CardDescription', 'p', 'oc-card-description');
export const CardContent = simple('CardContent', 'div', 'oc-card-content');

// Dialog: controlled (:open + @update:open) or uncontrolled (DialogTrigger / DialogClose).
type DialogState = { open: boolean; set: (open: boolean) => void; titleId: string };
const DIALOG: InjectionKey<DialogState> = Symbol('dialog');
let dialogs = 0;

export const Dialog = defineComponent({
    name: 'Dialog',
    props: { open: { type: Boolean, default: undefined } },
    emits: ['update:open'],
    setup(props, { emit, slots }) {
        const inner = ref(false);
        const state = reactive({
            open: computed(() => props.open ?? inner.value),
            set: (open: boolean) => {
                inner.value = open;
                emit('update:open', open);
            },
            titleId: `oc-dialog-${++dialogs}`,
        }) as unknown as DialogState;
        provide(DIALOG, state);

        return () => slots.default?.();
    },
});

const useDialog = () => inject(DIALOG) as DialogState;

export const DialogTrigger = defineComponent({
    name: 'DialogTrigger',
    props: { asChild: Boolean },
    setup(props, { slots, attrs }) {
        const dialog = useDialog();

        return () => render('button', props.asChild, { ...attrs, type: 'button', onClick: () => dialog.set(true) }, slots.default);
    },
});

export const DialogClose = defineComponent({
    name: 'DialogClose',
    props: { asChild: Boolean },
    setup(props, { slots, attrs }) {
        const dialog = useDialog();

        return () => render('button', props.asChild, { ...attrs, type: 'button', onClick: () => dialog.set(false) }, slots.default);
    },
});

export const DialogContent = defineComponent({
    name: 'DialogContent',
    props: { class: { type: null, default: undefined }, showCloseButton: { type: Boolean, default: true } },
    setup(props, { slots }) {
        const dialog = useDialog();
        const el = ref<HTMLDialogElement>();

        watch(
            () => dialog.open,
            async (open) => {
                await nextTick();
                if (!el.value) return;
                if (open && !el.value.open) el.value.showModal();
                if (!open && el.value.open) el.value.close();
            },
            { immediate: true },
        );

        return () =>
            h(
                'dialog',
                {
                    ref: el,
                    class: 'oc-modal',
                    'aria-labelledby': dialog.titleId,
                    onClose: () => dialog.set(false),
                    onClick: (event: MouseEvent) => event.target === el.value && dialog.set(false),
                },
                [h('div', { class: cn('oc-modal-content', props.class) }, dialog.open ? [h('div', { class: 'oc-modal-body flex flex-col gap-1' }, slots.default?.())] : [])],
            );
    },
});

export const DialogHeader = simple('DialogHeader', 'div', 'oc-modal-header');
export const DialogFooter = simple('DialogFooter', 'div', 'oc-modal-footer');
export const DialogDescription = simple('DialogDescription', 'p', 'oc-modal-description');
export const DialogTitle = defineComponent({
    name: 'DialogTitle',
    inheritAttrs: false,
    props: { class: { type: null, default: undefined } },
    setup(props, { attrs, slots }) {
        const dialog = useDialog();

        return () => h('h2', { ...attrs, id: dialog.titleId, class: cn('oc-modal-title', props.class) }, slots.default?.());
    },
});

// OTP: the OmniaUI field draws its own cells, so groups and slots render nothing.
export const REGEXP_ONLY_DIGITS = '^\\d+$';
export const InputOTP = defineComponent({
    name: 'InputOTP',
    inheritAttrs: false,
    props: {
        modelValue: { type: String, default: '' },
        maxlength: { type: Number, default: 6 },
        disabled: Boolean,
        id: { type: String, default: undefined },
        name: { type: String, default: undefined },
    },
    emits: ['update:modelValue', 'complete'],
    setup(props, { emit }) {
        return () =>
            h('input', {
                id: props.id,
                name: props.name,
                class: 'oc-otp',
                type: 'text',
                inputmode: 'numeric',
                autocomplete: 'one-time-code',
                'aria-label': 'One-time code',
                maxlength: props.maxlength,
                pattern: '[0-9]*',
                disabled: props.disabled,
                autofocus: true,
                style: { '--oc-otp-length': props.maxlength },
                value: props.modelValue,
                onInput: (event: Event) => {
                    const input = event.target as HTMLInputElement;
                    const value = input.value.replace(/\D/g, '').slice(0, props.maxlength);
                    input.value = value;
                    emit('update:modelValue', value);
                    if (value.length === props.maxlength) emit('complete', value);
                },
            });
    },
});
export const InputOTPGroup = defineComponent({ name: 'InputOTPGroup', setup: () => () => null });
export const InputOTPSlot = defineComponent({ name: 'InputOTPSlot', props: { index: Number }, setup: () => () => null });

// Toasts: toast.success('Saved') anywhere; <Toaster /> renders them once.
type ToastItem = { id: number; variant: 'success' | 'error' | 'info'; title: string };
const toasts = reactive<ToastItem[]>([]);
let toastId = 0;
const push = (variant: ToastItem['variant']) => (title: string) => {
    const id = ++toastId;
    toasts.push({ id, variant, title });
    window.setTimeout(() => toasts.splice(toasts.findIndex((t) => t.id === id), 1), 4000);
};
export const toast = Object.assign(push('info'), { success: push('success'), error: push('error'), info: push('info'), warning: push('info') });

export const Toaster = defineComponent({
    name: 'Toaster',
    setup() {
        return () =>
            h(
                'div',
                { class: 'oc-toast-container', 'aria-live': 'polite' },
                toasts.map((t) =>
                    h('div', { key: t.id, class: `oc-toast oc-toast--${t.variant}`, role: 'status' }, [h('div', { class: 'oc-toast-body' }, [h('p', { class: 'oc-toast-title' }, t.title)])]),
                ),
            );
    },
});
