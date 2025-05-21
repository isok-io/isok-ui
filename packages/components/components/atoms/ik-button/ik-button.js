import {css, html, LitElement} from "lit";
import 'iconify-icon';
import {_emit} from "../../../utils/event";

class IkButton extends LitElement {
    static properties = {
        text: { type: String },
        width: { type: String },
        height: { type: String },
        fontSize: { type: String },
        img: { type: String },
        icon: { type: String },
        iconSize: { type: String },
        iconColor: { type: String },
        iconColorHover: { type: String },
        type: { type: String },
        align: { type: String },
    };

    constructor() {
        super();
        this.text = undefined;
        this.width = '220px';
        this.height = '84px';
        this.fontSize = '25px';
        this.img = undefined;
        this.icon = undefined;
        this.iconSize = '40px';
        this.iconColor = 'var(--text)';
        this.iconColorHover = 'var(--text-hover)';
        this.type = 'full';
        this.align = 'center'
    }

    renderImg(){
        if(this.img){
            return html`<img class="icon" src="${this.img}" alt="button-image">`
        }
    }

    renderIcon() {
        if(this.icon){
            return html `
                <iconify-icon
                        class="icon"
                        icon="${this.icon}"
                </iconify-icon>
            `
        }
    }

    renderText() {
        if(this.text){
            return this.text
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
                        --btn-align: ${this.align};
                        --btn-icon-color: ${this.iconColor};
                        --btn-icon-color-hover: ${this.iconColorHover};
                    "
                    @click=${() => _emit(this, "ik-button:click", {})}
            >
                ${this.renderIcon()}
                ${this.renderImg()}
                ${this.renderText()}
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
                justify-content: var(--btn-align);
                gap: 0.3em;
                cursor: pointer;
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
            
            .ik-button.icon {
                background-color: transparent;
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
                font-size: var(--btn-icon-size);
                width: var(--btn-icon-size);
                height: auto;
                color: var(--btn-icon-color, #fff);;
            }
            
            .icon:hover {
                color: var(--btn-icon-color-hover, #232323);
            }
        `
    ];
}

customElements.define('ik-button', IkButton);
