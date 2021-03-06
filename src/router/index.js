import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import PageSelection from "../views/PageSelection.vue";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home,
    },
    {
      path: "/:pais",
      name: "PageSelection",
      component: PageSelection,
    },
  ],
});

export default router;
