<template>
  <header class="header bg-green lg:bg-lightGrey">
    <container class="flex justify-center h-inherit">
      <smart-link
        class="navItem"
        @click.native.prevent.stop="scrollTo('#about')"
      >
        L'évènement
      </smart-link>
      <div class="logo py-3 lg:py-5 lg:px-10 bg-green">
        <logo-svg class="h-full" />
      </div>
      <smart-link
        class="navItem"
        @click.native.prevent.stop="scrollTo('#form')"
      >
        Votre ecocup
      </smart-link>
    </container>
  </header>
</template>

<script>
import LogoSvg from "~/assets/icons/logo.svg";

export default {
  components: {
    LogoSvg
  },
  methods: {
    scrollTo(id) {
      if (!id) {
        return;
      }

      const target = document.querySelector(id);
      if (!target) {
        return;
      }

      window.scrollTo({
        top:
          document.documentElement.scrollTop + target.getBoundingClientRect().y,
        left: 0,
        behavior: "smooth"
      });
    }
  }
};
</script>

<style lang="sass" scoped>
.header
  height: 70px

  @screen lg
    height: 110px

  .navItem
    @apply flex-1 hidden font-light text-green text-2xl font-sub uppercase cursor-pointer

    @screen lg
      @apply flex items-center justify-center

    &:hover
      @apply underline
</style>
