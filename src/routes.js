import Store from "./components/Store.vue";
import ProductDetails from "./components/ProductDetails.vue";

import Main from "./components/Main.vue";

import Sorry from "./components/Sorry.vue";

export const routes = [
    { path: "/", component: Main, name: "home" },
    { path: "/product/:id", component: ProductDetails, name: "product" },

    { path: "/store", component: Store, name: "store", onlyGuest: true },

    { path: "/sorry", component: Sorry, name: "sorry", onlyGuest: true },
    { path: "*", redirect: "/" },
];