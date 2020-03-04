<template>
  <div class="hero bg-lightGrey">
    <container class="min-h-screen lg:pt-32 pb-16">
      <webgl-hero class="h-60vh lg:h-screen relative lg:absolute" />
      <div class="-mx-gut-1/2 overflow-hidden relative z-1">
        <div class="lg:w-col-6 px-gut-1/2">
          <h1 class="heading-h1 mb-8 text-center lg:text-left">
            MCDONALD’S X PARIS 2024
          </h1>
          <p class="text-p mb-8">
            Du 1er au 31 Juin, McDonald’s propose une édition limitée et
            auto-générée d’Ecocup sur le thème des Jeux Olympiques de Paris.
          </p>
          <p class="text-p mb-8">
            Chaque semaine des nouveaux thèmes générés automatiquement en
            fonction de votre menu, votre boisson et votre pays favoris. Des
            designs exclusifs pour un événement unique !
          </p>
          <p class="text-p mb-12">
            Ces écocups sont réutilisables et totalement recyclables, ils
            s’intègrent dans la vision écologique portée par Paris pour les JO
            de 2024.
          </p>
          <smart-link
            class="underline text-green text-2xl font-medium font-sub text-center lg:text-left block cursor-pointer"
            @click.native.prevent.stop="scrollTo('#form')"
          >
            Créez le votre
          </smart-link>
        </div>
      </div>
    </container>
  </div>
</template>

<script>
import WebglHero from "~/components/sections/home/webgl/Hero.vue";

export default {
  components: {
    WebglHero
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
