<template>
  <div class="mb-5 col-sm-6 col-md-6 col-lg-6 item" :class="{ 'list-group-item': displayList }">
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
import Swal from 'sweetalert2'
export default {
  props: ["item", "displayList"],
  data() {
    return {
      progress: 100
    }
  },
  methods: {
    ...mapActions(["addMessage"]),
    invest() {

      Swal.fire({
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
        preConfirm: (login) => {
          return fetch(`//api.github.com/users/${login}`)
            .then(response => {
              if (!response.ok) {
                throw new Error(response.statusText)
              }
              return response.json()
            })
            .catch(error => {
              Swal.showValidationMessage(
                `Request failed: ${error}`
              )
            })
        },
        allowOutsideClick: () => !Swal.isLoading()
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: `${result.value.login}'s avatar`,
            imageUrl: result.value.avatar_url
          })
        }
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

