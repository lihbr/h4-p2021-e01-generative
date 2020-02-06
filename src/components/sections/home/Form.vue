<template>
  <div class="form relative min-h-screen bg-yellow">
    <container>
      Form
    </container>
    <webgl-form class="absolute" />
  </div>
</template>

<script>
import WebglForm from "~/components/sections/home/webgl/Form.vue";

export default {
  components: {
    WebglForm
  }
};
</script>
