import { defineStore } from "pinia";
import axios from "axios";
import { endpoint } from "../constant/endpoint";

export const useProductsStore = defineStore("productStore", {
  state: () => ({
    products: [],
    productsByCategory: [],
    productsByBrand: [],
    trendingProducts: [],
    loading: [],
  }),
  getters: {
    ProductLength: (state) => state.products.length,
  },
  actions: {
    async getAllProducts() {
      try {
        this.loading = true;
        const res = await axios.get(`${endpoint}/api/productsDeployed`, {});
        if (res.status === 200) {
          this.products = res.data;
          // console.log(data);
        }
        this.loading = false;
      } catch (err) {
        console.error("Error getting all products", err.message);
      }
    },

    async getPoductsByCategory(categoryName) {
      try {
        const res = await axios.get(`${endpoint}/api/productsByCategory`, {
          params: { categoryName: categoryName },
        });

        if (res.status === 200) {
          this.productsByCategory = res.data;
          // console.log("products By category fetched:", this.products);
        }
      } catch (err) {
        console.log("Error getting poducts by category", err, err.message);
      }
    },

    // getProductsByTag(tags) {
    //   this.productsByTag = this.products.filter((product) =>
    //     product.tag.includes(tags)
    //   );
    // },
    getProductsByBrand(brand) {
      // console.log(brand);
      this.getAllProducts();
      this.productsByBrand = this.products.filter(
        (product) => product.brand === brand
      );
      // console.log(this.productsByBrand);
    },
    async getTrendingProducts() {
      try {
        await this.getAllProducts();
        this.trendingProducts = this.products.filter((product) =>
          product.tags.includes("trending")
        );
        console.log("trending product", this.trendingProducts);
      } catch (err) {
        console.log("Error getting trending products", err, err.message);
      }
    },
  },
});
