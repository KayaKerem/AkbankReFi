<template>
  <div class="container">
    <div class="col-md-12">
      <div v-if="isProductLoading" class="text-center">
        <loader></loader>
      </div>
      <div v-else class="card">
        <div class="row">
          <div class="col-12 col-md-4 offset-md-4">
            <div class="intrinsic">
              <img class="img-fluid intrinsic-item" :src="product.thumbnail_url" alt="" />
            </div>
          </div>
        </div>

        <div class="caption-full">
          <h4 class="pull-right">$ {{ product.price }}</h4>
          <h4 id="item-title">{{ product.title }}</h4>
          <p>{{ product.description }}</p>
        </div>
        <div class="ratings">
          <span v-if="product.quantity<1000">{{ product.quantity }} paket kaldı</span>
          <p class="pull-right">
            <button @click="addItem" :disabled="product.quantity === 0" class="btn btn-success">
              Sepete ekle
            </button>
          </p>
          <div class="clearfix"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { listenToProductList } from "./utils/datas.js"


import Loader from "./Loader.vue";
export default {
  components: {
    Loader,
  },
  data() {
    return {
      loaderColor: "#5cb85c",
      loaderSize: "50px",
      product: {},
      isProductLoading: true,
      item: null,
    };
  }, methdos: {
    
  },
  async created() {
   
  
    let products = await listenToProductList();
  
    for (let i in products) {
      if (products[i]["id"] == this.$route.params.id) {
        this.product = products[i];
      }
    }
    console.log("ASDASDAS")
    console.log(this.product)
    this.isProductLoading = false;


  },


  methods: {

  },
};
</script>

<style scoped>
.caption-full {
  padding-right: 10px;
  padding-left: 10px;
}

.ratings {
  padding-right: 10px;
  padding-left: 10px;
  color: #b30118;
}

.btn-success {
  background-color: #091239 !important;
  border-color: #091239 !important;
}

#item-title {
  font-family: "Bangers";
}
</style>
