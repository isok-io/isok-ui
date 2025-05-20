import {css, html, LitElement} from "lit";
import "../../../atoms/ik-input/ik-input";
import "../../../atoms/ik-button/ik-button";

class IkCheckFormPostCreation extends LitElement {
    static properties = {
        typeCheck: { type: String },
        fontSizeTitle: { type: String },
        fontSizeText: { type: String },
        width: { type: String },
    }


    constructor() {
        super();
        this.typeCheck = undefined;
        this.fontSizeTitle = "50px";
        this.fontSizeText = "25px";
        this.width = "660px";
    }

    render() {
        return html`
            <div class="ik-check-form-post-creation"
                style="
                    --cfpc-font-size-title: ${this.fontSizeTitle};
                    --cfpc-width: ${this.width};
                "
            >
                <span class="title">New check - ${this.typeCheck}</span>
                
                <div class="form">
                    <ik-input 
                        title="Name"
                        placeholder="My new check"
                        height="auto"
                        .width=${this.width}
                        fontSize=${this.fontSizeText}
                    ></ik-input>
                    <ik-input
                        title="Zone"
                        type="select"
                        .selectOptions = ${[
                            { value: 'all', label: 'All' },
                            { value: 'fr', label: 'France' },
                        ]}
                        heigth="auto"
                        width="auto"
                        fontSize=${this.fontSizeText}
                    ></ik-input>
                    <ik-input
                        title="Interval"
                        placeholder="10min"
                        height="auto"
                        .width=${this.width}
                        fontSize=${this.fontSizeText}
                    ></ik-input>
                </div>
                <ik-button
                    text="Create"
                    height="auto"
                ></ik-button>
            </div>
        `;
    }


    static styles = [
        css`
            .ik-check-form-post-creation {
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

customElements.define('ik-check-form-post-creation', IkCheckFormPostCreation);