import { LitElement, html } from 'lit'
import { customElement } from 'lit/decorators.js'
import { BottomSheet } from 'react-spring-bottom-sheet'

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement('my-element')
export class MyElement extends LitElement {
  render() {
    return html`
      <slot></slot>
      <button onClick={() => setOpen(true)}>Open</button>
      <BottomSheet open={open}>My awesome content here</BottomSheet>
    `
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'my-element': MyElement
  }
}
