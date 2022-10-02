<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark py-3" role="navigation">
    <div class="container">
      <!-- Brand and toggle get grouped for better mobile display -->
      <router-link to="/" class="navbar-brand mr-auto " style="font-size:1.75rem;font-weight:700;">ReFarm

        <!-- <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" class="bi bi-infinity"
          viewBox="0 0 16 16">
          <path
            d="M5.68 5.792 7.345 7.75 5.681 9.708a2.75 2.75 0 1 1 0-3.916ZM8 6.978 6.416 5.113l-.014-.015a3.75 3.75 0 1 0 0 5.304l.014-.015L8 8.522l1.584 1.865.014.015a3.75 3.75 0 1 0 0-5.304l-.014.015L8 6.978Zm.656.772 1.663-1.958a2.75 2.75 0 1 1 0 3.916L8.656 7.75Z" />
        </svg> -->
        <img src="../assets/img/logomain.png" alt="logomain" style="width:7%;" />
      </router-link>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTop"
        aria-controls="navbarTop" aria-expanded="false" aria-label="Toggle navigation" @click="toggleNavbar">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarTop" :class="{ show: isNavOpen }">
        <ul class="navbar-nav mr-auto"></ul>

        <ul class="nav navbar-nav">
          <li>
            <router-link id="productbutton" to="/store" class="btn btn-dark navbar-btn" tag="button">
              Projeler
            </router-link>
          </li>



          <li>
            <router-link to="/sorry"  id="orderbutton"  class="btn btn-dark navbar-btn" tag="button" >
              Whitepaper
            </router-link>
          </li>




          <li>
            <button v-if="!isLoggedIn" class="btn btn-light navbar-btn" tag="button" @click="connectWallet">
              <a id="sepettitle">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person"
                  viewBox="0 0 16 16">
                  <path
                    d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
                </svg> Cüzdanını Bağla</a>

            </button>
          </li>

          <li>
            <button v-if="isLoggedIn" class="btn btn-light navbar-btn" tag="button">
              <a id="sepettitle">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person"
                  viewBox="0 0 16 16">
                  <path
                    d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
                </svg> {{ currentAccount.substring(0, 8) }}...{{
                currentAccount.substring(8, 16)
                }}</a>

            </button>
          </li>
          <!--  -->
          <!-- ÇIKIŞ YAP BUTONU -->
          <li v-if="isLoggedIn" class="li-pointer nav-item">
            <a @click="logoutWallet" class="nav-link">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-power"
                viewBox="0 0 16 16">
                <path d="M7.5 1v7h1V1h-1z" />
                <path
                  d="M3 8.812a4.999 4.999 0 0 1 2.578-4.375l-.485-.874A6 6 0 1 0 11 3.616l-.501.865A5 5 0 1 1 3 8.812z" />
              </svg></a>
          </li>


        </ul>
      </div>
    </div>
    <!-- /.container -->
  </nav>
</template>

<script>
// import axios from "axios";
import { mapActions } from "vuex";
// import { ethers } from "ethers";
import Swal from "sweetalert2";


export default {
  data() {
    return {
      isNavOpen: false,
      isLoggedIn: false,

      transactionError: false,
      registeredList: null,
      isConnected: false,
      currentAccount: "",



    };
  },
  computed: {

  },
  mounted() {
    this.checkConnectedWalletExist();
    window.ethereum.on('accountsChanged', () => { this.currentAccount = null })

    // Reload the site if the user selects a different chain
    window.ethereum.on('chainChanged', () => window.location.reload())
  },
  methods: {
    ...mapActions(["addMessage", "clearMessage"]),
    getWhitepaper() {
      Swal.fire({
        title: '<h1>ReFarm</h1>',
        icon: 'info',
        html:
           '<p>Lorem Ipsum Lorem Ipsum Lorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem IpsumLorem Ipsum Lorem Ipsum Lorem IpsumLorem IpsumLorem Ipsum Lorem IpsumLorem IpsumLorem IpsumLorem Ipsum Lorem IpsumvLorem IpsumLorem Ipsum v vvLorem Ipsum Lorem IpsumLorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem IpsumLorem Ipsum</p>',

        showCloseButton: true,
        
        focusConfirm: false,
        confirmButtonText:
          '<i class="fa fa-thumbs-up"></i> Anladım!',
        confirmButtonAriaLabel: 'Thumbs up, Anladım!',
        
      })
      
    },
    toggleNavbar() {
      this.isNavOpen = !this.isNavOpen;
    },
    logout() {
      this.currentAccount = null;
      this.isLoggedIn = false;
      alert("Succesfully Log Out!", "success");
    },
    checkConnectedWalletExist: async function () {
      try {
        const { ethereum } = window;
        if (!ethereum) {
          alert("Make sure you have metamask!");
          return false;
        } else {
          console.log("We have the ethereum object", ethereum);
        }
        const accounts = await ethereum.request({ method: "eth_accounts" });
        if (accounts.length !== 0) {
          const account = accounts[0];
          console.log("Found an authorized account:", account);
          this.currentAccount = account;
          this.isLoggedIn = true;
          return true;
        } else {
          console.log("No authorized account found");
          return false;
        }
      } catch (error) {
        console.log(error);
        return false;
      }
    },
    connectWallet: async function () {
      try {
        const { ethereum } = window;
        if (!ethereum) {
          alert("Get MetaMask!");
          return;
        }
        const accounts = await ethereum.request({
          method: "eth_requestAccounts",
        });
        console.log("Connected", accounts[0]);
        this.isLoggedIn = true;
        this.currentAccount = accounts[0];
        let message_obj = {
          message: "Başarıyla bağlandı.",
          messageClass: "success",
          autoClose: true,
        };

        this.addMessage(message_obj);
        var element = document.body;
        element.classList.toggle("connected-body");
        // this.waitForTransaction();
      } catch (error) {
        console.log(error);
      }
    },
    logoutWallet() {
      this.currentAccount = null;
      this.isLoggedIn = false;
      let message_obj = {
        message: "Çıkış Yapıldı.",
        messageClass: "danger",
        autoClose: true,
      };

      this.addMessage(message_obj);
    },

  }
};
</script>


<style scoped lange="sass">
.navbar-btn a {
  color: white;
}

.container {
  padding-right: 68px;
}

.li-pointer {
  cursor: pointer;
}

.li-pointer:hover {
  cursor: pointer;
}

.btn-light {
  color: #fff;
  background-color: #fff;
  border-color: #094636;
}

.navbar {
  background-color: #066b50 !important;
}

#sepettitle {
  color: #091239 !important;
}

#logo {
  width: 30px;
}

#orderbutton {
  background-color: #066b50 !important;
  border-color: #066b50;
}

#orderbutton:hover {
  border-color: white;
  transition: 0.3s;
}

#productbutton {
  background-color: #066b50 !important;
  border-color: #066b50;
}

#productbutton:hover {
  border-color: white;
  transition: 0.3s;
}
</style>
