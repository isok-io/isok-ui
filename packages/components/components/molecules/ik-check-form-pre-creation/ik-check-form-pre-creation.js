import {css, html, LitElement} from "lit";
import "../../atoms/ik-input/ik-input";
import "../../atoms/ik-button/ik-button";

class IkCheckFormPreCreation extends LitElement {
    static properties = {
        fontSizeTitle: { type: String },
        fontSizeText: { type: String },
        width: { type: String },
    }


    constructor() {
        super();
        this.fontSizeTitle = "50px";
        this.fontSizeText = "25px";
        this.width = "660px";
    }

    render() {
        return html`
            <div class="ik-check-form-creation"
                style="
                    --cfpc-font-size-title: ${this.fontSizeTitle};
                    --cfpc-width: ${this.width};
                "
            >
                <span class="title">New check</span>
                
                <div class="form">
                    <ik-button
                            text="HTTP"
                            height="auto"
                            fontSize="${this.fontSizeText}"
                    ></ik-button>
                    <ik-button
                            text="PING"
                            height="auto"
                            fontSize="${this.fontSizeText}"
                    ></ik-button>
                    <ik-button
                            text="SSL"
                            height="auto"
                            fontSize="${this.fontSizeText}"
                    ></ik-button>
                    <ik-button
                            text="TCP"
                            height="auto"
                            fontSize="${this.fontSizeText}"
                    ></ik-button>
                    <ik-button
                            text="UDP"
                            height="auto"
                            fontSize="${this.fontSizeText}"
                    ></ik-button>
                </div>
            </div>
        `;
    }


    static styles = [
        css`
            .ik-check-form-creation {
                display: flex;
                flex-direction: column;
                width: var(--cfpc-width);
                color: var(--text);
                align-items: center;
                gap: 2em;
            }
            
            .title {
                font-size: var(--cfpc-font-size-title);
                font-family: Jura, sans-serif;
            }
            
            .form {
                display: flex;
                flex-direction: column;
                gap: 1em;
            }
        `
    ];
}

customElements.define('ik-check-form-pre-creation', IkCheckFormPreCreation);