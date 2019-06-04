<template>
  <div id="VueInputUi" class="vue-input-ui">
    <div class="container">
      <div class="component-container">
        <VueInputUi label="Insert your address" hint="is required" required loader/>
      </div>
    </div>
  </div>
</template>

<script>
import VueInputUi from "./indexAuth.vue";
export default {
  name: "Auth",
  components: {
    VueInputUi
  },
  props: {
    msg: String
  }
};
</script>

<style lang="scss">
@import "./src/assets/main.scss";
#VueInputUi {
  min-height: 100%;
  &.dark {
    background-color: darken(#424242, 20%);
    .container {
      color: white;
    }
    header {
      color: rgba(255, 255, 255, 0.7);
    }
  }
}
.container {
  width: 80%;
  margin: 0 auto;
  text-align: center;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
*,
*::before,
*::after {
  box-sizing: border-box;
}
.btn {
  padding: 10px 20px;
  margin-bottom: 20px;
  border: none;
  border-radius: 4px;
  font-size: 12px;
  outline: none;
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);
  background-color: #96bf31;
  color: #fff;
  font-weight: 500;
  &:hover {
    background-color: darken(#96bf31, 10%);
    box-shadow: 0 0 8px 0 rgba(232, 237, 250, 0.6),
      0 2px 4px 0 rgba(232, 237, 250, 0.5);
  }
  &.option {
    background-color: #424242;
    &:hover {
      background-color: darken(#424242, 10%);
    }
  }
}
.component {
  padding: 10px;
  background: #fff;
  border-radius: 4px;
  border: 1px solid #ebebeb;
  &:hover {
    box-shadow: 0 0 8px 0 rgba(232, 237, 250, 0.6),
      0 2px 4px 0 rgba(232, 237, 250, 0.5);
  }
  &.options {
    margin-bottom: 20px;
  }
}
.component-container {
  padding: 10px;
  background: #fff;
  border-radius: 4px;
  border: 1px solid #ebebeb;
  transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);
  flex: 1 0 48%;
  &:hover {
    box-shadow: 0 0 8px 0 rgba(232, 237, 250, 0.6),
      0 2px 4px 0 rgba(232, 237, 250, 0.5);
  }
  &.dark {
    background-color: darken(#424242, 10%);
    color: #fff;
    .btn {
      &:hover {
        box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.6), 0 2px 4px 0 rgba(0, 0, 0, 0.5);
      }
      &.option {
        background-color: #424242;
        &:hover {
          background-color: lighten(#424242, 10%);
        }
      }
    }
  }
}
</style>