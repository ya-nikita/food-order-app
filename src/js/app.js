import ProductsGrid from './components/ProductsGrid/index.js';

import Carousel from './components/Carousel/index.js';
import slides from './components/Carousel/slides.js';

import RibbonMenu from './components/RibbonMenu/index.js';
import categories from './components/RibbonMenu/categories.js';

import StepSlider from './components/StepSlider/index.js';

import CartIcon from './components/CartIcon/index.js';
import Cart from './components/Cart/index.js';

import '../styles/common.css';
import '../styles/index.css';

export default class Main {

    constructor() {
    }

    async render() {
        this.carousel = new Carousel(slides);
        let carouselHolder = document.querySelector('[data-carousel-holder]');
        carouselHolder.append(this.carousel.elem);

        this.ribbonMenu = new RibbonMenu(categories);
        let ribbonHolder = document.querySelector('[data-ribbon-holder]');
        ribbonHolder.append(this.ribbonMenu.elem);

        this.stepSlider = new StepSlider({ steps: 5, value: 3 });
        let sliderHolder = document.querySelector('[data-slider-holder]');
        sliderHolder.append(this.stepSlider.elem);

        this.cartIcon = new CartIcon();
        let cartIconHolder = document.querySelector('[data-cart-icon-holder]');
        cartIconHolder.append(this.cartIcon.elem);
        this.cart = new Cart(this.cartIcon);

        this.serverResponse = await fetch('../assets/products.json');
        this.products = await this.serverResponse.json();

        this.productsGrid = new ProductsGrid(this.products);
        let productsGridHolder = document.querySelector('[data-products-grid-holder]');
        productsGridHolder.innerHTML = '';
        productsGridHolder.append(this.productsGrid.elem);

        this.productsGrid.updateFilter({
            noNuts: document.getElementById('nuts-checkbox').checked,
            vegeterianOnly: document.getElementById('vegeterian-checkbox').checked,
            maxSpiciness: this.stepSlider.value,
            category: this.ribbonMenu.value
        });

        document.body.addEventListener('product-add', (event) => {
            let productToAdd = this.products.find((product) => product.id === event.detail);
            this.cart.addProduct(productToAdd);
            this.cartIcon.updatePosition();
        })

        document.body.addEventListener('slider-change', (event) => {
            this.productsGrid.updateFilter({
                maxSpiciness: event.detail
            });
        })

        document.body.addEventListener('ribbon-select', (event) => {
            this.productsGrid.updateFilter({
                category: event.detail
            });
        })

        document.body.addEventListener('change', (event) => {
            if (event.target.id == 'nuts-checkbox') {
                this.productsGrid.updateFilter({
                    noNuts: event.target.checked
                });
            }
            if (event.target.id == 'vegeterian-checkbox') {
                this.productsGrid.updateFilter({
                    vegeterianOnly: event.target.checked
                });
            }
        })
    }
}