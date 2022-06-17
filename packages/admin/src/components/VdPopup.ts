export default defineComponent({
    props: {
        modelValue: {
            type: Boolean,
            default: false,
        },
    },
    emits: ['update:modelValue'],
    setup(props, { slots, emit }) {
        return () => {
            if (!slots.default) {
                return null;
            }
            if (props.modelValue) {
                return h(slots.default()[0], {
                    'modelValue': props.modelValue,
                    'onUpdate:modelValue': (value: boolean) => {
                        emit('update:modelValue', value);
                    },
                });
            }
            return null;
        };
    },
});
