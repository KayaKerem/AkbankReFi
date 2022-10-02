<template>
  <div class="mb-5 col-sm-6 col-md-12 col-lg-4 item" :class="{ 'list-group-item': displayList }">
    <div class="thumbnail card">
      <div class="img-event intrinsic" style="background-color:#f9f9f9;border-top-right-radius: 20px;    border-top-left-radius: 20px;">
       <a :href="'/product/' + item.id"><img :src="item.thumbnail_url" alt="" class="grow thumbnail-image card-img-top intrinsic-item p-3"  /></a>
      </div>
      <div class="card-body" style="border-bottom-right-radius: 20px;    border-bottom-left-radius: 20px;    background-color: #f9f9f9 !important;">
        <router-link :to="'/product/' + item.id" tag="h3" class="card-title"><a id="item-title">{{ item.title }}</a>
        </router-link>
        <!-- <h6 v-if="item.quantity < 1000 && item.quantity > 0" class="card-subtitle mb-2 remain">
          {{ item.quantity }} USDC kaldı!
        </h6> -->
        <div class="progress">
          <div class="progress-bar bg-warning" role="progress" v-bind:style="{ width: ((item.quantity*100)/item.limit) + '%'}"
            v-bind:aria-valuenow="item.quantity" aria-valuemin="0" aria-valuemax="100">

            
          {{item.quantity}} / {{item.limit}}

          </div > <p v-if="item.quantity==0" style="margin-left:auto">{{item.quantity}} / {{item.limit}} </p>
        </div>
        <p class="card-text truncate">
          {{ item.description | shortDescription }}
        </p>

        <div class="row">
          <!-- <p class="col-6 lead"> Min {{ item.price }} USDC</p> -->
          <p class="col">
        <a>  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="bi bi-clock-history"
          viewBox="0 0 16 16">
          <path
            d="M8.515 1.019A7 7 0 0 0 8 1V0a8 8 0 0 1 .589.022l-.074.997zm2.004.45a7.003 7.003 0 0 0-.985-.299l.219-.976c.383.086.76.2 1.126.342l-.36.933zm1.37.71a7.01 7.01 0 0 0-.439-.27l.493-.87a8.025 8.025 0 0 1 .979.654l-.615.789a6.996 6.996 0 0 0-.418-.302zm1.834 1.79a6.99 6.99 0 0 0-.653-.796l.724-.69c.27.285.52.59.747.91l-.818.576zm.744 1.352a7.08 7.08 0 0 0-.214-.468l.893-.45a7.976 7.976 0 0 1 .45 1.088l-.95.313a7.023 7.023 0 0 0-.179-.483zm.53 2.507a6.991 6.991 0 0 0-.1-1.025l.985-.17c.067.386.106.778.116 1.17l-1 .025zm-.131 1.538c.033-.17.06-.339.081-.51l.993.123a7.957 7.957 0 0 1-.23 1.155l-.964-.267c.046-.165.086-.332.12-.501zm-.952 2.379c.184-.29.346-.594.486-.908l.914.405c-.16.36-.345.706-.555 1.038l-.845-.535zm-.964 1.205c.122-.122.239-.248.35-.378l.758.653a8.073 8.073 0 0 1-.401.432l-.707-.707z" />
          <path d="M8 1a7 7 0 1 0 4.95 11.95l.707.707A8.001 8.001 0 1 1 8 0v1z" />
          <path d="M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5z" />
        </svg> 02-11-2022</a> 
          </p>
          <p class="col" v-if="item.quantity<item.limit">
            <button class="btn  btn-success pull-right"  @click="this.invest">
              Katıl
            </button>
          </p>
          <p class="col" v-else>
            <button class="btn btn-success pull-right" disabled @click="this.invest">
            Hedefe Ulaşıldı
            </button>
              
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { ethers } from "ethers";
import abi from "../utils/refarm.json";
import Refarm from "../utils/refarm.json";
import Swal from "sweetalert2";



const contractAddress = "0x997111AFaf3b305caE45aab4c5ca9205790B6881";
const contractABI = abi.abi;

console.log(contractAddress);
console.log(contractABI);
console.log(Refarm);

const AVALANCHE_MAINNET_PARAMS = {
  chainId: '0xA86A',
  chainName: 'Avalanche Mainnet C-Chain',
  nativeCurrency: {
    name: 'Avalanche',
    symbol: 'AVAX',
    decimals: 18
  },
  rpcUrls: ['https://api.avax.network/ext/bc/C/rpc'],
  blockExplorerUrls: ['https://snowtrace.io/']
}
console.log(AVALANCHE_MAINNET_PARAMS)
const AVALANCHE_TESTNET_PARAMS = {
  chainId: '43113',
  chainName: 'Avalanche FUJI C-Chain',
  nativeCurrency: {
    name: 'Avalanche',
    symbol: 'AVAX',
    decimals: 18
  },
  rpcUrls: ['https://api.avax-test.network/ext/bc/C/rpc'],
  blockExplorerUrls: ['https://testnet.snowtrace.io/']
}
console.log(AVALANCHE_TESTNET_PARAMS)
const AVALANCHE_NETWORK_PARAMS = AVALANCHE_TESTNET_PARAMS
console.log(AVALANCHE_NETWORK_PARAMS)
export default {
  props: ["item", "displayList"],
  data() {
    return {
      inputValue:null,
      progress: 100,
      currentContract: null,
      contractAddress: "0x997111AFaf3b305caE45aab4c5ca9205790B6881",
    }
  },
  methods: {
    ...mapActions(["addMessage"]),
    lockMoney: async function (id,credit) {
        try {
          const { ethereum } = window;
          if (ethereum) {
            const provider = new ethers.providers.Web3Provider(ethereum, "any");
            const signer = provider.getSigner();
            const Refarm = new ethers.Contract(
              contractAddress,
              contractABI,
              signer
            );
           
            const refarmtxn = await Refarm.lockMoney(
              id,
              credit

            );
            console.log(refarmtxn);
            await refarmtxn.wa
            
            Swal.fire({
              icon: "success",
              title: "Success",
              text: refarmtxn,
            });
          }
        } catch (error) {
          this.transactionError = true;
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error,
          });
        }
      },
    invest: async function () {
      await Swal.fire({
        title: 'Yatırım yapacağınız miktarı belirleyin',
        input: 'range',
        inputLabel: 'USDC ',
        inputAttributes: {
          min: (this.item.limit / 100),
          max: (this.item.limit - this.item.quantity),
          step: 1
        },
        inputValue: (this.item.limit / 100),
        confirmButtonText: 'Onayla',
        showLoaderOnConfirm: true,
        preConfirm: (inputValue) => {
          this.inputValue = inputValue
          this.lockMoney(this.item.id, inputValue);
        },
        allowOutsideClick: () => !Swal.isLoading()
      }).then(() => {
        
      })
      
    }

  },
  filters: {
    shortDescription(value) {
      if (value && value.length > 100) {
        return value.substring(0, 100) + "...";
      } else {
        return value;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
#item-title {
  font-family: "Open Sans", sans-serif !important;
}

#item-title:hover {
  font-family: "Open Sans", sans-serif !important;
  color: #EFB631;
  text-decoration: none !important;
}

div.card {
  height: 100%;
}

.card-text {
  font-size: 0.875rem;
}

.remain {
  color: #b30118;
}

.grow {
  transition: all 0.2s ease-in-out;
}

.grow:hover {
  transform: scale(1.1);
}

.list-group-item {
  float: none;
  width: 100%;
  background-color: #F9F9F9;
  margin-bottom: 30px;
  -ms-flex: 0 0 100%;
  flex: 0 0 100%;
  max-width: 100%;
  padding: 0 1rem;
  border: 0;

  .thumbnail {
    display: inline-block;
    width: 100%;
  }

  .img-event {
    width: 20%;
    float: left;
    padding: 0 !important;
    margin: 0;
    height: auto;
  }

  .thumbnail-image {
    position: static;
  }

  .card-body {
    float: left;
    width: 80%;
    margin: 0;
  }

  @media (max-width: 767.98px) {
    .img-event {
      width: 30%;
      float: left;
      padding: 0 !important;
      margin: 0;
    }

    .card-body {
      float: left;
      width: 70%;
      margin: 0;
    }
  }
}

.item.list-group-item:before,
.item.list-group-item:after {
  display: table;
  content: " ";
}

.item.list-group-item:after {
  clear: both;
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

