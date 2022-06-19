const filterStyle = {
    display: 'flex',
    padding: '16px 24px',
};
const filterInnerStyle = {
    display: 'flex',
    flex: 1,
    marginBottom: '-12px',
    flexWrap: 'wrap',
};

const filterRightStyle = {
    width: 'auto',
    marginBottom: '-12px',
    display: 'flex',
};

export default defineComponent({
    props: {
        horizontal: {
            type: Number,
            default: 8,
        },
        vertical: {
            type: Number,
            default: 12,
        },
    },
    setup(props, { slots }) {
        return () => {
            if (!slots.default) {
                return null;
            }
            const slotsDetault = slots.default();
            const chilren = slotsDetault.map((item, index) => {
                return h(
                    'div',
                    {
                        style: {
                            'margin-right':
                                index === slotsDetault.length
                                    ? 0
                                    : `${props.horizontal}px`,
                            'margin-bottom': `${props.vertical}px`,
                        },
                    },
                    [item],
                );
            });

            let rightChildren: any[] = [];
            if (slots.right && slots.right().length) {
                rightChildren = slots.right().map((item) => {
                    return h(
                        'div',
                        {
                            style: {
                                'margin-left': `${props.horizontal}px`,
                                'margin-bottom': `${props.vertical}px`,
                            },
                        },
                        [item],
                    );
                });
            }

            return h(
                'div',
                {
                    style: filterStyle,
                },
                [
                    h(
                        'div',
                        {
                            style: {
                                ...filterInnerStyle,
                                marginBottom: `-${props.vertical}px`,
                            },
                        },
                        chilren,
                    ),
                    h(
                        'div',
                        {
                            style: {
                                ...filterRightStyle,
                                marginBottom: `-${props.vertical}px`,
                            },
                        },
                        rightChildren,
                    ),
                ],
            );
        };
    },
});
