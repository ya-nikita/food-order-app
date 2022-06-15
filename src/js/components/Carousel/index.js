export default class Carousel {
    constructor(slides) {
        this.slides = slides;
        this.render();
        this.carouselInner = this.elem.querySelector('.carousel__inner');
        this.buttonRight = this.elem.querySelector('.carousel__arrow.carousel__arrow_right');
        this.buttonLeft = this.elem.querySelector('.carousel__arrow.carousel__arrow_left');
        this.addSlides();
        this.initCarousel();
    }
    addSlides() {
        for (let slide of this.slides) {
            this.carouselSlide = document.createElement('div');
            this.carouselSlide.innerHTML = `
        <img src="/assets/images/carousel/${slide.image}" class="carousel__img" alt="slide">
        <div class="carousel__caption">
          <span class="carousel__price">€${slide.price.toFixed(2)}</span>
          <div class="carousel__title">${slide.name}</div>
          <button type="button" class="carousel__button">
            <img src="/assets/images/icons/plus-icon.svg" alt="icon">
          </button>
        </div>`;
            this.carouselSlide.classList.toggle('carousel__slide');
            this.carouselSlide.dataset.id = slide.id;
            this.carouselInner.append(this.carouselSlide);

            let addButton = this.carouselSlide.querySelector('.carousel__button');
            let userEvent = new CustomEvent("product-add", {
                detail: slide.id,
                bubbles: true,
            })
            addButton.onclick = () => {
                this.elem.dispatchEvent(userEvent);
            }
        }
    }
    initCarousel() {
        let sliderPosition = 0;
        let slideCount = 1;
        this.buttonLeft.style.display = 'none';

        this.buttonRight.onclick = () => {
            if (slideCount < this.slides.length) {
                sliderPosition -= this.carouselInner.offsetWidth;
                this.carouselInner.style.transform = `translateX(${sliderPosition}px)`;
                slideCount++;
                this.buttonLeft.style.display = '';
                if (slideCount == this.slides.length) {
                    this.buttonRight.style.display = 'none';
                }
            }
        }
        this.buttonLeft.onclick = () => {
            if (slideCount > 1) {
                sliderPosition += this.carouselInner.offsetWidth;
                this.carouselInner.style.transform = `translateX(${sliderPosition}px)`;
                slideCount--;
                this.buttonRight.style.display = '';
                if (slideCount == 1) {
                    this.buttonLeft.style.display = 'none';
                }
            }
        }
    }
    render() {
        this.elem = document.createElement('div');
        this.elem.classList.toggle('carousel');
        this.elem.innerHTML = `
      <div class="carousel__arrow carousel__arrow_right">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon">
    </div>
    <div class="carousel__arrow carousel__arrow_left">
      <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
    </div>
    <div class="carousel__inner">
    </div>`
    }
};