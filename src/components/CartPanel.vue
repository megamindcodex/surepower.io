<template>
    <div class="cont overflow-auto">
      <div class="cartCont" v-if="cartStore.cartItems">
        <div class="cartItem" v-for="product in cartStore.cartItems" :key="product._id">
          <span class="delBtn"> 
        </span>
          <div class="image">
            <img :src="product.productImageURL" :alt="product.name" />
          </div>
          <div class="desc">
            <p>{{ product.name }}</p>
            <p>${{ product.price }}</p>
          </div>
        </div>
      </div>
      <div class="cont" v-else>
        <p>Cart is Empty</p> 
      </div>
      <div class="footer">
        <RouterLink to="/cart"><v-btn class="bg-grey-darken-3 mg-1 btn">View cart</v-btn></RouterLink>
      </div>
    </div>
  </template>
  
  <script setup>
  import { onMounted, ref } from 'vue';
  import { useCartStore } from '../store/cart'
  import { useLocalStorageStore } from '../store/localStorage'
  
  const cartStore = useCartStore()
  const localStorageStore = useLocalStorageStore()
  // userId.value = localStorageStore.userId;
  
  localStorageStore.getUserId() 
  cartStore.getCartItems(localStorageStore.userId)
  // cartStore.checkOut(localStorageStore.userId, cartStore.cartItemsData)
  
  
  </script> 
  
  <style scoped>
  .cont {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    z-index: -1;
  }
  
  .cartCont {
    display: flex;
    flex-direction: column;
    row-gap: 0.5rem;
    justify-content: center;
    align-items: center;
    width: 100%;
    max-width: 100%;
  }
  
  .cartItem {
    position: relative;
    display: flex;
    flex-direction: row;
    column-gap: 1rem;
    justify-content: space-between;
    align-items: center;
    border: 1px solid #ccc; /* Add border for better separation */
    width: 100%;
    max-width: 370px;
    padding: 0.4rem;
    border-radius: 5px;
    background-color: #c9c5c5;
  }
  
  .image {
    width: 100%;
    aspect-ratio: 2/1;
    overflow: hidden; /* Ensure images don't exceed their container */
  }
  
  .image img {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    /* aspect-ratio: 2/1; */
    object-fit: contain; /* Maintain aspect ratio and cover the container */
  }
  
  .desc {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
  
  .delBtn {
    position: absolute;
    top: 30px;
    right: -28px;
    /* padding: 1rem; */
  }
  
  .delBtn svg {
    width: 24px;
    height: auto;
  }
  
  .delBtn svg:hover {
    color: crimson;
  }
  </style>
  