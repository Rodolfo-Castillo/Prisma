<template>
    <div class="row q-gutter-md">
        <div class="">
            <q-avatar size="100px" color="white" text-color="grey">
                <q-img :src="imageUrl" spinner-color="white" />
            </q-avatar>
        </div>
        <div class="row items-end">
            <div class="col">
                <div class="q-gutter-xs">
                    <q-btn
                        type="button"
                        size="sm"
                        label="Upload"
                        color="primary"
                        @click="handleUploadBtnClick"
                    ></q-btn>
                    <q-btn
                        type="button"
                        size="sm"
                        label="Remove"
                        @click="handleRemove"
                    ></q-btn>
                </div>
                <div class="text-caption">Select a least one option.</div>
            </div>
        </div>
        <q-file
            @update:model-value="handleUpload"
            v-model="image"
            ref="file"
            style="display: none"
            accept="image/*"
        />
    </div>
</template>

<script setup>
import { ref, defineModel, watch } from "vue";

const image = defineModel();
const profileUrl = "https://cdn.quasar.dev/logo-v2/svg/logo.svg";
const imageUrl = ref(profileUrl);
const file = ref(null);
const handleUploadBtnClick = () => {
    file.value.pickFiles();
};
const handleUpload = async (img) => {
    image.value = img;
    console.log(image.value);
    if (img) {
        imageUrl.value = URL.createObjectURL(img);
    }
};
const handleRemove = () => {
    image.value = null;
    imageUrl.value = profileUrl;
};

watch(image, async (newImage, oldImage) => {
    imageUrl.value = URL.createObjectURL(newImage);
});
</script>
