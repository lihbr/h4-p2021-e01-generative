<template>
  <div
    class="webglForm top-0 left-0 w-full h-screen pointer-events-none overflow-hidden"
  >
    <div ref="container" class="webgl" :class="{ hidden: !inited }">
      <canvas class="canvas absolute top-0 left-0 w-full h-screen" />
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
      const WorldForm = (await import("~/assets/js/webgl/World/Form")).default;

      this.$options._application = new Application(
        this.$refs.container,
        WorldForm
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
