<template>
  <div class="home">
    <home-hero />
    <home-about />
    <home-form />
  </div>
</template>

<script>
import HomeHero from "~/components/sections/home/Hero.vue";
import HomeAbout from "~/components/sections/home/About.vue";
import HomeForm from "~/components/sections/home/Form.vue";

export default {
  components: {
    HomeHero,
    HomeAbout,
    HomeForm
  },
  mounted() {
    this.$store.dispatch("pageChanged");
  }
};
</script>

<style lang="sass" scoped></style>
