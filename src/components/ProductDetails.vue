<template>
  <div class="container">
    <div class="col-md-12">
      <div v-if="isProductLoading" class="text-center">
        <loader></loader>
      </div>
      <div v-else class="card " style="padding-top:90px">
        <div class="row">
          <div class="col-6 col-md-6 offset-md-3 ">
            <div class="intrinsic">
              <img class="img-fluid intrinsic-item" :src="product.thumbnail_url" alt="" />
            </div>
          </div>
        </div>
<div class="card text-center" style="padding-top:40px">
  
  <div class="card-body">
    <h5 class="card-title">{{product.title}}</h5>
    
    <p class="card-text pb-3">{{product.description}}</p>
    <div class="list-group">
      <a  class="list-group-item list-group-item-action ">
        <div class="d-flex w-100 justify-content-between">
          <h5 class="mb-1">Yüzölçümü : {{dict["acr"]}} Dekar</h5>
        </div>
      </a>
      <a  class="list-group-item list-group-item-action">
        <div class="d-flex w-100 justify-content-between">
          <h5 class="mb-1">Kaynaklara ulaşım puanı : {{dict["point"]}}</h5>    
        </div>
      </a>
      <a  class="list-group-item list-group-item-action">
        <div class="d-flex w-100 justify-content-between">
          <h5 class="mb-1">Ekilebilecek Ürün : {{dict["product"]}}</h5>
        </div>
      </a>
      <a  class="list-group-item list-group-item-action">
        <div class="d-flex w-100 justify-content-between">
          <h5 class="mb-1">Konum : {{dict["location"]}}</h5>
        </div>
      </a>
      <a  class="list-group-item list-group-item-action">
        <div class="d-flex w-100 justify-content-between">
          <h5 class="mb-1">Tahmini Masraf : {{dict["cost"]}} USDC</h5>
        </div>
      </a>
      <a  class="list-group-item list-group-item-action">
        <div class="d-flex w-100 justify-content-between">
          <h5 class="mb-1">Tahmini gelir : {{dict["income"]}} USDC</h5>
        </div>
      </a>
      
    </div>
    <div class="progress mt-3">
      <div class="progress-bar bg-warning" role="progress" v-bind:style="{ width: ((product.quantity*100)/product.limit) + '%'}"
        v-bind:aria-valuenow="product.quantity" aria-valuemin="0" aria-valuemax="100">
    
    
        {{product.quantity}} / {{product.limit}}
    
      </div>
      <p v-if="product.quantity==0" style="margin-left:auto">{{product.quantity}} / {{product.limit}} </p>
    </div>
    <button type="button" class="btn btn-success btn-lg btn-block mt-2" @click="invest">Katıl</button>
  </div>
  <div class="card-footer text-muted">
    <a> <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-clock-history"
        viewBox="0 0 16 16">
        <path
          d="M8.515 1.019A7 7 0 0 0 8 1V0a8 8 0 0 1 .589.022l-.074.997zm2.004.45a7.003 7.003 0 0 0-.985-.299l.219-.976c.383.086.76.2 1.126.342l-.36.933zm1.37.71a7.01 7.01 0 0 0-.439-.27l.493-.87a8.025 8.025 0 0 1 .979.654l-.615.789a6.996 6.996 0 0 0-.418-.302zm1.834 1.79a6.99 6.99 0 0 0-.653-.796l.724-.69c.27.285.52.59.747.91l-.818.576zm.744 1.352a7.08 7.08 0 0 0-.214-.468l.893-.45a7.976 7.976 0 0 1 .45 1.088l-.95.313a7.023 7.023 0 0 0-.179-.483zm.53 2.507a6.991 6.991 0 0 0-.1-1.025l.985-.17c.067.386.106.778.116 1.17l-1 .025zm-.131 1.538c.033-.17.06-.339.081-.51l.993.123a7.957 7.957 0 0 1-.23 1.155l-.964-.267c.046-.165.086-.332.12-.501zm-.952 2.379c.184-.29.346-.594.486-.908l.914.405c-.16.36-.345.706-.555 1.038l-.845-.535zm-.964 1.205c.122-.122.239-.248.35-.378l.758.653a8.073 8.073 0 0 1-.401.432l-.707-.707z" />
        <path d="M8 1a7 7 0 1 0 4.95 11.95l.707.707A8.001 8.001 0 1 1 8 0v1z" />
        <path d="M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5z" />
      </svg> 02-11-2022</a>
  </div>
</div>
        
      </div>
    </div>
  </div>
</template>

<script>
import { listenToProductList } from "./utils/datas.js"
import Swal from "sweetalert2";
import { lockMoney, productDict } from "./utils/datas.js"

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
      dict:{}
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
    this.dict = productDict[this.$route.params.id];
    
    this.isProductLoading = false;


  },


  methods: {
    invest: async function () {
      await Swal.fire({
        title: 'Yatırım yapacağınız miktarı belirleyin',
        input: 'range',
        inputLabel: 'USDC ',
        inputAttributes: {
          min: (this.product.limit / 100),
          max: (this.product.limit - this.product.quantity),
          step: 1
        },
        inputValue: (this.product.limit / 100),
        confirmButtonText: 'Onayla',
        showLoaderOnConfirm: true,
        preConfirm: (inputValue) => {
          this.inputValue = inputValue
          lockMoney(this.product.id, inputValue);
        },
        allowOutsideClick: () => !Swal.isLoading()
      }).then(() => {

      })

    }

  },
};
</script>

<style scoped>
.card-body{
    background-color:#f9f9f9 !important;
  }
  .list-group{
    color: #4d4d4d !important;
  }
  .list-group-item{
    background-color: #f9f9f9 !important;
  }
.caption-full {
  padding-right: 10px;
  padding-left: 10px;
}

.ratings {
  padding-right: 10px;
  padding-left: 10px;
  color: #b30118;
}



#item-title {
  font-family: "Bangers";
}
.btn-success {
  color: #fff;
  background-color: #00B786;
  border-color: #00B786;
  
}

.btn-success:hover {
  background-color: #066B50;
  border-color: #066B50;
}
</style>
