export default defineComponent({
    props: {
        modelValue: {
            type: Boolean,
            default: false,
        },
    },
    emits: ['update:modelValue'],
    setup(props, { slots, emit }) {
        const isVisible = ref(false);
        return () => {
            if (!slots.default) {
                return null;
            }
            if (props.modelValue) {
                isVisible.value = props.modelValue;
            }
            if (isVisible.value) {
                return h(slots.default()[0], {
                    'modelValue': props.modelValue,
                    'onUpdate:modelValue': (value: boolean) => {
                        emit('update:modelValue', value);
                    },
                    'onClosed': (value: boolean) => {
                        // debugger;
                        isVisible.value = false;
                        emit('update:modelValue', value);
                    },
                });
            }
            return null;
        };
    },
});
