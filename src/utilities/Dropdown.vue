<template>
  <div>
		<span>TEST</span>
    <span class="dropdown-options-bg">
      <input
        v-model="query"
        :readonly="!dropDownOpen || dropDownType==='multi'"
        class="wwt-input"
        :disabled="disabled"
        :class="{
          'shadow':dropDownOpen,
          'cursor':dropDownType==='multi'&&!disabled,
          'dropDown-disabled':disabled
        }"
        :placeholder="placeholder"
        type="text"
        @click="toggleDropDown()"
        @blur="dropDownOpen=false;query=computedSelection"
      >
    </span>
    <div>
      <ul
        v-if="dropDownOpen"
        class="dropDown-options dropdown-options-bg"
      >
        <li
          v-for="(option, index) in results"
          :key="index"
          :class="[(selection.filter(
            obj => JSON.stringify(obj) === JSON.stringify(option)
          ).length > 0) ? 'selected' : 'not-selected']"
          style="cursor: pointer;"
          @mousedown="selectedOption($event, option)"
        >
          <div
            v-if="(selection.filter(
              obj => JSON.stringify(obj) === JSON.stringify(option)
            ).length > 0)"
            class="selection-marker"
          />
          <div
            :class="[(selection.filter(
              obj => JSON.stringify(obj) === JSON.stringify(option)
            ).length > 0) ? 'selected-text' : 'not-selected-text']"
          >
            <div
              v-if="trackBy.length !== 0"
              style="display:inline;"
            >
              <div
                v-for="(track, trackIndex) of trackBy"
                :key="track + trackIndex"
                style="display: flex; flex-flow: column nowrap;"
              >
                {{ trackedOption(option, track) }}
              </div>
            </div>
            <div
              v-else
              style="display:inline"
            >
              {{ option }}
            </div>
            <div
              v-if="(selection.filter(
                obj => JSON.stringify(obj) === JSON.stringify(option)
              ).length > 0)"
              style="float: right; margin-right: 1rem; width: 18px; height: 18px;"
              class="atc-times"
            />
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import _cloneDeep from 'lodash.clonedeep';
import get from 'lodash.get';

export default {
  name: 'Dropdown',
  props: {
    options: {
      type: Array,
      required: true,
    },
    default: {
      type: Array,
      default: () => [],
    },
    dropDownType: {
      type: String,
      default: 'multi',
    },
    trackBy: {
      type: Array,
      default: undefined,
    },
    placeholder: {
      type: String,
      default: 'Type here...',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    context: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      query: null,
      selection: [],
      dropDownOpen: false,
    };
  },
  computed: {
    results() {
      if (this.query) {
        const regex = new RegExp(this.query, 'i');
        const response = this.options.filter((option) => {
          if (this.trackBy.length > 0) {
            // eslint-disable-next-line no-restricted-syntax
            for (const track of this.trackBy) {
              if (regex.test(get(option, track))) {
                return true;
              }
            }
            return false;
          }
          return regex.test(option);
        });
        return response;
      }
      return this.options;
    },
    computedSelection() {
      if (this.dropDownType === 'single') {
        if (!this.selection.length) {
          if (this.context === 'models') return this.query;
          return '';
        } if (this.trackBy.length > 0) {
          return get(this.selection[0], this.trackBy[0]);
        }
        return this.selection;
      }
      return '';
    },
  },
  watch: {
    default() {
      this.setDefault();
    },
    query() {
      if (this.context === 'models') this.$emit('query', this.query);
    },
  },
  created() {
    if (this.dropDownType === undefined) {
      this.dropDownType = 'multi';
    }
    this.setDefault();
  },
  methods: {
    setDefault() {
      if (this.default !== undefined && this.default.length) {
        this.selection = this.default;
        if (this.dropDownType === 'single') {
          if (this.trackBy !== undefined) {
            this.query = get(this.default[0], this.trackBy[0]);
          } else {
            this.query = this.default[0];
          }
        }
      }
    },
    trackedOption(option, track) {
      return get(option, track);
    },
    selectedOption(event, option) {
      event.preventDefault();
      if (
        this.selection.filter(
          (obj) => JSON.stringify(obj)
          === JSON.stringify(option),
        ).length > 0) {
        // eslint-disable-next-line max-len
        this.selection = this.selection.filter((obj) => JSON.stringify(obj) !== JSON.stringify(option));
      } else {
        if (this.dropDownType === 'single') {
          this.selection = [];
        }
        this.selection.push(option);
      }
      if (this.dropDownType === 'single') {
        if (!this.selection.length) {
          this.query = '';
        } else if (this.trackBy.length > 0) {
          this.query = get(this.selection[0], this.trackBy[0]);
        } else {
          this.query = this.selection;
        }
      }
      if (this.dropDownType === 'single') {
        this.$emit('selection', _cloneDeep(this.selection[0]));
      } else {
        this.$emit('selection', _cloneDeep(this.selection));
      }
    },
    toggleDropDown() {
      this.dropDownOpen = !this.dropDownOpen;
      if (!this.dropDownOpen && this.dropDownType === 'single') {
        if (!this.selection.length) {
          if (this.context !== 'models') this.query = '';
        } else if (this.trackBy.length > 0) {
          this.query = get(this.selection[0], this.trackBy[0]);
        } else {
          this.query = this.selection;
        }
      }
    },
  },
};
</script>

<style scoped>
.dropdown-options-bg{
  background-color: #EAEDF0
}
.wwt-input {
  width: 250px;
  height: 38px;
  padding-left: 0.5rem;
}
.wwt-input:hover, .wwt-input:focus {
  border: 1px solid #0079CD;
}
.cursor {
  cursor: pointer;
}
.selection-container {
  display: flex;
  flex-flow: row wrap;
  width: 250px;
}
.dropDown-disabled {
  background: #F4F6F9;
  color: #A0ACBD;
  border: 1px solid #CFD7E3;
  box-sizing: border-box
}
.dropDown-disabled::placeholder {
  color: #A0ACBD;
}
.dropDown-options {
  z-index: 8;
  position: absolute;
  width: 250px;
  max-height: 300px;
  overflow-y: auto;
  box-shadow: 0px 0px 0px rgba(27, 43, 52, 0.2), 0px 5px 10px rgba(27, 43, 52, 0.2);
  padding-left:0;
  color: #004C82
}
.dropDown-icon {
  font-size: 1.35rem;
  left: 19.15rem;
  bottom: .25rem;
  pointer-events: none;
  position: absolute;
  height: 24px;
  width: 24px;
}
.selection-marker {
  float: left;
  width: .25rem;
  height: 29px;
  background-color: #006EBD;
}
.selected-text {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  height: 100%;
  margin-left: 1rem;
}
.not-selected-text {
  font-size: 14px;
}
.selected-text:hover {
  color: #006EBD;
}
.not-selected-text:hover {
  color: #006EBD;
}
.not-selected:hover {
  background-color: #F4F6F9;
  color: #006EBD;
}
.not-selected {
  overflow: hidden;
  padding-left: 1rem;
  padding-top: .35rem;
  padding-bottom: .25rem;
  margin-top: 5px;
  margin-bottom: 5px;
}
.selected:hover {
  background-color: #F4F6F9;
  color: #006EBD;
}
.selected {
  margin: 0;
  padding: 0;
  height: 28px;
  overflow: hidden;
  color: #006EBD;
}
@media (prefers-color-scheme: dark) {
  ::placeholder {
    color: #a3a3a3;
  }
  .dropDown-options {
    border: solid 1px #385775;
    background-color: #1F4974;
  }
  .not-selected {
    background-color: #1F4974;
    color: white;
  }
  .not-selected:hover {
    background-color: rgb(112, 136, 160);
    color: white;
  }
  .not-selected-text:hover {
    color: white;
  }
  .selected {
    background-color: #385775;
  }
  .selected:hover {
    background-color: rgb(112, 136, 160);
  }
  .selected-text {
    color: white;
  }
  .selected-text:hover {
    color: white;
  }
  .dropDown-disabled {
    background-color: #11253b;
    border: none;
    color: #A0ACBD;
    box-sizing: border-box
  }
  .wwt-input {
    background: #163352;
    border: 1px solid #99ABBE;
    color: #F6F9FC;
  }
}
</style>
