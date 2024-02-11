import { createRouter, createWebHistory } from "vue-router";

import Home from "../views/Home.vue";
import Products from "../views/Products.vue";
import ProductItem from "../views/ProductItem.vue";
import SignupPage from "../views/Signup.vue";
import LoginPage from "../views/Login.vue";
import UserProfile from "../views/UserProfile.vue";
import Cart from "../views/Cart.vue";
import SuccessPage from "../views/SuccessPage.vue";
import Category from "../views/Category.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/products",
      name: "products",
      component: Products,
    },
    {
      path: "/productitem/:id",
      name: "ProductItem",
      component: ProductItem,
    },
    {
      path: "/signup",
      name: "signup",
      component: SignupPage,
    },
    {
      path: "/login",
      name: "login",
      component: LoginPage,
    },
    {
      path: "/userProfile",
      name: "userProfile",
      component: UserProfile,
    },
    {
      path: "/cart",
      name: "cart",
      component: Cart,
    },
    {
      path: "/payment-successfull",
      name: "successPage",
      component: SuccessPage,
    },
    {
      path: "/category/:name",
      name: "category",
      component: Category,
    },
  ],

  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      // return desired position
      return savedPosition;
    } else {
      return { top: 0, behavior: "smooth" };
    }
  },
});

export default router;
