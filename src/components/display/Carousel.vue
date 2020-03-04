<template>
  <div class="carousel">
    <client-only>
      <div v-swiper:swiperCarousel="swiperOption">
        <div class="swiper-wrapper">
          <div class="swiper-slide">
            <img src="/assets/img/bauhaus1.jpg" alt="bauhaus1" />
          </div>
          <div class="swiper-slide">
            <img src="/assets/img/bauhaus2.jpg" alt="bauhaus2" />
          </div>
          <div class="swiper-slide">
            <img src="/assets/img/bauhaus3.jpg" alt="bauhaus3" />
          </div>
          <div class="swiper-slide">
            <img src="/assets/img/bauhaus4.jpg" alt="bauhaus4" />
          </div>
          <div class="swiper-slide">
            <img src="/assets/img/bauhaus5.jpg" alt="bauhaus5" />
          </div>
          <div class="swiper-slide">
            <img src="/assets/img/bauhaus6.jpg" alt="bauhaus6" />
          </div>
        </div>
      </div>
    </client-only>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      swiperOption: {
        slidesPerView: "auto",
        spaceBetween: 40
      }
    };
  }
};
</script>

<style lang="sass" scoped>
.carousel
  &::v-deep .swiper-container
    overflow: visible !important

  .swiper-slide
    @apply bg-lightGrey
    height: 240px
    width: 360px

    @screen lg
      height: 455px

    &:nth-child(2n)
      width: 280px
      @screen lg
        width: 660px

    &:nth-child(3n)
      width: 200px
      @screen lg
        width: 480px

    img
      @apply object-cover w-full h-full
</style>
