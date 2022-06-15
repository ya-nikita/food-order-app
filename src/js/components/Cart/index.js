import createElement from '../../../assets/lib/create-element.js';
import escapeHtml from '../../../assets/lib/escape-html.js';

import Modal from '../Modal/index.js';

export default class Cart {
    cartItems = []; // [product: {...}, count: N]

    constructor(cartIcon) {
        this.cartIcon = cartIcon;

        this.addEventListeners();
    }

    addProduct(product) {
        if (!product) {
            return;
        }
        let cartItem;
        let productInTheCart = this.cartItems.find((item) =>
            item.product.id === product.id
        )
        if (!productInTheCart) {
            cartItem = { product, count: 1 };
            this.cartItems.push(cartItem);
        } else {
            productInTheCart.count++;
            cartItem = productInTheCart;
        }
        if (cartItem) {
            this.onProductUpdate(cartItem);
        }
    }

    updateProductCount = (productId, amount) => {
        let productIndex = this.cartItems.findIndex((item) =>
            productId === item.product.id
        )
        if (productIndex < 0) {
            return;
        }
        if (this.cartItems[productIndex].count >= 1) {
            this.cartItems[productIndex].count += amount;
            let cartItem = this.cartItems[productIndex];
            this.onProductUpdate(cartItem);
        }
        if (this.cartItems[productIndex].count == 0) {
            this.cartItems = this.cartItems.filter((item) => {
                return item != this.cartItems[productIndex];
            })
            this.onProductUpdate(null);
            let productCard = this.modalBody.querySelector(`[data-product-id="${productId}"]`);
            productCard.remove();
        }
    }

    isEmpty() {
        return this.cartItems.length == 0;
    }

    getTotalCount() {
        let totalCount = 0;
        this.cartItems.forEach((item) => {
            totalCount += item.count;
        })
        return totalCount;
    }

    getTotalPrice() {
        let totalPrice = 0;
        this.cartItems.forEach((item) => {
            totalPrice += item.product.price * item.count;
        })
        return totalPrice;
    }

    renderProduct(product, count) {
        return createElement(`
    <div class="cart-product" data-product-id="${product.id}">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${(product.price * count).toFixed(2)}</div>
        </div>
      </div>
    </div>`);
    }

    renderOrderForm() {
        return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(2)}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
    }

    renderModal() {
        this.modal = new Modal();
        this.modal.setTitle('Your order');
        this.modalBody = document.createElement('div');
        this.cartItems.forEach((item) => {
            let product = this.renderProduct(item.product, item.count);
            product.addEventListener('click', (event) => {
                product.dispatchEvent(new CustomEvent('productClick', {
                    detail: { productId: item.product.id, eventTarget: event.target },
                    bubbles: true
                }));
            })
            this.modalBody.insertAdjacentElement('beforeend', product);
        })
        this.orderForm = this.renderOrderForm();
        this.modalBody.insertAdjacentElement('beforeend', this.orderForm);
        this.modal.setBody(this.modalBody);
        this.modal.open();
        this.submitButton = this.modalBody.querySelector('.cart-buttons__button.btn-group__button.button');
        this.orderForm.addEventListener('submit', this.onSubmit)
        this.modalBody.addEventListener('productClick', (event) => {
            if (event.detail.eventTarget.closest('.cart-counter__button.cart-counter__button_minus')) {
                this.updateProductCount(event.detail.productId, -1)
            }
            if (event.detail.eventTarget.closest('.cart-counter__button.cart-counter__button_plus')) {
                this.updateProductCount(event.detail.productId, 1)
            }
        })
    }

    onProductUpdate(cartItem) {
        if (document.body.className == 'is-modal-open') {
            if (this.isEmpty()) {
                this.modal.close();
            }
        }
        if (document.body.className == 'is-modal-open' && cartItem) {
            let productId = cartItem.product.id;
            let productCount = this.modalBody.querySelector(`[data-product-id="${productId}"] .cart-counter__count`);
            let productPrice = this.modalBody.querySelector(`[data-product-id="${productId}"] .cart-product__price`);
            let infoPrice = this.modalBody.querySelector(`.cart-buttons__info-price`);
            productCount.innerHTML = cartItem.count;
            productPrice.innerHTML = `€${(cartItem.product.price * cartItem.count).toFixed(2)}`;
            infoPrice.innerHTML = `€${this.getTotalPrice().toFixed(2)}`;
        }

        this.cartIcon.update(this);
    }

    onSubmit = async (event) => {
        event.preventDefault();
        let formData = new FormData(this.orderForm);
        this.submitButton.classList.add('is-loading');
        let response = await fetch('https://httpbin.org/post', {
            method: 'POST',
            body: formData
        });
        if (response.status == 200) {
            this.cartItems = [];
            this.onProductUpdate(null);
            this.modal.setTitle('Success!');
            this.modalBody.innerHTML = `
      <div class="modal__body-inner">
        <p>
          Order successful! Your order is being cooked :) <br>
          We’ll notify you about delivery time shortly.<br>
          <img src="/assets/images/delivery.gif">
        </p>
      </div>
      `;
            this.modal.setBody(this.modalBody);
            this.modal.open();
        } else {
            throw new Error(response.status);
        }
    };

    addEventListeners() {
        this.cartIcon.elem.onclick = () => this.renderModal();
    }
}