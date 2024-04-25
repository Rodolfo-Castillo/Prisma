<script setup>
import { reactive } from "vue";
import { useAuthStore } from "@/store/auth";
import Message from "@/components/Message.vue";
const store = useAuthStore();

const formData = reactive({
    username: null,
    password: null,
});

const closeDialog = async () => {
    store.setError();
};

const handleClick = async () => {
    await store.login(formData);
};
</script>
<template>
    <q-layout>
        <q-page-container>
            <q-page
                class="window-height window-width row justify-center items-center"
            >
                <div class="column q-pa-lg">
                    <div class="row">
                        <q-card
                            square
                            class="shadow-24"
                            style="width: 300px; height: 350px"
                        >
                            <q-card-section class="bg-primary">
                                <h3
                                    class="text-h5 text-white q-my-md text-center"
                                >
                                    Ingrese sus datos
                                </h3>
                            </q-card-section>
                            <q-card-section>
                                <q-form class="q-px-sm">
                                    <q-input
                                        class="q-mb-md"
                                        square
                                        clearable
                                        outlined
                                        dense
                                        v-model="formData.username"
                                        label="Usuario"
                                        :disabled="store.isLoading"
                                        @keyup.enter="handleClick"
                                    >
                                        <template v-slot:prepend>
                                            <q-icon name="person" />
                                        </template>
                                    </q-input>
                                    <q-input
                                        square
                                        clearable
                                        outlined
                                        dense
                                        v-model="formData.password"
                                        type="password"
                                        label="Contraseña"
                                        :disabled="store.isLoading"
                                        @keyup.enter="handleClick"
                                    >
                                        <template v-slot:prepend>
                                            <q-icon name="lock" />
                                        </template>
                                    </q-input>
                                </q-form>
                            </q-card-section>
                            <q-card-actions>
                                <q-btn
                                    unelevated
                                    size="lg"
                                    color="primary"
                                    class="full-width text-white"
                                    label="Entrar"
                                    @click="handleClick"
                                    :disabled="store.isLoading"
                                />
                            </q-card-actions>
                            <q-card-actions align="right">
                                <a href="/register">Registrar Usuario</a>
                            </q-card-actions>
                        </q-card>
                    </div>
                </div>
            </q-page>
            <Message
                :open="store.error"
                title="ERROR"
                type="error"
                :text="store.msg"
                @close-dialog="closeDialog"
            />
        </q-page-container>
    </q-layout>
</template>
