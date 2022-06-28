const BASE_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/';
const GET_GOODS_ITEMS = `${BASE_URL}catalogData.json`
const GET_BASKET_GOODS_ITEMS = `${BASE_URL}getBasket.json`

function service(url) {
  return fetch(url)
    .then((res) => res.json())
}

function init() {
  const Search = Vue.component('search', {
    props: [
      'value'
    ],
    template: `
    <div class="search">
      <input type="text" class="goods-search" :value="value" @input="$emit('input', $event.target.value)" />
     
    </div>
    `
  })
  const customButton = Vue.component('custom-button', {
    template: `
    <button class="search-button" type="button" v-on:click="$emit('click')">
      <slot></slot>
    </button>
    `
  })
  const basketGoods = Vue.component('basket-goods', {
    props: [
      "isvisiblecart"
    ],
    template: `
      <div class="fixed-area" v-if="isvisiblecart" >
        <div class="basket-card">
          <div class="basket-card__header">
            <h1 class="basket-card__header__title">basket card</h1>
            <div class="basket-card__header__delete-icon" v-on:click="$emit('closecart')"></div>
          </div>
          <div class="basket-card__content">
            content
          </div>
        </div>
      </div>
      `
  })
  const goodsItem = Vue.component("goods-item", {
    props: [
      'item'
    ],
    template: `
      <div class="goods-item">
        <h3>{{ item.product_name }}</h3>
        <p>{{ item.price }}</p>
      </div>
      `
  })

  const app = new Vue({
    el: '#root',
    data: {
      items: [],
      search: '',
      isVisibleCart: false
    },
    methods: {
      fetchGoods() {
        service(GET_GOODS_ITEMS).then((data) => {
          this.items = data;
          this.filteredItems = data;
        });
      },
      searchChangehandler(value) {
        this.search = value;
      },
      setVisionCart() {
        this.isVisibleCart = !this.isVisibleCart;
      }
    },
    computed: {
      calculatePrice() {
        return this.filteredItems.reduce((prev, { price }) => {
          return prev + price;
        }, 0)
      },
      filteredItems() {
        return this.filteredItems = this.items.filter(({ product_name }) => {
          return product_name.match(new RegExp(this.search, 'gui'))
        })
      }
    },
    mounted() {
      this.fetchGoods();
    }
  })
}
window.onload = init;

