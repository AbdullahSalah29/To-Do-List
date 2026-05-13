
const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
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
      {
        path: "/tasks",
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
  }
]

export default routes
