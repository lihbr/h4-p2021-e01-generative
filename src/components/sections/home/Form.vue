<template>
  <div id="form" class="form relative bg-lightGrey pt-16 pb-gut">
    <container>
      <h2 class="text-center heading-h1 mb-semicol">
        Mon écocup
      </h2>
      <p
        v-if="currentStep < steps.length"
        class="text-center leading-snug max-w-col-6 mx-auto"
      >
        Selectionnez un menu, une boisson et un pays afin de générer votre
        ecocup, unique et tellement vous !<br />Disponible dans tous les
        restaurants participants.
      </p>
      <form id="form-el" action="" class="mt-10">
        <header class="header">
          <transition name="fade" mode="out-in">
            <div
              v-if="currentStep < steps.length"
              key="steps"
              class="flex justify-around mb-10"
            >
              <div
                v-for="(step, index) in steps"
                :key="step.name"
                :class="{ 'opacity-50': index > currentStep }"
                class="pointer-events-none transition-opacity"
              >
                <div
                  class="rounded-full border-2 border-green flex items-center justify-center text-green w-10 h-10 font-bold mx-auto mb-1"
                >
                  {{ index + 1 }}
                </div>
                <div class="font-sub text-green">
                  {{ step.name }}
                </div>
              </div>
            </div>
            <div v-else key="final" class="text-center">
              <div class="text-2xl text-green font-sub">
                Et voila !
              </div>

              <div>
                Voici un exemple d'écocup unique que vous pouvez avoir en
                commandant ce menu
              </div>
            </div>
          </transition>
        </header>
        <div class="formContent font-sub">
          <transition name="fade" mode="out-in">
            <div
              v-if="currentStep === 0"
              key="step-1"
              class="flex flex-wrap -m-5 overflow-hidden"
            >
              <div
                v-for="menu in menus"
                :key="menu.name"
                class="w-full sm:w-1/2 lg:w-1/3 text-center text-xl p-5"
              >
                <div
                  class="h-full flex flex-col justify-between text-grey hover:text-green cursor-pointer rounded-lg hover:bg-grey-o-5 p-5/2"
                  @click="setMenu(menu.name)"
                >
                  <div class="wrapper">
                    <div class="mb-5">
                      {{ menu.name }}
                    </div>
                    <div>
                      <img
                        :src="menu.img"
                        :alt="menu.name"
                        class="h-col-1 md:h-col-2 mx-auto mb-5 object-contain"
                      />
                    </div>
                  </div>
                  <div class="rounded bg-yellow text-center py-2 text-white">
                    Choisir
                  </div>
                </div>
              </div>
            </div>
            <div
              v-if="currentStep === 1"
              key="step-2"
              class="flex flex-wrap -m-5 overflow-hidden"
            >
              <div
                v-for="drink in drinks"
                :key="drink.name"
                class="w-full sm:w-1/2 lg:w-1/3 text-center text-xl p-5"
              >
                <div
                  class="h-full flex flex-col justify-between text-grey hover:text-green cursor-pointer rounded-lg hover:bg-grey-o-5 p-5/2"
                  @click="setDrink(drink.name)"
                >
                  <div class="wrapper">
                    <div class="mb-5">
                      {{ drink.name }}
                    </div>
                    <div>
                      <img
                        :src="drink.img"
                        :alt="drink.name"
                        class="h-col-1 md:h-col-2 max-w-32 mx-auto mb-5 object-contain"
                      />
                    </div>
                  </div>
                  <div class="rounded bg-yellow text-center py-2 text-white">
                    Choisir
                  </div>
                </div>
              </div>
            </div>
            <div
              v-if="currentStep === 2"
              key="step-3"
              class="flex flex-wrap -m-5 overflow-hidden"
            >
              <div
                v-for="country in countries"
                :key="country.name"
                class="w-1/2 sm:w-1/3 xl:w-1/6 text-center text-xl p-5"
              >
                <div
                  class="h-full flex flex-col justify-between text-grey hover:text-green cursor-pointer rounded-lg hover:bg-grey-o-5 p-5/2"
                  @click="setCountry(country.name_en)"
                >
                  <div class="wrapper">
                    <div class="mb-5">
                      {{ country.name }}
                    </div>
                    <div>
                      <img
                        :src="country.img"
                        :alt="country.name"
                        class="h-col-1 md:h-col-2 max-w-32 mx-auto mb-5 object-contain"
                      />
                    </div>
                  </div>
                  <div class="rounded bg-yellow text-center py-2 text-white">
                    Choisir
                  </div>
                </div>
              </div>
            </div>
            <webgl-form
              v-else-if="currentStep === 3"
              ref="webgl"
              key="step-3"
              class="h-60vh relative"
              :seed="seed"
              :country="choice.country"
            />
          </transition>
        </div>
      </form>
    </container>
  </div>
</template>

<script>
import md5 from "md5";

import WebglForm from "~/components/sections/home/webgl/Form.vue";

export default {
  components: {
    WebglForm
  },
  data() {
    return {
      currentStep: 0,
      steps: [
        {
          name: "Le menu"
        },
        {
          name: "La boisson"
        },
        {
          name: "Le pays"
        }
      ],
      menus: [
        {
          name: "Le Menu Best Of",
          img: "/assets/img/form/1_bo.png"
        },
        {
          name: "Le Maxi Menu Best Of",
          img: "/assets/img/form/1_mbo.png"
        },
        {
          name: "Le Menu Happy Meal™",
          img: "/assets/img/form/1_hm.png"
        },
        {
          name: "Le Menu McFirst™",
          img: "/assets/img/form/1_mf.png"
        },
        {
          name: "Le Menu Salade",
          img: "/assets/img/form/1_s.png"
        },
        {
          name: "L'offre P'tit Dej'",
          img: "/assets/img/form/1_ptd.png"
        }
      ],
      drinks: [
        {
          name: "COCA-COLA® SANS SUCRES",
          img: "/assets/img/form/2_ccz.png"
        },
        {
          name: "LIPTON® GREEN ICE TEA",
          img: "/assets/img/form/2_git.png"
        },
        {
          name: "SPRITE ® NOUVELLE RECETTE",
          img: "/assets/img/form/2_s.png"
        },
        {
          name: "EVIAN®",
          img: "/assets/img/form/2_e.png"
        },
        {
          name: "BADOIT®",
          img: "/assets/img/form/2_b.png"
        },
        {
          name: "COCA-COLA®",
          img: "/assets/img/form/2_cc.png"
        },
        {
          name: "LIPTON® ICE TEA",
          img: "/assets/img/form/2_it.png"
        },
        {
          name: "MINUTE MAID® ORANGE",
          img: "/assets/img/form/2_mmo.png"
        },
        {
          name: "FANTA® NOUVELLE RECETTE*",
          img: "/assets/img/form/2_f.png"
        }
      ],
      countries: [
        {
          name: "Brésil",
          name_en: "Brazil",
          img: "/assets/img/form/3_br.png"
        },
        {
          name: "Canada",
          name_en: "Canada",
          img: "/assets/img/form/3_ca.png"
        },
        {
          name: "Chine",
          name_en: "China",
          img: "/assets/img/form/3_cn.png"
        },
        {
          name: "France",
          name_en: "France",
          img: "/assets/img/form/3_fr.png"
        },
        {
          name: "Allemagne",
          name_en: "Germany",
          img: "/assets/img/form/3_ger.png"
        },
        {
          name: "Italie",
          name_en: "Italy",
          img: "/assets/img/form/3_it.png"
        },
        {
          name: "Japon",
          name_en: "Japan",
          img: "/assets/img/form/3_jp.png"
        },
        {
          name: "Corée du Sud",
          name_en: "South Korea",
          img: "/assets/img/form/3_kr.png"
        },
        {
          name: "Espagne",
          name_en: "Spain",
          img: "/assets/img/form/3_sp.png"
        },
        {
          name: "Suède",
          name_en: "Sweden",
          img: "/assets/img/form/3_sw.png"
        },
        {
          name: "Angleterre",
          name_en: "United Kingdom",
          img: "/assets/img/form/3_uk.png"
        },
        {
          name: "États-Unis d'Amérique",
          name_en: "United States of America",
          img: "/assets/img/form/3_us.png"
        }
      ],
      choice: {
        menu: "",
        drink: "",
        country: ""
      }
    };
  },
  computed: {
    seed() {
      return md5(JSON.stringify(this.choice));
    }
  },
  methods: {
    setMenu(value) {
      this.choice.menu = value;
      this.currentStep++;
      this.scrollTo("#form-el");
    },
    setDrink(value) {
      this.choice.drink = value;
      this.currentStep++;
      this.scrollTo("#form-el");
    },
    setCountry(value) {
      this.choice.country = value;
      this.currentStep++;
      this.scrollTo("#form-el");
    },
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
          document.documentElement.scrollTop +
          target.getBoundingClientRect().y -
          10,
        left: 0,
        behavior: "smooth"
      });
    }
  }
};
</script>

<style lang="sass" scoped>
.form
  .fade-enter-active,.fade-leave-active
    will-change: opacity
    @apply transition-opacity transition-1/2 pointer-events-none

  .fade-enter, .fade-leave-to
    @apply opacity-0
</style>
