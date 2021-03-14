<template>
  <div class="app">
    <header class="header">
      <div class="header__left">
        <ToolbarSearch @search="makeSearch"/>
      </div>

      <div class="header__right">
        <ToolbarDropdown placeholder="Filter"
          icon="filter"
          :options="voiceCategories"
          @action="filterItems"/>

        <ToolbarDropdown placeholder="Sort"
          icon="order"
          :options="['Asc', 'Desc']"
          @action="sortItems"/>
      </div>

      <div class="header__button">
        <span class="voicemod-icons" @click="selectRandom()">button-random</span>
      </div>
    </header>

    <div class="main">
      <!--
        These could be turn into a component because they are pretty similar actually.
        Perhaps something like:
        <MainSection status-icon="search-close/voice-favourite"
                     :items="results/favourites"
                     :selected-voice="selectedVoice"/>
        And then just emit the same two events on click (selectVoice, toggleFavourites)
       -->
      <div class="main__section favourites-section" v-if="favourites.length">
        <div class="main__section__title">
          <h3>Favourite voices</h3>
          <span class="divider"></span>
        </div>

        <div class="main__section__grid">
          <div class="grid__item"
               v-for="voice in favourites"
               v-bind:key="voice.id"
               :class="{selected: voice.id === selectedVoice, favourite: voice.isFavourite}"
               @click="selectVoice(voice)">

              <div class="grid__item__img">
                <img :src="require('./assets/' + voice.icon)">

                <span class="img__favourite voicemod-icons"
                      @click.stop="toggleFavourites(voice)">search-close</span>
              </div>

              <p class="grid__item__title">{{voice.name}}</p>
          </div>
        </div>
      </div>

      <div class="main__section all-section">
        <div class="main__section__title">
          <h3>All voices</h3>
          <span class="divider"></span>
        </div>

        <div class="main__section__grid">
          <!--
            This could also be turn into its own component
           -->
          <div class="grid__item"
               v-for="voice in results"
               v-bind:key="voice.id"
               :class="{selected: voice.id === selectedVoice, favourite: voice.isFavourite}"
               @click="selectVoice(voice)">

              <div class="grid__item__img">
                <img :src="require('./assets/' + voice.icon)">

                <span class="img__favourite voicemod-icons"
                      @click.stop="toggleFavourites(voice)">voice-favorite</span>
              </div>

              <p class="grid__item__title">{{voice.name}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ToolbarSearch from './components/ToolbarSearch.vue'
import ToolbarDropdown from './components/ToolbarDropdown.vue'
import voices from './voices.json'
import 'vue-select/dist/vue-select.css';

export default {
  data() {
    return {
      favourites: [],
      selectedVoice: '',
      sortParam: '',
      filterParam: '',
      searchParam: ''
    };
  },
  components: {
    ToolbarSearch,
    ToolbarDropdown
  },
  methods: {
    makeSearch(searchParam) {
      this.searchParam = searchParam
    },
    filterItems(filterParam) {
      this.filterParam = filterParam
    },
    sortItems(sortParam) {
      this.sortParam = sortParam
    },
    selectVoice(voice) {
      this.selectedVoice === voice.id ? this.selectedVoice = '' : this.selectedVoice = voice.id
    },
    toggleFavourites(voice) {
      voice.isFavourite ? this.removeFromFavourites(voice) : this.addToFavourites(voice)
    },
    addToFavourites(voice) {
      voice.isFavourite = true
      this.favourites.push(voice)
    },
    removeFromFavourites(voice) {
      voice.isFavourite = false
      let index = this.favourites.findIndex(favourite => favourite.id === voice.id)
      this.favourites.splice(index, 1)
    },
    selectRandom() {
      let randomIndex = Math.floor(Math.random() * this.results.length)
      this.selectVoice(this.results[randomIndex])
    }
  },
  computed: {
    voiceCategories() {
      let categories = []

      // caching voices.length inside the loop
      // also using ++i because it's faster due to not having to copy the old value before incrementing
      for (let i = 0, len = voices.length; i < len; ++i) {
        // An attempt at trying to cache voices[i] and making it more readable through the loop
        const voice = voices[i];

        if (voice.tags) {
          /*
          In order to prevent an O(n²) function (with another loop for each voice)
          we can make {categories} into a Set composed of categories + voice.tags, which removes duplicate values
          and use the spread operator {...} to turn it into an Array
          */
          categories = [...new Set(categories.concat(...voice.tags))]
        }
      }

      return categories
    },
    results() {
      let result = voices.filter(voice => this.filterParam ? voice.tags.includes(this.filterParam) : voice)

      result = result.filter(voice => voice.name.toLowerCase().includes(this.searchParam.toLowerCase()))

      if (this.sortParam === 'Asc') {
        result.sort(function(a, b) {
          return a.name.localeCompare(b.name);
        })
      } else if (this.sortParam === 'Desc') {
        result.sort(function(a, b) {
          return b.name.localeCompare(a.name);
        })
      }

      return result
    }
  }
};
</script>

<style lang="scss">
@import './sass/index';

.app {
  color: var(--primary-font-color);
  min-height: 100vh;
  background: var(--primary-background);
  padding: 0 12px;
  font-family: Montserrat;

  @include bp(tablet) {
    padding: 0 24px;
  }

  .header {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    max-width: 1200px;
    margin: 0 auto;
    top: 0px;
    z-index: 9;
    padding: 12px 0;
    background: var(--primary-background);

    @include bp(tablet) {
      position: sticky;
      flex-wrap: nowrap;
    }


    &__left {
      @include max-width(tablet) {
        width: 100%;

        input {
          width: 100%;
        }
      }
    }

    &__right {
      display: flex;
      width: 100%;
      margin-top: 24px;
      flex-wrap: wrap;

      @include bp(tablet) {
        width: auto;
        margin-top: 0;
        flex-wrap: unset;
        margin-left: auto;
      }
    }

    &__button {
      min-width: 32px;
      cursor: pointer;
      margin: 0 auto;

      @include bp(tablet) {
        margin-right: 0;
        margin-left: 16px;
      }

      .voicemod-icons {
        font-size: 28px;
      }
    }
  }

  .main {
    margin: 48px 12px 0;

    @include bp(tablet) {
      margin: 48px 48px 0;
    }

    @include bp(desktop) {
      max-width: 1200px;
      padding: 0 48px;
      margin: 48px auto 0;
    }

    .main__section {
      &__title {
        text-transform: uppercase;
        color: var(--secondary-font-color);
        display: flex;
        align-items: center;

        .divider {
          flex: 1;
          height: 1px;
          background: var(--secondary-font-color);
          opacity: 0.25;
          margin-left: 16px;
        }
      }

      &__grid {
        display: grid;
        row-gap: 48px;
        padding: 32px 0;
        grid-template-columns: repeat(auto-fill, minmax(114px, 1fr));
        column-gap: 24px;

        @include bp(tablet) {
          column-gap: 0;
          grid-template-columns: repeat(auto-fill, minmax(164px, 1fr));
        }

        .grid__item {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          cursor: pointer;

          &:hover, &.favourite {
            .grid__item__img {
              background: white;

              .img__favourite {
                opacity: 1;
                top: 0;
                right: 0;
                background: white;
              }
            }

            .grid__item__title {
              color: white;
            }
          }

          &.favourite {
            .img__favourite {
              color: var(--primary-accent);
            }
          }

          &.selected {
            .grid__item__img {
              background: var(--primary-accent);
            }

            .grid__item__title {
              color: var(--primary-accent);
            }
          }

          &__img {
            transition: background var(--primary-transition);
            border-radius: 50%;
            background: var(--primary-font-color);
            position: relative;

            .img__favourite {
              opacity: 0;
              position: absolute;
              right: 12px;
              top: 12px;
              padding: 8px;
              background: var(--primary-font-color);
              border-radius: 50%;
              transition: all var(--primary-transition);
              font-size: 14px;

              &:hover {
                color: var(--primary-accent);
              }
            }
          }

          &__title {
            margin-top: 16px;
            font-weight: 600;
            font-size: 14px;
          }
        }
      }
    }
  }
}

</style>