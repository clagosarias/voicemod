<template>
    <div class="toolbar-search">
        <span class="toolbar-search__icon voicemod-icons">search</span>
        <input type="text"
               class="toolbar-search__input"
               name="search-input"
               v-model="searchParam"
               @input="triggerSearch()"
               placeholder="Search">
        <span class="toolbar-search__clear voicemod-icons"
              v-if="searchParam"
              @click="clearSearch()">search-close</span>
    </div>
</template>

<script>
export default {
    name: 'ToolbarSearch',
    data() {
        return {
            searchParam: ''
        }
    },
    methods: {
        triggerSearch() {
            this.$emit('search', this.searchParam)
        },
        clearSearch() {
            this.searchParam = '';
            this.triggerSearch();
        }
    }

}
</script>

<style lang="scss">
@import '../sass/mediaqueries';

.toolbar-search {
    position: relative;
    display: flex;
    overflow: hidden;

    .voicemod-icons {
        position: absolute;
        top: 0;
        bottom: 0;
        width: 32px;
    }

    &__icon {
        left: 0;
        font-size: 32px;
    }

    &__clear {
        right: 0;
        font-size: 11px;
        cursor: pointer;
        border-radius: 50%;
        transition: all var(--primary-transition);
        border: 3px solid var(--input-background);

        &:hover {
            background: var(--primary-warn);
            color: white;
        }
    }

    &__input {
        font-size: 16px;
        line-height: 20px;
        padding: 6px;
        padding-left: 48px;
        border-radius: 24px;
        border: 0;
        background: var(--input-background);
        outline: none;
        color: var(--primary-font-color);

        @include bp(tablet) {
            width: 100%;
            min-width: 0;
        }
    }
}
</style>