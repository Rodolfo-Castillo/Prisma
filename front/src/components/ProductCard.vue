<template>
    <q-card class="my-card q-pa-md" style="max-width: 350px; max-height: 250px">
        <q-card-section horizontal>
            <q-img class="col-5" :src="props.image" />

            <q-card-section>
                <q-item-label>{{ props.title }}</q-item-label>
                <q-item-label caption> {{ props.category }} </q-item-label>
            </q-card-section>
        </q-card-section>

        <q-separator />

        <q-card-actions align="right">
            <q-btn
                flat
                color="red"
                round
                icon="fa-solid fa-trash"
                @click="
                    async () => {
                        await confirmDelete(props.id);
                    }
                "
            />
            <q-btn
                flat
                color="primary"
                round
                icon="edit"
                @click="editProduct(props.id)"
            />
        </q-card-actions>
        <Confirmation
            @delete="
                async () => {
                    await deleted(props);
                }
            "
        />
    </q-card>
</template>
<script setup>
import { useProductStore } from "@/store/product";
import Confirmation from "./Confirmation.vue";
import { useRouter } from "vue-router";
import { useGeneralStore } from "@/store/general";

const store = useProductStore();
const router = useRouter();
const generalStore = useGeneralStore();
const props = defineProps({
    id: Number,
    title: String,
    category: String,
    image: String,
    isLoading: Boolean,
});

const editProduct = (id) => {
    router.push(`/product/${id}`);
};

const confirmDelete = async (id) => {
    generalStore.openConfirmation("Esta seguro de eliminar este producto?", id);
};

const deleted = async () => {
    await store.deleteProduct(generalStore.confirmation.id);
    generalStore.closeConfirmation();
};
</script>
