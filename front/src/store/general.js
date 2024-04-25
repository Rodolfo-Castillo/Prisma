// Utilities
import { defineStore } from "pinia";

export const useGeneralStore = defineStore("general", {
    state: () => ({
        confirmation: {
            open: false,
            text: "",
            id: 0,
        },
    }),
    actions: {
        openConfirmation(text, id = 0) {
            console.log(id);
            this.$state.confirmation.open = true;
            this.$state.confirmation.id = id;
            this.$state.confirmation.text = text;
        },
        closeConfirmation() {
            this.$state.confirmation.open = false;
            this.$state.confirmation.id = 0;
            this.$state.confirmation.text = "";
        },
    },
});
