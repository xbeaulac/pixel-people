<template>
  <main class="home">
    <section class="hero" id="home">
      <div class="container">
        <div class="hero-text-box">
          <h1 class="h1">
            The first N<span class="ft">FT</span> collection made by
            <span class="hero-you">you</span>
          </h1>
          <p class="text hero-desc">
            You decide what your Pixel Person looks like! You can collect,
            customize, <br />
            and sell each Pixel Person or their individual features (eyes, nose,
            hair, etc). <br />
            Each Pixel Person celebrates the individuality of its creator.
          </p>
          <div class="hero-btns">
            <router-link :to="{ name: 'Mint' }" class="link-primary"
              >Start Minting</router-link
            >
            <a
              href="#how"
              v-smooth-scroll="{ offset: -64 }"
              class="link-secondary"
              >Learn More</a
            >
          </div>
        </div>
        <!-- <div class="hero-img-box">
          <div class="hero-gallery">
            <figure
              class="hero-img"
              :class="`hero-img--${img.id}`"
              v-for="img in images"
              :key="img.id"
            >
              <img :src="img.src" alt="A Pixel Person" />
            </figure>
          </div>
        </div> -->
      </div>
      <img
        src="../assets/forest.webp"
        class="forest"
        alt="A Pixel Art Forest"
      />
    </section>

  <div class="gradient">
    <section class="how" id="how">
      <div class="container">
        <p class="heading-mini">How to Mint</p>
        <h2 class="h2">Mint a Pixel Person in 3 easy steps:</h2>
        <div class="grid grid--3-cols">
          <div class="how-feature">
            <span class="material-icons how-icon">account_balance_wallet</span>
            <p class="how-title"><span class="hero-you">1.</span> Connect your wallet.</p>
            <p class="how-desc text">
              In the top right corner of the website, click the "Connect" button to
              connect your wallet. Once connected, you will be able to mint your
              Pixel People.
            </p>
          </div>
          <div class="how-feature">
            <span class="material-icons how-icon">people_alt</span>
            <p class="how-title"><span class="hero-you">2.</span> Select your features.</p>
            <p class="how-desc text">
              Go to the "Mint" tab and select features to add to your Pixel
              Person. Some features are different prices to encourage rarity.
            </p>
          </div>
          <div class="how-feature">
            <span class="material-icons how-icon">shopping_cart</span>
            <p class="how-title"><span class="hero-you">3.</span> Buy! Buy! Buy!</p>
            <p class="how-desc text">
              Purchase your Pixel Person to join the Pixel People community!
              Next, you can break, build, customize, or swap Pixel People
              features.
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="mini-gallery" id="mini-gallery">
      <div class="container">
        <p class="heading-mini">Mini Gallery</p>
        <h2 class="h2">View the community's creations!</h2>
        <div class="mini-gallery-grid">
          <figure v-for="image in 24" :key="image" class="mini-gallery-img">
            <img
              :src="require(`../assets/pp/${image}.gif`)"
              alt="A Pixel Person"
            />
          </figure>
        </div>
<!--        <div class="link-container">-->
<!--          <router-link :to="{ name: 'Gallery' }" class="link-inline">-->
<!--            <div class="link-content">-->
<!--              See All-->
<!--              <span class="material-icons icon">chevron_right</span>-->
<!--            </div>-->
<!--          </router-link>-->
<!--        </div>-->
      </div>
    </section>
    </div>
  </main>
</template>

<script>
import { ref } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";
export default {
  name: "Home",
  setup() {
    const images = ref([
      { src: require("../assets/pp/25.gif"), id: 1 },
      { src: require("../assets/pp/19.gif"), id: 2 },
      { src: require("../assets/pp/27.gif"), id: 3 },
      { src: require("../assets/pp/18.gif"), id: 4 },
      { src: require("../assets/pp/29.gif"), id: 5 },
      { src: require("../assets/pp/22.gif"), id: 6 },
    ]);

    onMounted(() => {
      window.scrollTo(0, 0);
    });

    return { images };
  },
};
</script>

<style scoped>
/* -------------------- */
/* HERO SECTION */
/* -------------------- */
.hero {
  background: linear-gradient(to bottom, #1A1932, #424c6e);
  padding: 6.4rem 0 50vw 0;
  position: relative;
  z-index: 0;
}
.forest {
  position: absolute;
  bottom: 0;
  width: 100vw;
  z-index: -1;
}
.hero-text-box {
  text-align: center;
}
.h1 {
  max-width: 60rem;
  margin: 0 auto;
}
.h1 .hero-you,
.how-title .hero-you {
  background-image: linear-gradient(to right, #ffc825, #ffa214);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
}
.ft {
  letter-spacing: 4px;
  margin-right: -0.8rem;
}
.hero-desc {
  margin: 3.2rem auto 6.4rem auto;
  max-width: 80rem;
}
.hero-btns {
  display: flex;
  justify-content: center;
  column-gap: 2.4rem;
}

/* -------------------- */
/* HOW TO MINT SECTION */
/* -------------------- */
.gradient {
  background: linear-gradient(to bottom, #1A1932, #2a2f4e);
  transform: translateZ(0) scale(1)
}
.how {
  /* background-color: #ffc825; */
  /* background-color: #0e071b; */
  color: #ffffff;
  padding: 3.2rem 0;
  margin: 3.2rem 0;
}
.how-feature {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
}
.how-icon {
  font-size: 4.8rem;
  background-color: #2A2F4E;
  color: #ffffff;
  padding: 1.6rem;
  border-radius: 4px;
  margin-bottom: 4.8rem;
  align-self: center;
  box-shadow: 0 0.8rem 1.2rem rgba(33, 37, 41, 0.12);
}
.how-title {
  font-size: 2.4rem;
  font-weight: 600;
  margin-bottom: 1.6rem;
}
.text.how-desc {
  color: #92A1B9;
  font-size: 1.8rem;
}

/* -------------------- */
/* MINI GALLERY SECTION */
/* -------------------- */
.mini-gallery {
  padding: 9.6em 0;
}
.mini-gallery-grid {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: 1.6rem;
  margin-bottom: 2.4rem;
  padding: 1.6rem;
  border-radius: 4px;
  background-color: #2a2f4e;
}
.mini-gallery-img {
  overflow: hidden;
  border-radius: 4px;
}
.mini-gallery-img img {
  display: block;
  width: 100%;
  transition: all 0.25s;
}
.mini-gallery-img img:hover {
  transform: scale(1.1);
}
.link-container {
  display: flex;
  justify-content: center;
}
</style>
