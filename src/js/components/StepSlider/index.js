export default class StepSlider {
    constructor({ steps, value = 0 }) {
        this.steps = steps;
        this.newSliderValue = value;
        this.segments = steps - 1;
        this.render();
        this.sliderThumb.ondragstart = () => false;
    }
    render() {
        this.elem = document.createElement('div');
        this.elem.className = 'slider';
        this.elem.innerHTML = `
      <div class="slider__thumb" style="left: 50%;">
        <span class="slider__value">2</span>
      </div>
      <div class="slider__progress" style="width: 50%;"></div>
      <div class="slider__steps">
      </div>
      `;
        this.sliderSteps = this.elem.querySelector('.slider__steps');
        this.sliderValue = this.elem.querySelector('.slider__value');
        this.sliderThumb = this.elem.querySelector('.slider__thumb');
        this.sliderProgress = this.elem.querySelector('.slider__progress');
        for (let i = 0; i < this.steps; i++) {
            this.sliderSteps.insertAdjacentHTML('beforeend', '<span></span>');
        }
        this.sliderSteps.children[this.newSliderValue].className = 'slider__step-active';
        this.sliderValue.innerHTML = this.newSliderValue;
        this.sliderThumb.style.left = this.sliderProgress.style.width = `${this.newSliderValue / this.segments * 100}%`;
        this.elem.addEventListener('click', this.setSliderValueOnCLick);
        this.sliderThumb.addEventListener('pointerdown', this.setSliderValueOnDrag);
    }
    setSliderValueOnCLick = (event) => {
        this.clickPosition = event.clientX - this.elem.getBoundingClientRect().left;
        this.clickPositionRelative = this.clickPosition / this.elem.offsetWidth;
        this.newSliderValue = Math.round(this.clickPositionRelative * this.segments);
        this.sliderValue.innerHTML = this.newSliderValue;
        this.sliderThumb.style.left = this.sliderProgress.style.width = `${this.newSliderValue / this.segments * 100}%`;
        this.elem.querySelector('.slider__step-active').removeAttribute('class');
        this.sliderSteps.children[this.newSliderValue].className = 'slider__step-active';
        let sliderChange = new CustomEvent('slider-change', {
            detail: this.newSliderValue,
            bubbles: true
        });
        this.elem.dispatchEvent(sliderChange);
    }
    setSliderValueOnDrag = (event) => {
        event.preventDefault();
        this.shiftX = event.clientX - this.sliderThumb.getBoundingClientRect().left;
        document.addEventListener('pointermove', this.onPointerMove);
        document.addEventListener('pointerup', this.onPointerUp);
    }
    onPointerMove = (event) => {
        this.pointerPosition = event.clientX - this.elem.getBoundingClientRect().left;
        this.pointerPositionRelative = this.pointerPosition / this.elem.offsetWidth;
        if (this.pointerPositionRelative < 0) {
            this.pointerPositionRelative = 0;
        }
        if (this.pointerPositionRelative > 1) {
            this.pointerPositionRelative = 1;
        }
        this.pointerPositionPercents = this.pointerPositionRelative * 100;
        this.sliderThumb.style.left = this.sliderProgress.style.width = `${this.pointerPositionPercents}%`;
        this.newSliderValue = Math.round(this.pointerPositionRelative * this.segments);
        this.elem.querySelector('.slider__step-active').removeAttribute('class');
        this.sliderSteps.children[this.newSliderValue].className = 'slider__step-active';
        this.sliderValue.innerHTML = this.newSliderValue;
        this.elem.className = 'slider slider_dragging';
    }
    onPointerUp = () => {
        this.sliderThumb.style.left = this.sliderProgress.style.width = `${this.newSliderValue / this.segments * 100}%`;
        this.elem.className = 'slider';
        document.removeEventListener('pointerup', this.onPointerUp);
        document.removeEventListener('pointermove', this.onPointerMove);
        let sliderChange = new CustomEvent('slider-change', {
            detail: this.newSliderValue,
            bubbles: true
        });
        this.elem.dispatchEvent(sliderChange);
    }
}