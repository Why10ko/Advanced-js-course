const BASE_URL = 'http://localhost:8000/';
const GET_GOODS_ITEMS = `${BASE_URL}goods`
// const GET_BASKET_GOODS_ITEMS = `${BASE_URL}getBasket.json`

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
            <input type="text" class="goods-search" :value="value" @input="$emit('input', $event.target.value)"/>
            
         </div>
    `
  })
  const BasketItem = Vue.component('basket-item', {
    props: [
      'item'
    ],
    template: `
    <div class="basket-item">
      <div class="basket-item_field">
      <span class="basket-item__title">{{ item.data.product_name }}</span>
      <span class="basket-item__price">{{ item.data.price }}</span>
      </div>
      <div class="basket-item__count">
      <span>{{ item.count }}шт.</span>
      <button></button>
      <button></button>
      </div>
      <div class="basket-item__total">Всего {{ item.total }}р.</div>
    </div>
    `
  })

  const CustomButton = Vue.component('custom-button', {
    template: `
      <button class="search-button custom-button" type="button" v-on:click="$emit('click')">
         <slot></slot>
      </button>
    `
  })
  const basketGoods = Vue.component('basket-goods', {
    data() {
      return {
        basketGoodsItems: []
      }
    },

    template: `
      <div class="fixed-area">
         <div class="basket-card">
            <div class="basket-card__header">
               <h1 class="basket-card__header__title">basket card</h1>
               <div class="basket-card__header__delete-icon"
                  v-on:click="$emit('closeclick')"
               ></div>
            </div>
            <div class="basket-card__content">
               content
            </div>
         </div>
      </div>
    `,
    mounted() {

    }
  })

  const goodsItem = Vue.component('goods-item', {
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
      cardIsVision: false
    },
    methods: {
      setVisionCard() {
        this.cardIsVision = !this.cardIsVision
      },
      fetchGoods() {
        service(GET_GOODS_ITEMS).then((data) => {
          this.items = data;
          this.filteredItems = data;
        });
      },

      searchChangeHandler(value) {
        this.search = value;
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
window.onload = init