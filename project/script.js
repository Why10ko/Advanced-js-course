const goods = [
  { product_name: 'Shirt', price: 150 },
  { product_name: 'Socks', price: 50 },
  { product_name: 'Jacket', price: 350 },
  { product_name: 'Shoes', price: 250 },
];

const BASE_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/';
const GET_GOODS_ITEMS = `${BASE_URL}catalogData.json`
const GET_BASKET_GOODS_ITEMS = `${BASE_URL}getBasket.json`

function service(url, callback) {
  xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.send();
  xhr.onload = () => {
    callback(JSON.parse(xhr.response));
  }
}

class GoodsItem {
  constructor({ product_name, price }) {
    this.product_name = product_name;
    this.price = price;
  }
  render() {
    return `
    <div class="goods-item">
      <h3>${this.product_name}</h3>
      <p>${this.price}</p>
    </div>
  `;
  }
}

class GoodsList {
  items = [];
  fetchGoods(callback) {
    service(GET_GOODS_ITEMS, (data) => {
      this.items = data;
      callback();
    });
  }
  getPrice() {
    return this.items.reduce(
      function (sum, items) {
        return sum + items.price;
      }, 0);
  }
  render() {
    const goods = this.items.map(item => {
      const goodItem = new GoodsItem(item);
      return goodItem.render()
    }).join('');

    document.querySelector('.goods-list').innerHTML = goods;
  }
}

class BasketGoodsList {
  items = [];
  fetchGoods() {
    service(GET_BASKET_GOODS_ITEMS, (data) => {
      this.items = data.contents;
    });
  }
}

const goodsList = new GoodsList();
goodsList.fetchGoods(() => {
  goodsList.render();
});

const basketGoodsList = new BasketGoodsList();
basketGoodsList.fetchGoods();
