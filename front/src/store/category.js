// Utilities
import { defineStore } from "pinia";
import { HttpPost, HttpGet, HttpPut, HttpDelete } from "@/utils/http";

const route = "category";
export const useCategoryStore = defineStore("category", {
    state: () => ({
        categories: [],
        isLoading: false,
        msg: "",
        error: false,
    }),
    actions: {
        async saveCategory(name) {
            try {
                this.$state.isLoading = true;
                const res = await HttpPost(`${route}`, { name });
                this.$state.categories = [...this.categories, res.data];
            } catch (e) {
                this.$state.msg = e.message;
                this.$state.error = true;
            } finally {
                this.$state.isLoading = false;
            }
        },
        async listCategories() {
            try {
                this.$state.isLoading = true;
                const res = await HttpGet(`${route}`);
                if (res.data.length != 0) {
                    this.$state.categories = res.data.map((element) => {
                        return { id: element.id, name: element.name };
                    });
                }
            } catch (e) {
                this.$state.msg = e.message;
                this.$state.error = true;
            } finally {
                this.$state.isLoading = false;
            }
        },
        async updateCategory(formData) {
            try {
                this.$state.isLoading = true;
                const res = await HttpPut(`${route}/${formData.id}`, formData);
                const data = res.data.updateCategory;
                this.$state.categories.map((c) => {
                    if (+c.id === +formData.id) {
                        c.name = data.name;
                    }
                });
            } catch (e) {
                this.$state.msg = e.message;
                this.$state.error = true;
            } finally {
                this.$state.isLoading = false;
            }
        },
        async deleteCategory(formData) {
            try {
                this.$state.isLoading = true;
                console.log(formData);
                const res = await HttpDelete(
                    `${route}/${formData.id}`,
                    formData
                );
                const data = res.data.deletedCategory;
                const categorias = this.$state.categories;
                this.$state.categories = categorias.filter(
                    (categorias) => categorias.id != data.id
                );
            } catch (e) {
                this.$state.msg = e.message;
                this.$state.error = true;
            } finally {
                this.$state.isLoading = false;
            }
        },
    },
});
