<template>
  <div id="about" class="about pb-16 pt-10 lg:pt-16 overflow-hidden">
    <container>
      <h2 class="text-center heading-h1 mb-semicol">
        Une série exclusive
      </h2>
      <div class="-mx-gut-1/2 lg:flex">
        <div class="lg:w-col-5 px-gut-1/2">
          <p class="text-p mb-8">
            Pour célébrer ce formidable évènement qui se tiendra en France,
            McDonald’s a créé une série limitée et exclusive de designs
            génératifs.
          </p>
          <p class="text-p mb-8">
            En choisissant un menu, une boisson, et un pays, vous aurez la
            chance de recevoir <strong>un ecocup unique</strong>, en fonction de
            vos préférences.
          </p>
          <div class="slider block lg:hidden mb-10">
            <carousel />
          </div>
          <p class="text-p mb-8">
            Vous l’aurez compris, il existe une
            <strong>infinité de combinaisons</strong>, et par conséquent, une
            infinité de designs différents pour vos gobelets !
          </p>
          <p class="text-p mb-8">
            Pour encore plus de diversité, de
            <strong>nouveaux motifs et formes</strong> seront introduits jour
            après jour. Il n’y a aucune chance que vos proches aient le même
            gobelet que vous, alors, chérissez-le !
          </p>
          <p class="text-p mb-12">
            Préparez-vous pour ce mois placé sous le signe des Jeux Olympiques
            et de la ville Lumière !
          </p>
        </div>
        <div class="flex-1 px-gut-1/2 h-col-6 lg:h-auto">
          <div class="-mx-gut-1/2 overflow-hidden h-full flex">
            <div class="w-60p lg:w-col-3 xl:w-col-4 px-gut-1/2">
              <div class="flex flex-col h-full">
                <div class="flex-1 bg-lightGrey mb-gut-1/2">
                  <img
                    src="/assets/img/maxBill1.jpg"
                    alt="Max Bill 1"
                    class="h-full w-full object-cover"
                  />
                </div>
                <div class="flex-1 bg-lightGrey">
                  <img
                    src="/assets/img/maxBill2.jpg"
                    alt="Max Bill 2"
                    class="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>
            <div class="flex-1 pr-gut-1/2">
              <div class="bg-lightGrey h-full">
                <img
                  src="/assets/img/paris2024.jpg"
                  alt="Paris 2024"
                  class="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="hidden lg:block mt-16">
        <carousel />
      </div>
      <smart-link
        class="mt-16 lg:mt-20 underline text-green text-2xl font-medium font-sub text-center block cursor-pointer"
        @click.native.prevent.stop="scrollTo('#form')"
      >
        Créez le votre
      </smart-link>
    </container>
  </div>
</template>

<script>
import Carousel from "~/components/display/Carousel.vue";

export default {
  components: {
    Carousel
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
