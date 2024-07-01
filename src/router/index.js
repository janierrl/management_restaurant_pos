import { createWebHistory, createRouter } from "vue-router";
import Login from '../pages/Login.vue';
import Register from '../pages/Register.vue';
import Home from '../pages/Home.vue';
import About from '../pages/About.vue';
import Promo from '../pages/Promo.vue';
import Menu from '../pages/Menu.vue';
import Table from '../pages/Table.vue';
import Cart from '../pages/Cart.vue';
import Checkout from '../pages/Checkout.vue';
import Thank from '../pages/Thank.vue';
import MyOrder from '../pages/MyOrder.vue';
import Admin from '../admin/Admin.vue';
import Dashboard from '../admin/Dashboard.vue';
import Users from "../admin/Users.vue";
import Ingredients from "@/admin/Ingredients.vue";
import RegisterIngredients from "@/pages/RegisterIngredients.vue";
import AmountTypes from "@/admin/AmountTypes.vue";
import RegisterAmountTypes from "@/pages/RegisterAmountTypes.vue";
import Roles from "@/admin/Roles.vue";
import RegisterRoles from "@/pages/RegisterRoles.vue";
import Infos from "@/admin/Infos.vue";
import RegisterInfos from "@/pages/RegisterInfos.vue";
import Statuses from "@/admin/Statuses.vue";
import RegisterStatuses from "@/pages/RegisterStatuses.vue";
import Foods from "@/admin/Foods.vue";
import RegisterFoods from "@/pages/RegisterFoods.vue";


const routes = [
  {
    path: "/",
    name: "Home",
    component: Home, 
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
  {
    path: "/promotions",
    name: "Promotions",
    component: Promo,
  },
  {
    path: "/menu",
    name: "Menu",
    component: Menu,
  },
  {
    path: "/table",
    name: "Table",
    component: Table,
  },
  {
    path: "/cart",
    name: "Cart",
    component: Cart,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/register_ingredients",
    name: "RegisterIngredients",
    component: RegisterIngredients,
  },
  {
    path: "/register_amount_types",
    name: "RegisterAmountTypes",
    component: RegisterAmountTypes,
  },
  {
    path: "/register_roles",
    name: "RegisterRoles",
    component: RegisterRoles,
  },
  {
    path: "/register_infos",
    name: "RegisterInfos",
    component: RegisterInfos,
  },
  {
    path: "/register_statuses",
    name: "RegisterStatuses",
    component: RegisterStatuses,
  },
  {
    path: "/register_foods",
    name: "RegisterFoods",
    component: RegisterFoods,
  },
  {
    path: "/checkout",
    name: "Checkout",
    component: Checkout,
  },
  {
    path: "/thank",
    name: "Thank",
    component: Thank,
  },
  {
    path: "/myorder",
    name: "MyOrder",
    component: MyOrder,
  },
  {
    path: "/admin",
    name: "Admin",
    component: Admin,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/dashboard/users",
    name: "Users",
    component: Users,
  },
  {
    path: "/dashboard/ingredients",
    name: "Ingredients",
    component: Ingredients,
  },
  {
    path: "/dashboard/amount_types",
    name: "AmountTypes",
    component: AmountTypes,
  },
  {
    path: "/dashboard/roles",
    name: "Roles",
    component: Roles,
  },
  {
    path: "/dashboard/infos",
    name: "Infos",
    component: Infos,
  },
  {
    path: "/dashboard/statuses",
    name: "Statuses",
    component: Statuses,
  },
  {
    path: "/dashboard/foods",
    name: "Foods",
    component: Foods,
  },
  {
    path: '/:pathMatch(.*)*',
    component: Home,
    // https://stackoverflow.com/questions/68504803/how-can-i-make-a-catch-all-other-route-in-vue-router-also-catch-the-url-when-p
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;