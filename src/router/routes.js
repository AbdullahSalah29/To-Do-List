
const routes = [
  {
    path: "/tasks",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/TasksPage.vue"),
        meta:{
          requiresAuth: true,
        },
      }
    ]
  },
  {
    path: "/:catchAll(.*)*",
    redirect: "/login"
  },
  {
    path: "/",
    component: () => import("layouts/LayoutAuth.vue"),
    children: [
      {
        path: "",
        redirect: "/login"
      },
      {
        path: "/register",
        component: () => import("pages/RegisterPage.vue")
      },
      {
        path: "/login",
        component: () => import("pages/LoginPage.vue")
      },
    ]
  }
]

export default routes
