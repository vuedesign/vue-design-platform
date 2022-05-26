<template>
    <dl
        class="vd-menu-item"
        :class="[
            children && children.length ? 'vd-type-dir' : 'vd-type-menu',
            active && 'vd-active',
            isOpen && 'is-open',
        ]"
    >
        <dt @click="handleClick">
            <div class="title">
                <iconpark-icon :name="icon" class="title-icon"></iconpark-icon>
                <span class="title-label">{{ label }}</span>
            </div>
            <div class="icon">
                <iconpark-icon
                    v-if="children && children.length"
                    @click="handleToggle"
                    :name="isOpen ? 'up' : 'down'"
                ></iconpark-icon>
                <iconpark-icon v-else name="right"></iconpark-icon>
            </div>
        </dt>
        <dd>
            <template v-if="children && children.length">
                <vd-menu-item
                    v-for="(item, index) in children"
                    :key="index"
                    v-bind="item"
                    @goto="handlGoto"
                />
            </template>
        </dd>
    </dl>
</template>

<script lang="ts">
export default {
    name: 'vd-menu-item',
};
</script>
<script setup lang="ts">
interface Props {
    label: string;
    value: string;
    active?: boolean;
    icon?: string;
    isOpen?: boolean;
    children?: Props[];
}

const props = withDefaults(defineProps<Props>(), {
    label: '',
    value: '',
    icon: '',
    active: false,
    children: () => [],
});

const emit = defineEmits(['toggle', 'goto']);

const handleToggle = () => {
    emit('toggle', props.value);
};

const handleClick = () => {
    if (!props.children || !props.children.length) {
        emit('goto', props);
    }
};

const handlGoto = (props: Props) => {
    emit('goto', props);
};
</script>

<style scoped lang="scss">
.vd-menu-item {
    .title {
        flex: 1;
        > .title-icon,
        > .title-label {
            display: inline-flex;
            vertical-align: middle;
        }
    }
    .title-label {
        margin-left: 5px;
    }
    dt {
        display: flex;
        height: 18px;
        align-items: center;
    }
    .icon {
        display: flex;
        width: 12px;
        align-items: center;
        > iconpark-icon {
            color: #444;
        }
    }
}
.vd-type-menu {
    padding: 5px 8px 5px 12px;
    margin-top: 8px;
    border-radius: 32px;
    background-color: transparent;
    transition: all 0.5s;
    &:hover {
        background-color: rgba(#3d7eff, 0.2);
        border-radius: 4px;
        cursor: pointer;
        .title-icon,
        .title-label,
        .icon > iconpark-icon {
            color: #3d7eff;
        }
    }
    &.vd-active {
        background-color: #3d7eff;
        border-radius: 4px;
        .title-icon,
        .title-label,
        .icon > iconpark-icon {
            color: #fff;
        }
    }
}

.vd-type-dir {
    margin-top: 8px;
    > dt {
        padding: 5px 8px 5px 12px;
        .title {
            .title-icon,
            .title-label {
                color: #666;
            }
        }
        .icon {
            > iconpark-icon {
                color: #666;
            }
            &:hover {
                > iconpark-icon {
                    color: #3d7eff;
                    cursor: pointer;
                }
            }
        }
    }
    .vd-type-menu {
        padding: 5px 8px 5px 24px;
    }

    > dd {
        height: 0;
        overflow: hidden;
    }
    &.is-open {
        > dd {
            height: auto;
            overflow: hidden;
        }
    }
}
</style>
