<template>
  <footer class="footer">
    <container>
      <div
        class="w-col-3 lg:w-col-4 max-w-full px-gut-1/2 mx-auto mt-8 mb-6 text-grey"
      >
        <div class="flex justify-between lg:justify-center items-center">
          <ul class="-mx-2 overflow-hidden mr-5/2 flex">
            <li class="px-2">
              <smart-link blank href="https://twitter.com/mcdonaidsfr">
                <twitter-svg class="fill-current h-4 w-4" />
              </smart-link>
            </li>
            <li class="px-2">
              <smart-link
                blank
                href="https://www.instagram.com/mcdonaldsfrance"
              >
                <instagram-svg class="fill-current h-4 w-4" />
              </smart-link>
            </li>
            <li class="px-2">
              <smart-link blank href="https://www.facebook.com/mcdonaldsfrance">
                <facebook-svg class="fill-current h-4 w-4" />
              </smart-link>
            </li>
          </ul>
          <smart-link
            blank
            class="font-medium"
            href="https://www.mcdonalds.fr/"
          >
            Official Website
          </smart-link>
        </div>
        <div class="h-px bg-grey mb-3 mt-gut-1/2" />
        <ul class="uppercase text-2xs text-center -mx-3 overflow-hidden">
          <li class="inline-block hover:underline">
            <smart-link
              blank
              href="https://www.mcdonalds.fr/mentions-legales"
              class="px-3"
            >
              Mentions Légales
            </smart-link>
          </li>
          <li class="inline-block hover:underline">
            <smart-link
              blank
              href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
              class="px-3"
            >
              Hétic
            </smart-link>
          </li>
        </ul>
      </div>
    </container>
  </footer>
</template>

<script>
import TwitterSvg from "~/assets/icons/twitter.svg";
import InstagramSvg from "~/assets/icons/instagram.svg";
import FacebookSvg from "~/assets/icons/facebook.svg";

export default {
  components: {
    TwitterSvg,
    InstagramSvg,
    FacebookSvg
  }
};
</script>
