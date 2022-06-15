import createElement from '../../../assets/lib/create-element.js';

export default class CartIcon {
    constructor() {
        this.render();

        this.addEventListeners();
        this.mainContainer = document.querySelector('.container');
    }

    render() {
        this.elem = createElement('<div class="cart-icon"></div>');
        this.cartTopEdgePosition = this.elem.getBoundingClientRect().top + window.pageYOffset;
    }

    update(cart) {
        this.elem.classList.remove('shake');
        if (!cart.isEmpty()) {
            this.elem.classList.add('cart-icon_visible');

            this.elem.innerHTML = `
        <div class="cart-icon__inner">
          <span class="cart-icon__count">${cart.getTotalCount()}</span>
          <span class="cart-icon__price">€${cart.getTotalPrice().toFixed(2)}</span>
        </div>`;

            this.updatePosition();

            this.elem.classList.add('shake');
            // this.elem.addEventListener('transitionend', () => {
            //   this.elem.classList.remove('shake');
            // }, { once: false });

        } else {
            this.elem.classList.remove('cart-icon_visible');
        }
    }

    addEventListeners() {
        document.addEventListener('scroll', () => this.updatePosition());
        window.addEventListener('resize', () => this.updatePosition());
    }

    updatePosition() {
        this.leftMargin = Math.min(
            this.mainContainer.getBoundingClientRect().right + 20,
            document.documentElement.clientWidth - this.elem.offsetWidth - 10
        ) + 'px';
        if (window.pageYOffset > this.cartTopEdgePosition &&
            document.documentElement.clientWidth >= 767) {
            Object.assign(this.elem.style, {
                position: 'fixed',
                top: '50px',
                zIndex: 900,
                right: '10px',
                left: this.leftMargin,
            });
        } else {
            Object.assign(this.elem.style, {
                position: '',
                top: '',
                left: '',
                right: '',
                zIndex: ''
            });
        }
    }
}