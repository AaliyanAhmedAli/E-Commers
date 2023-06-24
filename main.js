





























let cartIcon = document.querySelector('#cart-icon');
let cart = document.querySelector('.cart');
let closeCart = document.querySelector('#Close-Cart');

cartIcon.addEventListener('click', () => {
  cart.classList.add('active');
});

closeCart.addEventListener('click', () => {
  cart.classList.remove('active');
});

document.addEventListener('DOMContentLoaded', ready);

function ready() {
  let removeCartButtons = document.getElementsByClassName('cart-remove');
  for (let i = 0; i < removeCartButtons.length; i++) {
    let button = removeCartButtons[i];
    button.addEventListener('click', removeCartItem);
  }

  let quantityInputs = document.getElementsByClassName('cart-quantity');
  for (let i = 0; i < quantityInputs.length; i++) {
    let input = quantityInputs[i];
    input.addEventListener('change', quantityChanged);
  }

  let addCartButtons = document.getElementsByClassName('add-cart');
  for (let i = 0; i < addCartButtons.length; i++) {
    let button = addCartButtons[i];
    button.addEventListener('click', addCartClicked);
  }
  loadCartItems();
}

function removeCartItem(event) {
  let buttonClicked = event.target;
  buttonClicked.parentElement.remove();
  updateTotal();
  saveCartItems();
}

function quantityChanged(event) {
  let input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updateTotal();
  saveCartItems();
}

function addCartClicked(event) {
  let button = event.target;
  let shopProduct = button.parentElement;
  let title = shopProduct.querySelector('.PRODUCT-TITLE').innerText;
  let price = shopProduct.querySelector('.price').innerText;
  let productImg = shopProduct.querySelector('.products-img').src;
  addProductToCart(title, price, productImg);
  updateTotal();
  saveCartItems();
  updateCartIcon ()
}

function addProductToCart(title, price, productImg) {
  let cartShopBox = document.createElement('div');
  cartShopBox.classList.add('cart-box');
  let cartItems = document.querySelector('.cart-content');
  let cartItemsName = cartItems.getElementsByClassName('cart-product-title');
  for (let i = 0; i < cartItemsName.length; i++) {
    if (cartItemsName[i].innerText === title) {
      alert('You have already added this item to cart');
      return;
    }
  }
  let cartBoxContent = `
    <img src="${productImg}" alt="" class="cart-img">
    <div class="detail-box">
      <div class="cart-product-title">${title}</div>
      <div class="cart-price">${price}</div>
      <input type="number" name="" id="" value="1" class="cart-quantity">
    </div>
    <i class='bx bx-trash-alt cart-remove'></i>
  `;
  cartShopBox.innerHTML = cartBoxContent;
  cartItems.append(cartShopBox);
  cartShopBox.querySelector('.cart-remove').addEventListener('click', removeCartItem);
  cartShopBox.querySelector('.cart-quantity').addEventListener('change', quantityChanged);
}

function updateTotal() {
  let cartBoxes = document.getElementsByClassName('cart-box');
  let total = 0;
  for (let i = 0; i < cartBoxes.length; i++) {
    let cartBox = cartBoxes[i];
    let priceElement = cartBox.querySelector('.cart-price');
    let quantityElement = cartBox.querySelector('.cart-quantity');
    let price = parseFloat(priceElement.innerText.replace('$', ''));
    let quantity = quantityElement.value;
    total += price * quantity;
  }
  total = Math.round(total * 100) / 100;
  document.querySelector('.total-Price').innerText = '$' + total;

  localStorage.setItem('cartTotal', total);
}

function saveCartItems() {
  let cartContent = document.querySelector('.cart-content');
  let cartBoxes = cartContent.getElementsByClassName('cart-box');
  let cartItems = [];

  for (let i = 0; i < cartBoxes.length; i++) {
    let cartBox = cartBoxes[i];
    let titleElement = cartBox.querySelector('.cart-product-title');
    let priceElement = cartBox.querySelector('.cart-price');
    let quantityElement = cartBox.querySelector('.cart-quantity');
    let productImg = cartBox.querySelector('.cart-img').src;

    let item = {
      title: titleElement.innerText,
      price: priceElement.innerText,
      quantity: quantityElement.value,
      productImg: productImg,
    };
    cartItems.push(item);
  }
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

function loadCartItems() {
  let cartItems = localStorage.getItem('cartItems');
  if (cartItems) {
    cartItems = JSON.parse(cartItems);

    for (let i = 0; i < cartItems.length; i++) {
      let item = cartItems[i];
      addProductToCart(item.title, item.price, item.productImg);

      let cartBoxes = document.getElementsByClassName('cart-box');
      let cartBox = cartBoxes[cartBoxes.length - 1];
      let quantityElement = cartBox.querySelector('.cart-quantity');
      quantityElement.value = item.quantity;
    }
  }
  let cartTotal = localStorage.getItem('cartTotal');
  if (cartTotal) {
    document.querySelector('.total-Price').innerText = '$' + cartTotal;
  }
  updateCartIcon ();
}



function updateCartIcon (){
  let cartBoxes = document.getElementsByClassName('cart-box');
  let quantity = 0;

  for (let i=0; i < cartBoxes.length; i++){
    let cartBox = cartBoxes[i];
    let quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];
    quantity += parseInt(quantityElement.value);
  }
  let cartIcon = document.querySelector('#cart-icon');
  cartIcon.setAttribute('data-quantity', quantity);
}






