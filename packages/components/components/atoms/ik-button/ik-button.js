import {css, html, LitElement} from "lit";

class IkButton extends LitElement {
    static properties = {
        text: { type: String },
        width: { type: String },
        height: { type: String },
        fontSize: { type: String },
        icon: { type: String },
        iconSize: { type: String },
        type: { type: String },
    };

    constructor() {
        super();
        this.text = 'Click me!';
        this.width = '220px';
        this.height = '84px';
        this.fontSize = '25px';
        this.icon = undefined;
        this.iconSize = '40px';
        this.type = 'full';
    }

    renderIcon(){
        if(this.icon !== undefined){
            return html`<img class="icon" src="${this.icon}" alt="button-icon">`
        }
    }

    render() {
        return html`
            <button class="ik-button ${this.type}" 
                    style="
                        --btn-width: ${this.width}; 
                        --btn-height: ${this.height};
                        --btn-font-size: ${this.fontSize};
                        --btn-icon-size: ${this.iconSize};
                    "
            >
                ${this.renderIcon()}
                ${this.text}
            </button>`;
    }


    static styles = [
        css`
            .ik-button {
                width: var(--btn-width);
                height: var(--btn-height);
                border-radius: 8px;
                font-size: var(--btn-font-size);
                padding: 0.5em 1em;
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: center;
                gap: 0.3em;
            }

            .ik-button.full {
                background-color: var(--btn-bg, #242424);
                color: var(--btn-text, #fff);
                border: none;
            }

            .ik-button.outlined {
                background-color: var(--bg, #242424);
                color: var(--text, #000);
                border: solid 2px var(--text, #000);
            }
            
            .ik-button.blue {
                background-color: var(--btn-blue-bg, #0B006B);
                color: var(--btn-text, #fff);
                border: none;
            }
            
            .ik-button.red {
                background-color: var(--btn-red-bg, #8E1919);
                color: var(--btn-text, #fff);
                border: none;
            }

            .ik-button:hover.full {
                background-color: var(--btn-hover-bg, #434343);
            }

            .ik-button:hover.outlined {
                background-color: var(--btn-outlined-hover-bg, #a8a8a8);
            }
            
            .ik-button:hover.blue {
                background-color: var(--btn-blue-hover-bg, #b6b6b6);
            }
            
            .ik-button:hover.red {
                background-color: var(--btn-red-hover-bg, #af1f1f);
            }
            
            .icon {
                width: var(--btn-icon-size);
                height: auto;
            }
        `
    ];
}

customElements.define('ik-button', IkButton);
