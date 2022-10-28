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
                <el-icon class="title-icon">
                    <component
                        :is="
                            Array.isArray(icon)
                                ? isOpen
                                    ? icon[0]
                                    : icon[1]
                                : icon
                        "
                    />
                </el-icon>
                <span class="title-label">{{ label }}</span>
            </div>
            <div class="icon">
                <el-icon>
                    <component
                        v-if="children && children.length"
                        @click="handleToggle"
                        :is="isOpen ? 'up' : 'down'"
                    />
                    <component v-else :is="'right'"></component>
                </el-icon>
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
import { MenuNode } from '@/configs/menuTree';
import {
    Up,
    Down,
    Right,
    FolderOpen,
    FolderClose,
    BrowserChrome,
    Navigation,
    PictureOne,
    User,
    Broadcast,
    Analysis,
    TagOne,
    SettingTwo,
    // // <SettingTwo theme="filled" size="24" fill="#333"/>
} from '@icon-park/vue-next';

export default defineComponent({
    name: 'vd-menu-item',
    props: {
        label: {
            type: String,
            default: '',
        },
        value: {
            type: String,
            default: '',
        },
        active: {
            type: Boolean,
            default: false,
        },
        icon: {
            type: [Array, String],
            default: () => undefined,
        },
        isOpen: {
            type: Boolean,
            default: false,
        },
        children: {
            type: Array,
            default: () => [],
        },
    },
    components: {
        Up,
        Down,
        Right,
        FolderOpen,
        FolderClose,
        BrowserChrome,
        Navigation,
        PictureOne,
        User,
        Broadcast,
        Analysis,
        TagOne,
        SettingTwo,
    },
    emits: ['toggle', 'goto'],
    setup(props, { emit }) {
        const handleToggle = () => {
            emit('toggle', props.value);
        };

        const handleClick = () => {
            if (!props.children || !props.children.length) {
                emit('goto', props);
            }
        };

        const handlGoto = (props: MenuNode) => {
            emit('goto', props);
        };
        return {
            handleToggle,
            handleClick,
            handlGoto,
        };
    },
});

// const props = withDefaults(defineProps<Props>(), {
//     label: '',
//     value: '',
//     active: false,
//     icon: undefined,
//     isOpen: false,
//     children: () => [],
// });

// const emit = defineEmits(['toggle', 'goto']);
</script>

<style scoped lang="scss">
.vd-menu-item {
    .title {
        flex: 1;
        > .title-label {
            display: inline-block;
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
        > i {
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
        .icon > i {
            color: #3d7eff;
        }
    }
    &.vd-active {
        background-color: #3d7eff;
        border-radius: 4px;
        .title-icon,
        .title-label,
        .icon > i {
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
            > i {
                color: #666;
            }
            &:hover {
                > i {
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
