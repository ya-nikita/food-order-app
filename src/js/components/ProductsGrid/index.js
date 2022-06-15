import ProductCard from '../ProductCard/index.js';

export default class ProductGrid {
    constructor(products) {
        this.products = products;
        this.filters = {};
        this.render();
        this.buildProductsGrid(this.products);
    }
    render() {
        this.elem = document.createElement('div');
        this.elem.className = 'products-grid';
        this.elem.innerHTML = `
    <div class="products-grid__inner">
    </div>`;
        this.productsGridInner = this.elem.querySelector('.products-grid__inner');
    }
    updateFilter = (filters) => {
        Object.assign(this.filters, filters);
        let spicinessFiltered = [];
        let categoryFiltered = [];
        let vegeterianFiltered = [];
        this.products.forEach((product) => {
            if (this.filters.maxSpiciness || this.filters.maxSpiciness == 0) {
                if (this.filters.maxSpiciness >= product.spiciness) {
                    spicinessFiltered.push(product);
                }
            } else {
                spicinessFiltered.push(product);
            }
        })
        spicinessFiltered.forEach((product) => {
            if (this.filters.category) {
                if (this.filters.category == product.category) {
                    categoryFiltered.push(product);
                }
            } else {
                categoryFiltered.push(product);
            }
        })
        categoryFiltered.forEach((product) => {
            if (this.filters.vegeterianOnly) {
                if (product.vegeterian) {
                    vegeterianFiltered.push(product);
                }
            } else {
                vegeterianFiltered.push(product);
            }
        })
        this.productsFiltered = vegeterianFiltered.filter((product) => {
            if (this.filters.noNuts) {
                if (!product.nuts) {
                    return product;
                }
            } else {
                return product;
            }
        })
        this.buildProductsGrid(this.productsFiltered);
    }
    buildProductsGrid = (products) => {
        this.productsGridInner.innerHTML = '';
        if (products.length > 0) {
            this.productsGridInner.className = 'products-grid__inner';
            for (let product of products) {
                let productCard = new ProductCard(product);
                this.productsGridInner.append(productCard.elem);
            }
        } else {
            this.productsGridInner.className = 'products-grid__no__results';
            this.productsGridInner.insertAdjacentHTML('beforeend', 'Sorry, no results found :(');
        }
    }
}