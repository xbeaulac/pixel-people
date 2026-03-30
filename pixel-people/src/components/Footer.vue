<template>
  <footer class="footer grid grid--2-cols">
    <!-- <div>
      <div class="logo">
        <router-link :to="{ name: 'Home' }">
          <img src="@/assets/logo.png" alt="Logo" />
        </router-link>
        <router-link :to="{ name: 'Home' }" class="logo-name"
          >Pixel People.</router-link
        >
      </div>
      <p class="footer-copyright">Pixel People Copyright 2022.</p>
    </div> -->
    <p class="footer-desc">The first NFT collection made by <span>you</span></p>
    <div class="social-links">
      <i class="social-link fab fa-twitter fa-2x"></i>
      <i class="social-link fab fa-discord fa-2x"></i>
      <i class="social-link fab fa-instagram fa-2x"></i>
    </div>
  </footer>
</template>

<script>
export default {};
</script>

<style>
.footer {
  width: 100vw;
  height: 5rem;
  position: fixed;
  z-index: 9999;
  background-color: rgba(26, 25, 50, 0.9);
  backdrop-filter: blur(0.8rem);
  bottom: 0;
  padding: 1.2rem 2.4rem;
}

/* Footer left side */
.footer .logo {
  margin-bottom: 0.4rem;
}
.footer-desc {
  color: #92a1b9;
  font-size: 1.6rem;
  line-height: 1.6;
  align-self: center;
  justify-self: flex-start;
}
.footer-desc span {
  color: #ffc825;
}
.social-links {
  display: flex;
  gap: 2.4rem;
  align-items: center;

  /* align-self: flex-end; */
  justify-self: flex-end;
}
.social-link {
  transition: all 0.25s;
}
.social-link:hover {
  color: #ffc825;
  cursor: pointer;
}
.footer-copyright {
  font-size: 1.2rem;
  color: #92a1b9;
}
</style>
