<template>
  <div
    ref="parent"
    :class="[
      {
        'is-focused': isFocus || valid,
        'has-value': value,
        'has-error': error,
        'is-disabled': disabled,
        'is-dark': dark,
        'has-hint': hint && !value
      },
      size
    ]"
    class="field vue-input-ui"
    @click="focusInput"
  >
    <input
      v-if="!textarea"
      :id="address"
      ref="VueInputUi"
      v-model="address"
      required
      v-bind="$attrs"
      :placeholder="labelValue"
      :style="[borderStyle]"
      :type="type"
      class="field-input"
      @focus="onFocus"
      @blur="onBlur"
      @click="$emit('click')"
<<<<<<< HEAD
    >
=======
    />
>>>>>>> d5b1019b4740220d4ea0c0400cc0de1ae3259902
    <textarea
      v-else
      :id="id"
      ref="VueInputUi"
      v-model="inputValue"
      v-bind="$attrs"
      :placeholder="labelValue"
      :style="[borderStyle]"
      :type="type"
      class="field-input textarea"
      @focus="onFocus"
      @blur="onBlur"
      @click="$emit('click')"
    />
    <label
      ref="label"
      :for="id"
      :class="error ? 'lm-text-danger' : null"
      :style="[colorStyle]"
      class="field-label"
      @click="focusInput"
<<<<<<< HEAD
    >{{ hintValue || labelValue }}</label>
    <div v-if="loader" class="loader" :class="{ textarea }"/>
    <button v-bind="$attrs" class="btn" style="margin-top: 20px;" @click="isConnected">Connect</button>
=======
      >{{ hintValue || labelValue }}</label
    >
    <div v-if="loader" class="loader" :class="{ textarea }" />
    <button
      v-bind="$attrs"
      class="btn w3-hover-opacity"
      style="margin-top: 20px; margin-right: 5px"
      @click="isConnected"
    >
      Connect
    </button>
    <button
      v-bind="$attrs"
      class="btn w3-hover-opacity"
      style="margin-top: 20px; margin-left: 5px; background-color: #f44336"
      @click="disconnect"
    >
      Disconnect
    </button>
>>>>>>> d5b1019b4740220d4ea0c0400cc0de1ae3259902
  </div>
</template>

<script>
<<<<<<< HEAD
=======
import { store } from "../store.js";
import * as Cookies from "js-cookie";

>>>>>>> d5b1019b4740220d4ea0c0400cc0de1ae3259902
export default {
  name: "VueInputUi",
  props: {
    value: { type: [String, Number], default: null },
    label: { type: String, default: "Enter text" },
    hint: { type: String, default: String },
    error: { type: Boolean, default: Boolean },
    color: { type: String, default: "yellowgreen" },
    disabled: { type: Boolean, default: false },
    dark: { type: Boolean, default: false },
    id: { type: String, default: "VueInputUi" },
    size: { type: String, default: String },
    type: { type: String, default: "text" },
    readonly: { type: Boolean, default: false },
    valid: { type: Boolean, default: false },
    validColor: { type: String, default: "yellowgreen" },
    required: { type: Boolean, default: false },
    textarea: { type: Boolean, default: false },
    loader: { type: Boolean, default: false }
  },
  data: function() {
    return {
      isFocus: false,
      address: "",
<<<<<<< HEAD
      status: false
=======
      status: false,
      keys: ""
>>>>>>> d5b1019b4740220d4ea0c0400cc0de1ae3259902
    };
  },
  computed: {
    borderStyle() {
      const cond = (this.isFocus && !this.error) || this.valid;
      return cond
        ? {
            border: `1px solid ${
              this.valid ? this.validColor : this.color
            } !important`
          }
        : null;
    },
    colorStyle() {
      const cond = this.isFocus || this.valid;
      return cond
        ? { color: `${this.valid ? this.validColor : this.color}` }
        : null;
    },
    labelValue() {
      let label = this.label;
      if (this.required && label) {
        label += ``;
      }
      return label;
    },
    hintValue() {
      let hint = this.hint;
      if (this.required && hint) {
        hint += ` *`;
      }
      return hint;
<<<<<<< HEAD
=======
    },
    st() {
      return store.state.status;
    },
    ad() {
      return store.state.address;
>>>>>>> d5b1019b4740220d4ea0c0400cc0de1ae3259902
    }
  },
  methods: {
    focusInput() {
      this.$refs.VueInputUi.focus();
    },
    onFocus: function() {
      this.$emit("focus");
      this.isFocus = true;
    },
    onBlur: function() {
      this.$emit("blur");
      this.isFocus = false;
    },
    isConnected: function() {
      let data = {
<<<<<<< HEAD
        address: this.address,
        status: this.status
      };
      const eztz = window.eztz;
      eztz.node.setProvider("http://localhost:18731");
      console.log(data.address);
      let check = eztz.crypto.checkAddress(data.address);
      console.log(check);
      if (check == true) {
        eztz.rpc
          .getBalance(data.address)
=======
        addrss: this.address,
        stats: this.status
      };
      const eztz = window.eztz;
      eztz.node.setProvider("http://localhost:18731");
      console.log(data.addrss);
      let check = eztz.crypto.checkAddress(data.addrss);

      console.log(check);
      if (check == true) {
        eztz.rpc
          .getBalance(data.addrss)
>>>>>>> d5b1019b4740220d4ea0c0400cc0de1ae3259902
          .then(function(res) {
            console.log(res);
          })
          .catch(function(e) {
            console.log(e);
          });
<<<<<<< HEAD
        data.status = check;
      }
=======
        data.stats = check;
        Cookies.set("status", data.stats);
        Cookies.set("address", data.addrss);
        window.location.reload(true);
      }

      //keys generated for escrow..
      Cookies.set("escrowPhk", "tz1SL1KC6TwEuaMtSXLM7P51DFekbzytRX2z");
      console.log(this.keys);
    },
    disconnect: function() {
      Cookies.remove("address");
      Cookies.remove("status");
      Cookies.remove("cookAcc");
      window.location.reload(true);
>>>>>>> d5b1019b4740220d4ea0c0400cc0de1ae3259902
    }
  }
};
</script>

<style lang="scss" scoped>
*,
*::before,
*::after {
  box-sizing: border-box;
}
.field.vue-input-ui {
  position: relative;
  &.is-dark {
    .field-label {
      color: rgba(white, 0.7);
    }
    .field-input {
      background-color: #000000;
      border-color: rgba(white, 0.7);
      color: rgba(white, 0.7);
    }
    &.is-disabled {
      .field-label,
      .field-input {
        color: #000;
      }
    }
    .field-clear {
      color: rgba(white, 0.7);
    }
  }
  .field-label {
    position: absolute;
    top: 4px;
    cursor: pointer;
    left: 13px;
    -webkit-transform: translateY(25%);
    transform: translateY(25%);
    opacity: 0;
    -webkit-transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);
    transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);
    font-size: 11px;
    color: rgba(0, 0, 0, 0.54);
  }
  .field-input {
    cursor: pointer;
    -webkit-transition-duration: 0.3s;
    transition-duration: 0.3s;
    position: relative;
    width: 100%;
    padding: 0 12px;
    font-weight: 400;
    -webkit-appearance: none;
    outline: none;
    border-radius: 4px;
    font-size: 14px;
    z-index: 0;
<<<<<<< HEAD
=======

>>>>>>> d5b1019b4740220d4ea0c0400cc0de1ae3259902
    &:not(.textarea) {
      height: 42px;
      min-height: 42px;
    }
    &.textarea {
      padding: 8px 12px 0 12px;
      min-height: 88px !important;
      resize: vertical;
    }
  }
<<<<<<< HEAD
  .field-clear {
    $clear-size: 24px;
=======

  .field-clear {
    $clear-size: 24px;

>>>>>>> d5b1019b4740220d4ea0c0400cc0de1ae3259902
    position: absolute;
    top: 0;
    bottom: 0;
    right: 8px;
    margin: auto 0;
    width: $clear-size;
    height: $clear-size;
    appearance: none;
    border: none;
    background: transparent;
    color: rgba(0, 0, 0, 0.54);
    border-radius: $clear-size;
    cursor: pointer;
<<<<<<< HEAD
    &:focus {
      outline: none;
    }
=======

    &:focus {
      outline: none;
    }

>>>>>>> d5b1019b4740220d4ea0c0400cc0de1ae3259902
    &:hover {
      color: white;
    }
  }
<<<<<<< HEAD
=======

>>>>>>> d5b1019b4740220d4ea0c0400cc0de1ae3259902
  &.has-value {
    .field-label {
      opacity: 1;
      -webkit-transform: translateY(0);
      transform: translateY(0);
      font-size: 11px;
    }
    .field-input {
      padding-top: 14px;
      &.textarea {
        padding-top: 20px;
      }
    }
  }
  &.has-hint {
    .field-label {
      opacity: 1;
      transform: translateY(0);
      font-size: 11px;
    }
    .field-input {
      padding-top: 14px;
      &.textarea {
        padding-top: 20px;
      }
    }
  }
  &.is-focused {
    .field-input {
      border-color: dodgerblue;
    }
    .field-label {
      color: dodgerblue;
    }
  }
  &.has-error {
    .field-input {
      border-color: orangered !important;
    }
  }
  &.is-disabled {
    .field-input {
      border-color: #ccc;
      background: #f2f2f2;
    }
    .field-label,
    .field-input {
      cursor: default;
    }
  }
  .lm-text-danger {
    color: orangered !important;
  }
  &.is-dark {
    ::-webkit-input-placeholder {
      /* WebKit, Blink, Edge */
      color: rgba(white, 0.7);
    }
    :-moz-placeholder {
      /* Mozilla Firefox 4 to 18 */
      color: rgba(white, 0.7);
      opacity: 1;
    }
    ::-moz-placeholder {
      /* Mozilla Firefox 19+ */
      color: rgba(white, 0.7);
      opacity: 1;
    }
    :-ms-input-placeholder {
      /* Internet Explorer 10-11 */
      color: rgba(white, 0.7);
    }
    ::-ms-input-placeholder {
      /* Microsoft Edge */
      color: rgba(white, 0.7);
    }
    ::placeholder {
      /* Most modern browsers support this now. */
      color: rgba(white, 0.7);
    }
    &.is-disabled {
      ::-webkit-input-placeholder {
        /* WebKit, Blink, Edge */
        color: #424242;
      }
      :-moz-placeholder {
        /* Mozilla Firefox 4 to 18 */
        color: #424242;
        opacity: 1;
      }
      ::-moz-placeholder {
        /* Mozilla Firefox 19+ */
        color: #424242;
        opacity: 1;
      }
      :-ms-input-placeholder {
        /* Internet Explorer 10-11 */
        color: #424242;
      }
      ::-ms-input-placeholder {
        /* Microsoft Edge */
        color: #424242;
      }
      ::placeholder {
        /* Most modern browsers support this now. */
        color: #424242;
      }
    }
  }
  &.sm {
    .field-input {
      font-size: 12px;
<<<<<<< HEAD
=======

>>>>>>> d5b1019b4740220d4ea0c0400cc0de1ae3259902
      &:not(.textarea) {
        height: 36px;
        min-height: 36px;
      }
    }
    .field-label {
      font-size: 10px;
    }
    &.has-value {
      .field-input {
        padding-top: 12px;
        &.textarea {
          padding-top: 18px;
        }
      }
    }
  }
  &.lg {
    .field-input {
      font-size: 16px;
<<<<<<< HEAD
=======

>>>>>>> d5b1019b4740220d4ea0c0400cc0de1ae3259902
      &:not(.textarea) {
        height: 48px;
        min-height: 48px;
      }
    }
    .field-label {
      font-size: 14px;
    }
    &.has-value {
      .field-input {
        padding-top: 16px;
        &.textarea {
          padding-top: 26px;
        }
      }
    }
  }
  .loader {
    top: -2px;
    height: 4px;
    width: 100%;
    position: relative;
    overflow: hidden;
    border-radius: 2px;
<<<<<<< HEAD
    &.textarea {
      top: -7px;
    }
=======

    &.textarea {
      top: -7px;
    }

>>>>>>> d5b1019b4740220d4ea0c0400cc0de1ae3259902
    &::before {
      display: block;
      position: absolute;
      content: "";
      left: -200px;
      width: 200px;
      height: 4px;
      background-color: rgba(rgb(81, 255, 0), 0.2);
      animation: loading 3s linear infinite;
    }
  }
<<<<<<< HEAD
=======

>>>>>>> d5b1019b4740220d4ea0c0400cc0de1ae3259902
  @keyframes loading {
    from {
      left: -200px;
      width: 30%;
    }
<<<<<<< HEAD
    50% {
      width: 30%;
    }
    70% {
      width: 70%;
    }
    80% {
      left: 50%;
    }
    95% {
      left: 120%;
    }
=======

    50% {
      width: 30%;
    }

    70% {
      width: 70%;
    }

    80% {
      left: 50%;
    }

    95% {
      left: 120%;
    }

>>>>>>> d5b1019b4740220d4ea0c0400cc0de1ae3259902
    to {
      left: 100%;
    }
  }
  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
    box-shadow: 0 0 0 30px white inset;
    -webkit-box-shadow: 0 0 0 30px white inset;
  }
  &.is-dark {
    input:-webkit-autofill,
    input:-webkit-autofill:hover,
    input:-webkit-autofill:focus,
    input:-webkit-autofill:active {
      box-shadow: 0 0 0 30px #424242 inset;
      -webkit-box-shadow: 0 0 0 30px #424242 inset;
    }
    input:-webkit-autofill {
      -webkit-text-fill-color: rgba(white, 0.7) !important;
    }
  }
}
<<<<<<< HEAD
</style>
=======
</style>
>>>>>>> d5b1019b4740220d4ea0c0400cc0de1ae3259902
