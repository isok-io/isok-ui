import { LitElement, html } from 'lit'
import { customElement } from 'lit/decorators.js'

@customElement('app-page')
export class App extends LitElement {
  
  render() {
    return html`
      <top-page></top-page>

      <slot></slot>
    `;
  }
}