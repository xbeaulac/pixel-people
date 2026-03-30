import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

// Smooth scrolling
import VueSmoothScroll from "vue3-smooth-scroll";

// Font Awesome Icons
// import { library } from '@fortawesome/fontawesome-svg-core'
// import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
// import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// CSS
import "./style/global.css";
import "./style/wallet.css";

// Vue Dapp
import { VueDapp } from "vue-dapp";

//auth state
import { auth } from "./firebase/config";
import { onAuthStateChanged } from "firebase/auth";

let app;

onAuthStateChanged(auth, () => {
  if (!app) {
    app = createApp(App);
    app.use(router);
    app.use(VueSmoothScroll);
    app.use(VueDapp, {
      infuraId: 'eab7e5d5326c43d0989d61ea4478b278', // optional: for enabling WalletConnect and/or WalletLink
      appName: 'Pixel People', // optional: for enabling WalletLink
      appUrl: 'http://localhost:8080/', // optional: for enabling MetaMask deep link for mobile devices
    })
    app.mount("#app");
  }
});

export * from "./firebase/config";
