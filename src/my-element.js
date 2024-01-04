import { html, css, LitElement } from 'lit';

class BottomSheet extends LitElement {
  static styles = css`
    :host {
      display: block;
      position: fixed;
      bottom: 0;
      width: 100%;
      background-color: white;
      border-radius: 25px 25px 0 0;
      touch-action: none; /* this is required to enable dragging on mobile devices */
    }
    .line {
      width: 75px;
      height: 4px;
      background-color: grey;
      margin: 15px auto;
      border-radius: 2px;
    }

    .icons {
      display: flex;
      align-items: center;
      justify-content: space-around;
    }
  `;

  constructor() {
    super();
    this.dragStartY = 0;
    this.currentTranslateY = 0;
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('pointerdown', this.handleDragStart);
    this.addEventListener('pointermove', this.handleDrag);
    this.addEventListener('pointerup', this.handleDragEnd);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('pointerdown', this.handleDragStart);
    this.removeEventListener('pointermove', this.handleDrag);
    this.removeEventListener('pointerup', this.handleDragEnd);
  }

  handleDragStart(event) {
    this.dragStartY = event.clientY;
    this.style.transition = 'none';
  }

  handleDrag(event) {
    if (this.dragStartY) {
      const diffY = event.clientY - this.dragStartY;
      this.currentTranslateY = Math.max(this.currentTranslateY + diffY, 0);
      this.style.transform = `translateY(${this.currentTranslateY}px)`;
      this.dragStartY = event.clientY;
    }
  }

  handleDragEnd() {
    this.dragStartY = 0;
    this.style.transition = 'transform 0.3s ease-out';
    if (this.currentTranslateY < window.innerHeight / 2) {
      this.currentTranslateY = 0;
    } else {
      this.currentTranslateY = window.innerHeight;
    }
    this.style.transform = `translateY(${this.currentTranslateY}px)`;
  }

  render() {
    return html`
      <div class="bottom-sheet">
      
      <div class="line"></div>
      <slot></slot>
      <h1>Icons</h1>
      <p>nksfpgefbkv, kspjfhdijgbdkfgbpijdf,g jpdfhvjdnfijshgjdfngkbdkjf bkdfnkjnb,d f ffvbkjhpkd, fbkpndfl,bnm,sdnjn gb,nfpknb,x^dnblf d blkndf,nbkdkb d,njbkn,dfnkgbkf, bkfdnkl</p>
      <div class="icons">
        <i class="fa-solid fa-share-nodes"></i>
        <i class="icon add-to"></i>
        <i class="icon trash"></i>
        <i class="icon order-prints"></i>
        <i class="icon move-to-archive"></i>
      </div>
      </div>
    `;
  }
}

customElements.define('my-element', BottomSheet);

