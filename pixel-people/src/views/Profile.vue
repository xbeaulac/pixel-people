<template>
  <section class="profile">
    <div class="profile-bar">
      <div class="profile-bar-content">
        <div class="profile-pic">
          <img src="@/assets/pp/30.gif" alt="Profile Picture" />
        </div>
        <div class="profile-text">
          <p class="profile-name">Somebody Somewhere</p>
          <p class="profile-address">0x1234567890123456</p>
        </div>
      </div>
    </div>
    <div class="container profile-gallery">
      <div class="card-grid">
        <Card v-for="nft in images" :key="nft.id" :nft="nft" :nfts="images" />
      </div>
    </div>
  </section>
</template>

<script>
import Card from "@/components/Card.vue";
import { ref } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";
export default {
  components: { Card },
  setup() {
    onMounted(() => {
      window.scrollTo(0, 0);
    });

    const images = ref([
      {
        src: require("../assets/pp/25.gif"),
        id: 1,
        name: "Erckle Bernishtan",
        owner: "Xander B",
        selected: false,
        canBuy: false,
      },
      {
        src: require("../assets/pp/19.gif"),
        id: 2,
        name: "Abraham Fooley",
        owner: "Xander B",
        selected: false,
        canBuy: true,
      },
      {
        src: require("../assets/pp/27.gif"),
        id: 3,
        name: "Chris Coolage",
        owner: "Xander B",
        selected: false,
        canBuy: true,
      },
      {
        src: require("../assets/pp/18.gif"),
        id: 4,
        name: "Jeramy Demques",
        owner: "Xander B",
        selected: false,
        canBuy: true,
      },
      {
        src: require("../assets/pp/29.gif"),
        id: 5,
        name: "Alex Burn",
        owner: "Xander B",
        selected: false,
        canBuy: false,
      },
      {
        src: require("../assets/pp/22.gif"),
        id: 6,
        name: "Joey Hall",
        owner: "Xander B",
        selected: false,
        canBuy: false,
      },
    ]);

    return { images };
  },
};
</script>

<style>
.profile {
  background-color: #1a1932;
}

/* Profile Bar */
.profile-bar {
  padding: 1.6rem 3.2rem;
}
.profile-bar-content {
  max-width: 128rem;
  display: grid;
  grid-template-columns: 12.8rem auto;
  gap: 3.2rem;
  align-items: start;
}
.profile-pic {
  overflow: hidden;
  width: 12.8rem;
  height: 12.8rem;
  border-radius: 9999px;
}
.profile-pic img {
  display: block;
  width: 100%;
  transition: all 0.25s;
}
.profile-pic img:hover {
  transform: scale(1.1);
}

.profile-name {
  font-size: 7.4rem;
  font-weight: 500;
  line-height: 1;
  margin-bottom: 0.8rem;
}
.profile-address {
  font-size: 3rem;
  font-weight: 400;
  line-height: 1.4;
  color: #92a1b9;
}

.container.profile-gallery {
  padding: 3.2rem;
}
</style>
