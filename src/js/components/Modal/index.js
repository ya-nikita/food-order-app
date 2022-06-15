export default class Modal {
    constructor() {
        this.render();
        this.closeButton = this.elem.querySelector('.modal__close');
        this.closeButton.addEventListener('click', this.close);
    }
    render() {
        this.elem = document.createElement('div');
        this.elem.className = 'modal';
        this.elem.innerHTML = `
      <div class="modal__overlay"></div>
  
      <div class="modal__inner">
        <div class="modal__header">
          <button type="button" class="modal__close">
            <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
          </button>
  
          <h3 class="modal__title">
          </h3>
        </div>
  
        <div class="modal__body">
        </div>
      </div>`;
    }
    setTitle(title) {
        this.elem.querySelector('.modal__title').innerHTML = title;
    }
    setBody(body) {
        let modalBody = this.elem.querySelector('.modal__body');
        modalBody.innerHTML = '';
        modalBody.append(body);
    }
    open() {
        document.body.className = 'is-modal-open';
        document.body.append(this.elem);
        this.modalWindow = document.body.querySelector('.modal');
        document.addEventListener('keydown', this.close);
    }
    close = (event) => {
        if (!event || event.type == 'click' || event.code == 'Escape') {
            this.modalWindow.remove();
            document.body.removeAttribute('class');
            document.removeEventListener('keydown', this.close);
        }
    }
}