export default class RibbonMenu {
    constructor(categories) {
        this.categories = categories;
        this.render();
        this.ribbonInner = this.elem.querySelector('.ribbon__inner');
        this.addRibbonItems();
        this.ribbonScroll();
        this.selectLink();
    }
    render() {
        this.elem = document.createElement('div');
        this.elem.classList.toggle('ribbon');
        this.elem.innerHTML = `
      <button id="ribbon_arrow_left" class="ribbon__arrow ribbon__arrow_left ribbon__arrow_visible">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </button>
  
      <nav class="ribbon__inner">
      </nav>
  
      <button id="ribbon_arrow_right" class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </button>`;
    }
    addRibbonItems() {
        for (let item of this.categories) {
            let ribbonItem = `<a href="#" class="ribbon__item" data-id="${item.id}">${item.name}</a>`;
            this.ribbonInner.insertAdjacentHTML('beforeend', ribbonItem);
        }
    }
    ribbonScroll() {
        let arrowButtonLeft = this.elem.querySelector('#ribbon_arrow_left');
        let arrowButtonRight = this.elem.querySelector('#ribbon_arrow_right');
        arrowButtonLeft.className = 'ribbon__arrow ribbon__arrow_left';
        this.ribbonInner.onscroll = () => {
            arrowButtonLeft.className = this.ribbonInner.scrollLeft == 0 ?
                'ribbon__arrow ribbon__arrow_left' : 'ribbon__arrow ribbon__arrow_left ribbon__arrow_visible';
            let scrollRight = this.ribbonInner.scrollWidth - this.ribbonInner.scrollLeft - this.ribbonInner.clientWidth;
            arrowButtonRight.className = scrollRight < 1 ?
                'ribbon__arrow ribbon__arrow_right' : 'ribbon__arrow ribbon__arrow_right ribbon__arrow_visible';
        }
        this.elem.addEventListener('click', (event) => {
            if (event.target.closest('#ribbon_arrow_left')) {
                this.ribbonInner.scrollBy(-350, 0);
            }
            if (event.target.closest('#ribbon_arrow_right')) {
                this.ribbonInner.scrollBy(350, 0);
            }
        });
    }
    selectLink() {
        this.ribbonInner.children[0].className = 'ribbon__item ribbon__item_active';
        this.ribbonInner.addEventListener('click', (event) => {
            event.preventDefault();
            if (event.target.tagName == 'A') {
                this.ribbonInner.querySelector('.ribbon__item.ribbon__item_active').className = 'ribbon__item';
                event.target.className = 'ribbon__item ribbon__item_active';
                let ribbonSelect = new CustomEvent('ribbon-select', {
                    detail: event.target.dataset.id,
                    bubbles: true
                })
                this.elem.dispatchEvent(ribbonSelect);
            };
        })
    }
};