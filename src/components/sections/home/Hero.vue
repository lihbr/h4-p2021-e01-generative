<template>
  <div class="hero relative bg-green">
    <container class="min-h-screen">
      Hero
    </container>
    <webgl-hero class="absolute" />
  </div>
</template>

<script>
import WebglHero from "~/components/sections/home/webgl/Hero.vue";

export default {
  components: {
    WebglHero
  }
};
</script>
