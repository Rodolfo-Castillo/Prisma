// Utilities
import { defineStore } from "pinia";
import { HttpPost } from "@/utils/http";

export const useAuthStore = defineStore("auth", {
    state: () => ({
        isLoading: false,
        msg: "",
        error: false,
    }),
    actions: {
        async register(formData) {
            try {
                this.$state.isLoading = true;
                const res = await HttpPost("register", formData);
                if (res.data.token) {
                    this.$state.error = false;
                    localStorage.setItem("token", res.data.token);
                    window.location.href = "/";
                } else {
                    this.$state.msg = "Datos incorrectos. Verifique por favor.";
                    this.$state.error = true;
                }
            } catch (e) {
                this.$state.msg = e.message;
                this.$state.error = true;
            } finally {
                this.$state.isLoading = false;
            }
        },
        async login(formData) {
            this.$state.isLoading = true;
            localStorage.clear();
            const res = await HttpPost("signin", formData);
            if (res.data.token) {
                this.$state.error = false;
                localStorage.setItem("token", res.data.token);
                window.location.href = "/";
            } else {
                this.$state.msg = "Datos incorrectos. Verifique por favor.";
                this.$state.error = true;
            }
            this.$state.isLoading = false;
        },
        setError() {
            this.$state.error = false;
        },
    },
});
