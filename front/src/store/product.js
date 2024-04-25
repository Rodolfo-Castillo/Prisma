// Utilities
import { defineStore } from "pinia";
import { HttpPost, HttpGet, HttpPut, HttpDelete } from "@/utils/http";

const route = "product";
export const useProductStore = defineStore("product", {
    state: () => ({
        products: [],
        isLoading: false,
        msg: "",
        error: false,
    }),
    actions: {
        async saveProduct(formData) {
            try {
                this.$state.isLoading = true;
                const res = await HttpPost(`${route}`, formData);
                this.$state.products = [...this.products, res.data];
            } catch (e) {
                this.$state.msg = e.message;
                this.$state.error = true;
            } finally {
                this.$state.isLoading = false;
            }
        },
        async listProducts() {
            try {
                this.$state.isLoading = true;
                const res = await HttpGet(`${route}s`);
                if (res.data.length != 0) {
                    this.$state.products = res.data.map((element) => {
                        return {
                            id: element.id,
                            name: element.name,
                            image: element.image,
                            category: element.category.name,
                        };
                    });
                }
            } catch (e) {
                this.$state.msg = e.message;
                this.$state.error = true;
            } finally {
                this.$state.isLoading = false;
            }
        },
        async getProduct(id) {
            try {
                this.$state.isLoading = true;
                const res = await HttpGet(`${route}/${id}`);
                if (res.data.length != 0) {
                    return res.data;
                }
            } catch (e) {
                this.$state.msg = e.message;
                this.$state.error = true;
            } finally {
                this.$state.isLoading = false;
            }
        },
        async updateProduct(formData) {
            try {
                this.$state.isLoading = true;
                const res = await HttpPut(`${route}/${formData.id}`, formData);
                const data = res.data.updateProduct;
                this.$state.products.map((c) => {
                    if (+c.id === +formData.id) {
                        c = data;
                    }
                });
                window.location.href = "/products";
            } catch (e) {
                this.$state.msg = e.message;
                this.$state.error = true;
            } finally {
                this.$state.isLoading = false;
            }
        },
        async deleteProduct(id) {
            try {
                this.$state.isLoading = true;
                const res = await HttpDelete(`${route}/${id}`);
                const data = res.data.deletedProduct;
                const productos = this.$state.products;
                this.$state.products = productos.filter(
                    (producto) => producto.id != data.id
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
