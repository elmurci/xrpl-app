import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/404",
      name: "404",
      component: () => import("./modules/404.vue"),
    },
    {
      path: "/",
      name: "xrpl-app.home",
      component: () => import("./modules/Home/index.vue"),
    },
    {
      path: "/:catchAll(.*)",
      redirect: "/404",
    }
  ],
});

export default router;