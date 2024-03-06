const routes = [
  {
    path: "/",
    component: () => import("layouts/ExportedLayout.vue"),
    children: [
      { path: "", component: () => import("pages/IndexPage.vue") },
      { path: "holamundo", component: () => import("pages/HolaMundo.vue") },
      { path: "sqlite", component: () => import("pages/SqlitePage.vue") },
      { path: "styles", component: () => import("pages/StyleLesson.vue") },
      { path: "hooks", component: () => import("pages/HooksLesson.vue") },
      { path: "watch", component: () => import("pages/WatchersLessos.vue") },
      {
        path: "component",
        component: () => import("pages/ComponentePadre.vue"),
      },
      { path: "api", component: () => import("pages/ConsumeApi.vue") },
      { path: "firebase", component: () => import("pages/FireIndex.vue") },
      { path: "editar/:id", component: () => import("pages/EditAnuncio.vue") },
    ],
  },
  {
    path: "/main",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "hooks", component: () => import("pages/HooksLesson.vue") },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
