import { html, css, LitElement } from 'lit';
import photo1 from './assets/photo1.jpg';
import photo2 from './assets/photo2.jpg';
import photo3 from './assets/photo3.jpg';
import photo4 from './assets/photo4.jpg';
import files from './assets/files.jpg';
import gmail from './assets/gmail.png';
import meet from './assets/meet.png';
import drive from './assets/drive.png';
import copy from './assets/copy1.png';
import nearby from './assets/nearby.png';

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
      width: 30px;
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

    .icon {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background-color: #f0f0f0;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .options {
      display: flex;
      align-items: center;
      justify-content: space-around;
      padding: 30px;
    }

.option {
  width: 100px;
  height: 40px;
  border: none;
  display: flex;
  align-items: center;
  justify-content: space-around;
  border-radius: 20px;
  background-color: #f0f0f0;
  color: black;
  font-size: 16px;
}

.contacts {
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-top: 15px;
  overflow-x: scroll;
}

.contact {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.contact-photo {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.contact-name {
  font-size: 14px;
  color: black;
  margin-top: 5px;
}

.files {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

.copy {
  width: 25px;
  height: 25px;
}

@media (min-width: 768px) {
  :host {
      display: block;
      position: fixed;
      justify-content: center;
      bottom: 0;
      width: 80%;
      background-color: white;
      border-radius: 25px 25px 0 0;
      touch-action: none; /* this is required to enable dragging on mobile devices */
    }
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
      this.currentTranslateY += diffY;
      this.currentTranslateY = Math.max(this.currentTranslateY, 0);
      this.currentTranslateY = Math.min(this.currentTranslateY, window.innerHeight);
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
      <div class="options">
        <button class="option">
          <img src=${copy} alt="copy" class="copy" />
          <p>Copy</p>
        </button>
        <button class="option">
          <img src=${nearby} alt="copy" class="copy" />
          Nearby
        </button>
      </div>
      <div class="icons">
        <div class="contact">
          <img src=${files} alt="Alejandro" class="contact-photo">
        <div class="contact-name">Files</div>
      </div>
      <div class="contact">
        <img src=${gmail} alt="Alejandro" class="contact-photo">
        <div class="contact-name">Gmail</div>
      </div>
        <div class="contact">
          <img src=${meet} alt="Alejandro" class="contact-photo">
          <div class="contact-name">Meet</div>
        </div>
        <div class="contact">
          <img src=${drive} alt="Alejandro" class="contact-photo">
          <div class="contact-name">Drive</div>
        </div>
      </div>

      <div class="send-section">
                <div class="contacts">
                    <div class="contact">
                        <img src=${photo1} alt="Alejandro" class="contact-photo">
                        <div class="contact-name">Joel</div>
                    </div>
                    <div class="contact">
                        <img src=${photo2} alt="Oli" class="contact-photo">
                        <div class="contact-name">Oli </div>
                    </div>

                    <div class="contact">
                        <img src=${photo3} alt="Ana" class="contact-photo">
                        <div class="contact-name">Ana</div>
                    </div>
                    <div class="contact">
                        <img src=${photo4} alt="Marty" class="contact-photo">
                        <div class="contact-name">Marty</div>
                    </div>
                </div>
            </div>
      </div>
    `;
  }
}

customElements.define('my-element', BottomSheet);

