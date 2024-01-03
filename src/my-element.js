import { LitElement, css, html } from 'lit'

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
export class MyElement extends LitElement {
  static get properties() {
    return {
      /**
       * Copy for the read the docs hint.
       */
      docsHint: { type: String },

      /**
       * The number of times the button has been clicked.
       */
      count: { type: Number },
    }
  }

  constructor() {
    super()
    this.docsHint = 'Click on the Vite and Lit logos to learn more'
    this.count = 0
  }

  render() {
    return html`
      <button  class="show-modal" @click="${this.showBottomSheet}"> 
        Show Bottom Sheet 
      </button> 
      <div class="bottom-sheet"> 
        <div class="sheet-header"> 
            <div class="drag-handle" @mousedown="${this.startDragging}"></div> 
            <button class="close-btn" @click="${this.hideBottomSheet}"> 
                × 
            </button> 
        </div> 
        <div class="sheet-content"> 
            <h2> 
              Bottom Sheet Modal 
            </h2> 
            <p> 
                This is a draggable bottom sheet 
                modal with different styling. 
                You can drag it up or down, close it, 
                and it works on touch-enabled devices. 
            </p> 
            <!-- Add your content here -->
        </div> 
      </div> 
    `
  }

  showBottomSheet() {
    this.shadowRoot.querySelector('.bottom-sheet').style.display = "block";
    document.body.style.overflow = "hidden";
    this.shadowRoot.querySelector('.bottom-sheet').style.bottom = "0";
  }

  startDragging(e) {
    e.preventDefault();
    this.isDragging = false;
    this.startY = e.clientY;
    this.startBottom = parseInt(getComputedStyle(this.shadowRoot.querySelector('.bottom-sheet')).bottom);

    document.addEventListener("mousemove", this.drag);
    document.addEventListener("mouseup", this.stopDragging);
  }

  drag(e) {
    if (!this.isDragging) return;
    const deltaY = e.clientY - this.startY;
    this.shadowRoot.querySelector('.bottom-sheet').style.bottom = Math.max(this.startBottom - deltaY, 0) + "px";
  }

  stopDragging() {
    this.isDragging = false;
    document.removeEventListener("mousemove", this.drag);
    document.removeEventListener("mouseup", this.stopDragging);
  }

  hideBottomSheet() {
    this.shadowRoot.querySelector('.bottom-sheet').style.display = "none";
    document.body.style.overflow = "auto";
    this.shadowRoot.querySelector('.bottom-sheet').style.bottom = "-100%";
  }

  static get styles() {
    return css`
     body { 
    font-family: Arial, sans-serif; 
    background-color: #f2f2f2; 
    display: flex; 
    flex-direction: column; 
    align-items: center; 
    justify-content: center; 
    height: 100vh; 
    margin: 0; 
} 
  
.show-modal { 
    background-color: #007bff; 
    color: #fff; 
    border: none; 
    padding: 10px 20px; 
    font-size: 16px; 
    border-radius: 5px; 
    cursor: pointer; 
    transition: background-color 0.3s ease; 
} 
  
.show-modal:hover { 
    background-color: #0056b3; 
} 
  
.bottom-sheet { 
    display: none; 
    position: fixed; 
    bottom: 0; 
    left: 0; 
    width: 100%; 
    background-color: #fff; 
    border-top-left-radius: 20px; 
    border-top-right-radius: 20px; 
    transition: bottom 0.3s ease-in-out;
    bottom: -100%;
    box-shadow: 0px -3px 10px rgba(0, 0, 0, 0.2); 
    overflow: hidden; 
} 
  
.sheet-header { 
    display: flex; 
    justify-content: space-between; 
    align-items: center; 
    padding: 10px 20px; 
    background-color: #007bff; 
    color: #fff; 
} 
  
.drag-handle { 
    width: 30px; 
    height: 5px; 
    background-color: #fff; 
    border-radius: 10px; 
    cursor: grab; 
    margin: 0 auto; 
} 
  
.close-btn { 
    background: none; 
    border: none; 
    color: #fff; 
    font-size: 24px; 
    cursor: pointer; 
} 
  
.sheet-content { 
    padding: 20px; 
} 
  
.sheet-content h2 { 
    font-size: 24px; 
    margin-bottom: 10px; 
} 
  
.sheet-content p { 
    font-size: 16px; 
    line-height: 1.5; 
}
    `
  }
}

window.customElements.define('my-element', MyElement)
