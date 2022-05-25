let classList = document.querySelector('.goods-list');

const goods = [
  { title: 'Shirt', price: 150 },
  { title: 'Socks', price: 50 },
  { title: 'Jacket', price: 350 },
  { title: 'Shoes', price: 250 },
];

const renderGoodsItem = (title = 'no product', price = 'no price') => {
  return `
    <div class="goods-item">
      <h3>${title}</h3>
      <p>${price}</p>
    </div>
  `;
};

const renderGoodsList = (list) => {
  classList.innerHTML = list.map(item => renderGoodsItem(item.title, item.price)).join('');
}

renderGoodsList(goods);