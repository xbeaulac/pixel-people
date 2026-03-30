<template>
  <div>
    <section class="mint">
      <div class="mint-nav">
        <button
          v-for="type in featureType"
          :key="type.dir"
          @click="query = ['type', '==', type.dir]"
          class="mint-nav-link"
          :class="{ selected: query[2] === type.dir }"
        >
          {{ type.name }}
        </button>
      </div>
      <CardGrid :collection="'features'" :query="query" :key="renderId" />
      <button
        @click="query = ['type', '==', nextFeature]"
        class="mint-nav-btn icon"
      >
        <div class="mint-icon" v-if="query[2] === 'hat'">
          <span class="material-icons icon">shopping_cart</span>
        </div>
        <div class="mint-icon" v-else>
          <span class="material-icons icon">arrow_forward</span>
        </div>
      </button>
    </section>
  </div>
  <!-- </div> -->
</template>

<script>
import { computed, onMounted, ref, watch } from "@vue/runtime-core";
import CardGrid from "@/components/CardGrid.vue";
import getUser from "@/composables/getUser";
import getCollection from "@/composables/getCollection";
import { useRouter } from "vue-router";
export default {
  components: { CardGrid },
  setup() {
    const router = useRouter();
    const { user } = getUser();
    const query = ref(["type", "==", "bg"]);
    const renderId = ref(0);

    onMounted(() => {
      window.scrollTo(0, 0);
    });

    watch(user, () => {
      if (!user.value) {
        router.push({ name: "Home" });
      }
    });

    watch(query, () => {
      renderId.value++;
    });

    const isDisabled = ref(false);

    const nextFeature = computed(() => {
      let next;
      switch (query.value[2]) {
        case "bg":
          next = "body";
          break;
        case "body":
          next = "head";
          break;
        case "head":
          next = "clothes";
          break;
        case "clothes":
          next = "eyes";
          break;
        case "eyes":
          next = "nose";
          break;
        case "nose":
          next = "mouth";
          break;
        case "mouth":
          next = "eyebrows";
          break;
        case "eyebrows":
          next = "hair";
          break;
        case "hair":
          next = "glasses";
          break;
        case "glasses":
          next = "hat";
          break;
      }
      return next;
    });

    const featureType = [
      { name: "Background", dir: "bg" },
      { name: "Body", dir: "body" },
      { name: "Head", dir: "head" },
      { name: "Clothes", dir: "clothes" },
      { name: "Eyes", dir: "eyes" },
      { name: "Nose", dir: "nose" },
      { name: "Mouth", dir: "mouth" },
      { name: "Eyebrows", dir: "eyebrows" },
      { name: "Hair", dir: "hair" },
      { name: "Glasses", dir: "glasses" },
      { name: "Hat", dir: "hat" },
    ];

    return {
      nextFeature,
      isDisabled,
      featureType,
      query,
      renderId,
    };
  },
};
</script>

<style scoped>
.mint {
  background-color: #1a1932;
  max-width: 100vw;
  height: calc(100vh - 6.4rem);
  margin: 0 auto;
  display: grid;
  overflow: hidden;
}
.mint {
  grid-template-columns: auto 1fr 4.8rem;
}
.mint-nav {
  background-color: #1a1932;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-y: scroll;
  padding: 3.2rem 9.6rem 3.2rem 3.2rem;
  box-shadow: 0.2rem 0 1.6rem 0 rgba(0, 0, 0, 0.18);
}

/* Mint Nav Link (sidebar links) */
.mint-nav-link,
.mint-nav-link:link,
.mint-nav-link:visited {
  color: #ffffff;
  text-decoration: none;
  text-align: left;
  font-size: 2rem;
  padding: 0.8rem 0.8rem 0.8rem 0;
  font-weight: 500;
  letter-spacing: 0.6px;
  transition: all 0.25s;
}
.mint-nav-link:hover,
.mint-nav-link:active {
  color: #92a1b9;
  transform: translateX(0.4rem);
}
.mint-nav-link.selected {
  color: #ffc825;
}
.mint-nav-link:hover.selected {
  color: #cc9900;
}
.mint-nav-link:first-child {
  padding-top: 0;
}
.mint-nav-link.router-link-active {
  color: #ffc825;
}
.mint-nav-link.router-link-active:hover {
  color: #cc9900;
}

/* Mint Nav Btn (right arrow button) */
.mint-nav-btn {
  color: #ffffff;
  text-decoration: none;
  background-color: #2a2f4e;
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 6.4rem);
  box-shadow: -0.2rem 0 1.6rem 0 rgba(0, 0, 0, 0.18);
  transition: all 0.25s;
}
.mint-nav-btn:hover,
.mint-nav-btn:active {
  background-color: #657392;
  cursor: pointer;
}
.mint-nav-btn:hover .icon,
.mint-nav-btn:active .icon {
  transform: translateX(0.4rem);
  transition: all 0.25s;
}

.mint-icon {
  height: 3.2rem;
}
</style>
