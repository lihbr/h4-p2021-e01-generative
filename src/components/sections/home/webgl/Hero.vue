<template>
  <div
    class="webglHero top-0 left-0 w-full pointer-events-none overflow-hidden"
  >
    <div ref="container" :class="{ hidden: !inited }">
      <canvas class="webgl absolute top-0 left-0 w-full h-full" />
      <canvas class="ctx2d hidden" width="1900" height="1150" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      inited: false
    };
  },
  async mounted() {
    if (typeof window === "undefined") return;
    await import("~/assets/js/modernizr");
    this.inited = true;
    this.$options._supportWebGl =
      window.Modernizr.canvas &&
      window.Modernizr.webgl &&
      this.$store.state.detect.browser !== "isExplorer";
    if (this.$options._supportWebGl) {
      const Application = (await import("~/assets/js/webgl/Application"))
        .default;
      const WorldHero = (await import("~/assets/js/webgl/World/Hero")).default;

      this.$options._application = new Application(
        this.$refs.container,
        WorldHero,
        "duo"
      );
    }
  },
  destroyed() {
    if (this.$options._supportWebGl) {
      this.$options._application.destructor();
    }
  }
};
</script>

<style lang="sass" scoped>
.ctx2d
  transform-origin: 0 0
  transform: scale(0.5)
</style>
