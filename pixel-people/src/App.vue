<template>
  <div>
    <vdapp-board />
    <div class="app">
      <NavBar />
      <div class="nav-space"></div>
      <router-view />
      <!-- <div class="footer-space"></div>
      <Footer /> -->
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import Footer from "@/components/Footer.vue";
export default {
  components: { NavBar, Footer },
};
</script>

<style>
.nav-space {
  height: 6.4rem;
  background-color: #1A1932;
}
.app {
  overflow: hidden;
}
</style>
