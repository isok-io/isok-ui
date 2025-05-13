import {css, html, LitElement} from "lit";

class IkButton extends LitElement {
    static properties = {
        text: { type: String },
    };

    constructor() {
        super();
        this.text = 'Click me!';
    }

    render() {
        return html`<button class="ik-button">${this.text}</button>`;
    }

    static styles = [
        css`
            .ik-button {
                background-color: var(--btn-bg, #242424);
                color: var(--btn-text, #fff);
                width: 220px;
                height: 84px;
                border-radius: 8px;
                font-size: 25px;
            }
        `
    ];
}

customElements.define('ik-button', IkButton);
