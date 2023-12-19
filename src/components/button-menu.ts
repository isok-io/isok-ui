import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

@customElement('button-menu')
export class ButtonMenu extends LitElement {

    @property()
    text?: string;

    @property()
    link?: string;

    render() {
        return html`<a href=${this.link}>${this.text}</a>`;
    }

    static styles = css`

    a {
      width: 100%;
      background: white;
      border-radius: 8px;
      padding: 0.6em 1.2em;
      font-size: 1em;
      font-weight: 500;
      font-family: inherit;
      cursor: pointer;
      transition: background-color 0.25s;
      border: 0;
      text-align: center;
      text-decoration: none;
      color: black;
    }
    a:hover {
      background-color: #d5d5d5;
    }
    a:focus,
    a:focus-visible {
      outline: 4px auto -webkit-focus-ring-color;
    }
    `

}





declare global {
    interface HTMLElementTagNameMap {
      'button-menu': ButtonMenu
    }
  }