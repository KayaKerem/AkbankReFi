<template>
  <div class="mb-5 col-sm-6 col-md-12 col-lg-4 item" :class="{ 'list-group-item': displayList }">
    <div class="thumbnail card">
      <div class="img-event intrinsic" style="background-color:#eaf774">
        <img :src="item.thumbnail_url" alt="" class="grow thumbnail-image card-img-top intrinsic-item p-3" />
      </div>
      <div class="card-body">
        <router-link :to="'/product/' + item.id" tag="h5" class="card-title"><a id="item-title">{{ item.title }}</a>
        </router-link>
        <h6 v-if="item.quantity < 1000 && item.quantity > 0" class="card-subtitle mb-2 remain">
          {{ item.quantity }} USDC kaldı!
        </h6>
        <div class="progress">
          <div class="progress-bar bg-warning" role="progress" v-bind:style="{ width: (item.quantity)  + '%'}"
            v-bind:aria-valuenow="item.quantity" aria-valuemin="0" aria-valuemax="100">

            {{item.quantity}} USDC


          </div>
        </div>
        <p class="card-text truncate">
          {{ item.description | shortDescription }}
        </p>

        <div class="row">
          <!-- <p class="col-6 lead"> Min {{ item.price }} USDC</p> -->

          <p class="col">
            <button class="btn btn-success pull-right" :disabled="item.quantity === 0" @click="this.invest">
              Katıl
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



const contractAddress = "0x19380F1C607cfA68432d7205d2f2f1C2FB4d833e";
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
      contractAddress: "0xF327DDC516d5eFe3073B46b59dB50CcE94711c70",
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
            console.log("transaction happening...");
            const refarmtxn = await Refarm.lockMoney(
              id,
              credit

            );
            console.log(refarmtxn);
            await refarmtxn.wa
            // alert("mined ", refarmtxn.hash);
            // console.log("data transaction happend!");
            Swal.fire({
              icon: "success",
              title: "Success",
              text: refarmtxn.hash,
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
          min: 10,
          max: 100,
          step: 1
        },
        inputValue: 25,
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
  background-color: #077437;
  border-color: #077437;
}

.btn-success:hover {
  background-color: #0a9145;
  border-color: #0a9145;
}
</style>

