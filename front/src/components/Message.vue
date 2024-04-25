<template>
    <q-dialog v-model="props.open">
        <q-card style="width: 450px; height: 140px" class="bg-white">
            <q-card-section>
                <div class="text-h6">
                    {{ props.title }}
                </div>
                <div>
                    {{ props.text }}
                </div>
            </q-card-section>
            <q-card-actions align="right">
                <q-btn
                    flat
                    :label="props.type != 'error' ? 'Cancelar' : 'Aceptar'"
                    :color="props.type == 'error' ? 'red' : 'black'"
                    :disable="props.isLoading"
                    @click="$emit('closeDialog', false)"
                />
                <q-btn
                    v-if="props.type == 'save'"
                    flat
                    label="Aceptar"
                    color="primary"
                    :disable="props.isLoading"
                    @click="$emit('add', true)"
                />
                <q-btn
                    v-if="props.type == 'delete'"
                    flat
                    label="Aceptar"
                    color="primary"
                    :disable="props.isLoading"
                    @click="$emit('delete')"
                />
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>

<script setup>
const props = defineProps({
    title: String,
    type: String,
    text: String,
    open: Boolean,
    isLoading: Boolean,
});
</script>
