<template>
  <section class="gallery">
    <div class="gallery-filter-container">
      <!-- <h2 class="h2 gallery-heading">Filter</h2> -->
      <div class="gallery-filter">
        <!-- <router-link
          :to="{ name: 'Mint Background' }"
          class="gallery-filter-btn"
          >Background</router-link
        >
        <router-link :to="{ name: 'Mint Body' }" class="gallery-filter-btn"
          >Body</router-link
        >
        <router-link :to="{ name: 'Mint Head' }" class="gallery-filter-btn"
          >Head</router-link
        >
        <router-link :to="{ name: 'Mint Clothes' }" class="gallery-filter-btn"
          >Clothes</router-link
        >
        <router-link :to="{ name: 'Mint Eye Shape' }" class="gallery-filter-btn"
          >Eye Shape</router-link
        >
        <router-link :to="{ name: 'Mint Eye Color' }" class="gallery-filter-btn"
          >Eye Color</router-link
        >
        <router-link :to="{ name: 'Mint Nose' }" class="gallery-filter-btn"
          >Nose</router-link
        >
        <router-link :to="{ name: 'Mint Mouth' }" class="gallery-filter-btn"
          >Mouth</router-link
        >
        <router-link :to="{ name: 'Mint Eyebrows' }" class="gallery-filter-btn"
          >Eyebrows</router-link
        >
        <router-link :to="{ name: 'Mint Hair' }" class="gallery-filter-btn"
          >Hair</router-link
        >
        <router-link :to="{ name: 'Mint Glasses' }" class="gallery-filter-btn"
          >Glasses</router-link
        >
        <router-link :to="{ name: 'Mint Hat' }" class="gallery-filter-btn"
          >Hat</router-link
        >
        <router-link :to="{ name: 'Mint Accessory' }" class="gallery-filter-btn"
          >Accessory</router-link
        >
        <router-link :to="{ name: 'Mint Action' }" class="gallery-filter-btn"
          >Action</router-link
        > -->
      </div>
    </div>
    <div class="gallery-container">
      <!-- <h2 class="h2 gallery-heading">
        Gallery: 10,000 Pixel People.
      </h2> -->
      <CardGrid :images="images" />
    </div>
  </section>
</template>

<script>
import { ref } from "@vue/reactivity";
import CardGrid from "../components/CardGrid.vue";
import { onMounted } from "@vue/runtime-core";
export default {
  components: { CardGrid },
  setup() {
    onMounted(() => {
      window.scrollTo(0, 0);
    });

    const images = ref([
      {
        src: require("../assets/pp/25.gif"),
        id: 1,
        name: "Erckle Bernishtan",
        number: "4508",
        selected: false,
      },
      {
        src: require("../assets/pp/19.gif"),
        id: 2,
        name: "Abraham Fooley",
        number: "1260",
        selected: false,
      },
      {
        src: require("../assets/pp/27.gif"),
        id: 3,
        name: "Chris Coolage",
        number: "9667",
        selected: false,
      },
      {
        src: require("../assets/pp/18.gif"),
        id: 4,
        name: "Jeramy Demques",
        number: "5013",
        selected: false,
      },
      {
        src: require("../assets/pp/29.gif"),
        id: 5,
        name: "Alex Burn",
        number: "4578",
        selected: false,
      },
      {
        src: require("../assets/pp/22.gif"),
        id: 6,
        name: "Joey Hall",
        number: "2246",
        selected: false,
      },
    ]);

    return { images };
  },
};
</script>

<style scoped>
.gallery {
  background-color: #1a1932;
  max-width: 100vw;
  height: calc(100vh - 5rem - 6.4rem);
  margin: 0 auto;
  display: grid;
  grid-template-columns: auto 1fr;
  overflow: hidden;
}

.gallery-container {
  overflow-y: scroll;
}

.gallery-heading {
  margin: 3.2rem 0 1.6rem 3.2rem;
}

.gallery-filter-container {
  overflow-y: scroll;
  box-shadow: 0.2rem 0 1.6rem 0 rgba(0, 0, 0, 0.18);
  width: 25vw;
}

.gallery-filter {
  background-color: #1a1932;
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 3.2rem;
}

/* Gallery Filter Button (sidebar buttons) */
.gallery-filter-btn:link,
.gallery-filter-btn:visited {
  color: #ffffff;
  text-decoration: none;
  font-size: 2rem;
  padding: 0.8rem 0.8rem 0.8rem 0;
  font-weight: 500;
  letter-spacing: 0.6px;
  transition: all 0.25s;
}
.gallery-filter-btn:hover,
.gallery-filter-btn:active {
  color: #92a1b9;
  transform: translateX(0.4rem);
}
.gallery-filter-btn:hover.selected,
.gallery-filter-btn:active.selected {
  color: #cc9900;
}
.gallery-filter-btn:link:first-child {
  padding-top: 0;
}
.gallery-filter-btn.router-link-active {
  color: #ffc825;
}
.gallery-filter-btn.router-link-active:hover {
  color: #cc9900;
}
</style>
