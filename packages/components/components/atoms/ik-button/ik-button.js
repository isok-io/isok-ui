import {LitElement, html, css} from 'lit';

class IkButton extends LitElement {
    static properties = {
        text: { type: String }
    };

    constructor() {
        super();
        this.text = 'Click me!';
    }

    render() {
        return html`<button>${this.text}</button>`;
    }

    static styles = css`
        button {
            background-color: #242424;
            width: 220px;
            height: 84px;
            border-radius: 8px;
            color: white;
            font-size: 25px;
        }
    `;
}

customElements.define('ik-button', IkButton);
