<template>
    <div class="toolbar-dropdown">
        <span class="voicemod-icons">{{icon}}</span>

        <v-select class="toolbar-dropdown__select"
                  v-model="param"
                  :options="options"
                  :searchable="false"

                  :placeholder="placeholder"
                  @input="triggerAction()">
        </v-select>
    </div>
</template>

<script>
export default {
    name: 'ToolbarDropdown',
    props: {
        icon: { type: String },
        options: { type: Array },
        placeholder: { type: String }
    },
    data() {
        return {
            param: ''
        }
    },
    methods: {
        triggerAction() {
            this.$emit('action', this.param)
        }
    }
}
</script>

<style lang="scss">
@import '../sass/mediaqueries';

.toolbar-dropdown {
    display: flex;

    @include max-width(tablet) {
        flex: 1;
        margin-bottom: 24px;
        justify-content: center;
    }

    @include bp(tablet) {
        margin-left: 48px;
    }

    .voicemod-icons {
        font-size: 32px;
        margin-right: 8px;
    }

    .v-select {
        min-width: 170px;

        .vs__dropdown-toggle {
            border: 0;
            background: var(--input-background);
            padding: 0 4px 4px;

            input {
                color: var(--input-placeholder);
            }

            .vs__selected {
                color: var(--primary-font-color);
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }

            .vs__selected__options {
                flex-wrap: unset;
            }

            .vs__open-indicator, .vs__clear {
                fill: var(--primary-font-color);
            }
        }

        .vs__dropdown-menu {
            background: var(--dropdown-background);
            padding: 0;
        }

        .vs__dropdown-option {
            color: var(--input-placeholder);
            border-top: 1px solid #232323;
            padding: 4px 12px;

            &--highlight {
                background: transparent;
                color: var(--primary-font-color);
            }
        }
    }
}
</style>