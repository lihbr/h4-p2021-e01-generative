<template>
  <div class="hero bg-lightGrey">
    <container class="min-h-screen lg:pt-32 pb-16">
      <webgl-hero class="h-60vh lg:h-screen relative lg:absolute" />
      <div class="-mx-gut-1/2 overflow-hidden relative z-1">
        <div class="lg:w-col-6 px-gut-1/2">
          <h1 class="heading-h1 mb-8 text-center lg:text-left">
            MCDONALD’S X JO PARIS 2024
          </h1>
          <p class="text-p mb-8">
            Une fois de plus, McDonald’s est le
            <strong>partenaire officiel</strong> des Jeux Olympiques. À cette
            occasion, du 26 juillet au 11 août 2024, votre restaurant favori
            vous offre un <strong>ecocup en édition limitée</strong>.
          </p>
          <p class="text-p mb-8">
            Mieux encore,
            <strong>le design de votre ecocup se génère</strong> en fonction de
            votre menu, votre boisson, et votre pays favori ! Des designs
            exclusifs, pour un évènement unique.
          </p>
          <p class="text-p mb-12">
            Ces gobelets,
            <strong>réutilisables et entièrement recyclable</strong>,
            s’inscrivent dans la vision écologique portée par Paris pour les JO
            2024. Ensemble, agissons pour la planète.
          </p>
          <smart-link
            class="underline text-green text-2xl font-medium font-sub text-center lg:text-left block cursor-pointer"
            @click.native.prevent.stop="scrollTo('#form')"
          >
            Créez le vôtre
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
