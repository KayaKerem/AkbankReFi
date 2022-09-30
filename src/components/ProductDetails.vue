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
              <img class="img-fluid intrinsic-item" :src="item.thumbnail_url" alt="" />
            </div>
          </div>
        </div>

        <div class="caption-full">
          <h4 class="pull-right">$ {{ item.price }}</h4>
          <h4 id="item-title">{{ item.title }}</h4>
          <p>{{ item.description }}</p>
        </div>
        <div class="ratings">
          <span v-if="item.quantity<1000">{{ item.quantity }} paket kaldı</span>
          <p class="pull-right">
            <button @click="addItem" :disabled="item.quantity === 0" class="btn btn-success">
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
// import { mapGetters } from "vuex";

import axios from "axios";
import Loader from "./Loader.vue";
export default {
  components: {
    Loader,
  },
  data() {
    return {
      loaderColor: "#5cb85c",
      loaderSize: "50px",
      products: [],
      isProductLoading: true,
      item: null,
    };
  },
  mounted() {
    axios.get("http://127.0.0.1:5000/products").then((res) => {
      //smartcontracts
      let dt = res.data["data"];
      this.products = dt;
      let id = this.$route.params.id;
      for (let i in dt) {
        if (dt[i]["id"] == id) {
          this.item = dt[i];
        }
      }
      this.isProductLoading = false;
    });
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
