import { createRouter, createWebHistory } from "vue-router";
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";
import Categories from "@/views/Category.vue";
import Product from "@/views/Products/Product.vue";
import Add from "@/views/Products/Add.vue";
import Layout from "@/layout/quasar-classic.vue";
import { validateRoute } from "@/utils/utils";

const routes = [
    {
        path: "/login",
        name: "Login",
        component: Login,
        meta: {
            auth: false,
        },
    },
    {
        path: "/register",
        name: "Register",
        component: Register,
        meta: {
            auth: false,
        },
    },
    {
        path: "/",
        name: "Index",
        component: Layout,
        meta: {
            auth: true,
        },
        children: [
            {
                path: "/category",
                name: "Category",
                component: Categories,
                meta: {
                    auth: true,
                },
            },
            {
                path: "/products",
                name: "Product",
                component: Product,
                meta: {
                    auth: true,
                },
            },
            {
                path: "/product/:id?",
                name: "Add",
                component: Add,
                meta: {
                    auth: true,
                },
            },
        ],
    },
];

const base_url = import.meta.env.VITE_BASE_URL || "";

const router = createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: createWebHistory(base_url),
    // history: createWebHistory('/formatos/'),
    routes, // short for `routes: routes`
});

router.beforeEach((to, from, next) => {
    if (!to.meta.auth) {
        next();
    } else {
        if (validateRoute()) {
            next();
        } else {
            localStorage.removeItem("token");
            next("/login");
        }
    }
});

export default router;
