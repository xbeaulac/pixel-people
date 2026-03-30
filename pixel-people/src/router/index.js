import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Mint from "../views/Mint.vue";
import Gallery from "../views/Gallery.vue";
import Roadmap from "../views/Roadmap.vue";

import { auth } from "../firebase/config";

import { useBoard } from "vue-dapp";

const { open } = useBoard();

const requireAuth = (to, from, next) => {
  let user = auth.currentUser;
  if (!user) {
    open();
  } else {
    next();
  }
};

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/mint",
    name: "Mint",
    component: Mint,
    beforeEnter: requireAuth,
  },
  {
    path: "/gallery",
    name: "Gallery",
    component: Gallery,
  },
  {
    path: "/roadmap",
    name: "Roadmap",
    component: Roadmap,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
