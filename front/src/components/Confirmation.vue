<template>
    <div class="q-pa-md q-gutter-sm">
        <q-dialog v-model="store.confirmation.open">
            <q-card>
                <q-card-section class="row items-center">
                    <q-avatar
                        icon="fa-solid fa-trash"
                        color="red"
                        text-color="white"
                    />
                    <span class="q-ml-sm">WARNING.</span>
                </q-card-section>

                <q-card-section class="q-pt-none">
                    {{ store.confirmation.text }}
                </q-card-section>

                <q-card-actions align="right" class="text-primary">
                    <q-btn
                        flat
                        label="Cancel"
                        @click="store.closeConfirmation"
                    />
                    <q-btn
                        color="primary"
                        label="Delete"
                        @click="$emit('delete')"
                    />
                </q-card-actions>
            </q-card>
        </q-dialog>
    </div>
</template>
<script setup>
import { useGeneralStore } from "@/store/general";

const store = useGeneralStore();
</script>
