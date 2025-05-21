import {css, html, LitElement} from "lit";
import "../../../atoms/ik-input/ik-input";
import "../../../atoms/ik-button/ik-button";
import {_emit} from "../../../../utils/event";

class IkCheckFormPreCreation extends LitElement {
    static properties = {
        fontSizeTitle: { type: String },
        fontSizeText: { type: String },
        width: { type: String },
        checksType: { type: Array },
    }


    constructor() {
        super();
        this.fontSizeTitle = "50px";
        this.fontSizeText = "25px";
        this.width = "660px";
        this.checksType = ["HTTP"];
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
                    ${this.checksType.map((c) => html`
                        <ik-button
                            text=${c}
                            height="auto"
                            fontSize="${this.fontSizeText}"
                            @ik-button:click=${() => _emit(this, "ik-check-form-pre-creation:click",{type: c})}
                        ></ik-button>
                    `)}
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