<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const leftDrawerOpen = ref(false);

const menuItems = [
    {
        name: "Home",
        caption: "Dashboard",
        icon: "dashboard",
        goTo: "/",
    },
    {
        name: "Categories",
        caption: "Categories",
        icon: "fa-solid fa-list",
        goTo: "/category",
    },
    {
        name: "Products",
        caption: "Products",
        icon: "fa-solid fa-shop",
        goTo: "/products",
    },
];

const toggleLeftDrawer = () => {
    leftDrawerOpen.value = !leftDrawerOpen.value;
};

const goTo = (to) => {
    router.push(to);
    toggleLeftDrawer();
};

const logOut = () => {
    localStorage.removeItem("token");
    router.push("/login");
};

onMounted(async () => {});
</script>
<template>
    <q-layout view="lHh Lpr lFf" class="bg-white">
        <q-header elevated>
            <q-toolbar>
                <q-btn
                    id="menu"
                    name="menu"
                    flat
                    dense
                    round
                    @click="toggleLeftDrawer"
                    aria-label="Menu"
                    icon="menu"
                />
                <q-toolbar-title>
                    Ejemplo Prisma + Vue + PostgreSQL
                </q-toolbar-title>
            </q-toolbar>
        </q-header>

        <q-drawer v-model="leftDrawerOpen" bordered class="bg-grey-2">
            <q-list>
                <q-item-label header>Menu</q-item-label>
                <q-item
                    v-for="(item, i) in menuItems"
                    :key="i"
                    clickable
                    rel="noopener"
                    @click="goTo(item.goTo)"
                >
                    <q-item-section avatar>
                        <q-icon :name="item.icon" />
                    </q-item-section>
                    <q-item-section>
                        <q-item-label>{{ item.name }}</q-item-label>
                        <q-item-label caption>{{ item.caption }}</q-item-label>
                    </q-item-section>
                </q-item>
                <q-item clickable rel="noopener" @click="logOut">
                    <q-item-section avatar>
                        <q-icon name="logout" />
                    </q-item-section>
                    <q-item-section>
                        <q-item-label>Log Out</q-item-label>
                        <q-item-label caption>Log Out</q-item-label>
                    </q-item-section>
                </q-item>
            </q-list>
        </q-drawer>

        <q-page-container>
            <q-page padding>
                <router-view :key="router.fullPath" />
            </q-page>
        </q-page-container>
    </q-layout>
</template>
