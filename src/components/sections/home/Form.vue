<template>
  <div id="form" class="form relative bg-lightGrey pt-16 pb-gut">
    <container>
      <h2 class="text-center heading-h1 mb-semicol">
        Mon écocup
      </h2>
      <p class="text-center leading-snug max-w-col-6 mx-auto">
        Selectionnez un menu, une boisson et un pays afin de générer votre
        ecocup, unique et tellement vous !<br />Disponible dans tous les
        restaurants participants.
      </p>
      <form action="">
        TODO: Form
      </form>
    </container>
    <webgl-form class="h-60vh relative" />
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
