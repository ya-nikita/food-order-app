export default class ProductCard {
    constructor(product) {
        this.product = product;
        this.render();
        this.addProduct();
    }
    addProduct() {
        let userEvent = new CustomEvent("product-add", {
            detail: this.product.id,
            bubbles: true,
        })
        let addButton = this.elem.querySelector('.card__button');
        addButton.onclick = () => {
            this.elem.dispatchEvent(userEvent);
        }
    }
    render() {
        this.elem = document.createElement('div');
        this.elem.classList.toggle('card');
        this.elem.innerHTML = `<div class="card__top">
      <img src="/assets/images/products/${this.product.image}" class="card__image" alt="product">
      <span class="card__price">€${this.product.price.toFixed(2)}</span>
    </div>
    <div class="card__body">
      <div class="card__title">${this.product.name}</div>
      <button type="button" class="card__button">
        <img src="/assets/images/icons/plus-icon.svg" alt="icon">
      </button>
    </div>
    <ul class="card__description">
    <li><img class="card__description__icon" src="/assets/favicon/category.png" alt="-">
    Category: ${this.product.category}</li>
    <li><img class="card__description__icon" src="/assets/favicon/spiciness.png" alt="-">
    Spiciness: ${this.product.spiciness} of 4</li>
    <li><img class="card__description__icon" src="/assets/favicon/vegeterian.png" alt="-">
    Vegeterian: ${this.product.vegeterian ? `yes` : `no`}</li>
    <li><img class="card__description__icon" src="/assets/favicon/nuts.png" alt="-">
    Nuts: ${this.product.nuts ? `yes` : `no`}</li>
  </ul>
  `;
    }
}