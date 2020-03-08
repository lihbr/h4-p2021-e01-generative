<template>
  <div class="generator flex items-center justify-center h-screen">
    <div class="wrapper">
      <canvas ref="canvas" class="canvas" width="1900" height="1150" />
      <label for="seed">Seed:</label>
      <input id="seed" ref="input" v-model="seed" type="text" />
      <button
        class="bg-black text-white px-1 opacity-70 hover:opacity-100"
        @click="seed = '' + Math.random()"
      >
        Random
      </button>
      <button
        class="bg-black text-white px-1 opacity-70 hover:opacity-100"
        @click="download"
      >
        Download
      </button>
    </div>
  </div>
</template>

<script>
import Generator from "~/assets/js/webgl/Core/Generator";

export default {
  layout: "blank",
  data() {
    return {
      seed: ""
    };
  },
  watch: {
    seed: {
      handler() {
        this.$router.replace(`/generator/${this.seed}`);
        this.updateCanvas();
      }
    }
  },
  mounted() {
    this.seed = this.$route.params.seed || Math.random();
    this.$refs.input.focus();
    this.$options.data.generator = new Generator("PARIS 2024");
    this.updateCanvas();
  },
  methods: {
    updateCanvas() {
      if (!this.$refs.canvas) {
        return;
      }

      const img = this.$options.data.generator.generate(this.seed, "Germany");

      const ctx = this.$refs.canvas.getContext("2d");

      ctx.putImageData(img, 0, 0);
    },
    download() {
      const link = document.createElement("a");
      link.download = `generator_${this.seed}.png`;
      link.href = this.$refs.canvas.toDataURL("image/png");
      link.click();
    }
  }
};
</script>

<style lang="sass" scoped>
.generator
  .canvas
    background: #bbbbaa
    width: 950px
    height: 575px
</style>
