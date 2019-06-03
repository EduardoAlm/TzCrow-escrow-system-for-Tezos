<template>
  <div>
    <Index></Index>
    <About></About>
  </div>
</template>

<script>
// @ is an alias to /src
import Index from "@/components/Index.vue";
import About from "@/components/mainPage/Aboutus.vue";

export default {
  name: "Home",
  components: {
    Index,
    About
  }
};
</script>
