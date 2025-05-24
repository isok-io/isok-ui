import {css, html, LitElement} from "lit";
import "../../../atoms/ik-input/ik-input";
import "../../../atoms/ik-button/ik-button";
import {_emit} from "../../../../utils/event";

class IkCheckFormPostCreation extends LitElement {
    static properties = {
        typeCheck: { type: String },
        fontSizeTitle: { type: String },
        fontSizeText: { type: String },
        width: { type: String },
        errorMessage: { type: String },
        zoneOptions: { type: Array },
    }


    constructor() {
        super();
        this.typeCheck = undefined;
        this.fontSizeTitle = "50px";
        this.fontSizeText = "25px";
        this.width = "660px";
        this.data = {
            name : null,
            zones : ["all"],
            interval: null
        }
        this.errorMessage = null;
        this.zoneOptions = [];
    }

    render() {
        this.zoneOptions.push({value: 'all', label: 'All'});
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
                        .value=${this.data.name}
                        .width=${this.width}
                        fontSize=${this.fontSizeText}
                        @ik-input:change=${(e) => this.data.name = e.detail.value}
                    ></ik-input>
                    <ik-input
                        title="Zone"
                        type="multiselect"
                        .values=${this.data.zones}
                        .selectOptions= ${this.zoneOptions}
                        heigth="auto"
                        width="auto"
                        fontSize=${this.fontSizeText}
                        @ik-input:change=${(e) => this.data.zones = e.detail.values}
                    ></ik-input>
                    <ik-input
                        title="Interval"
                        placeholder="10min"
                        height="auto"
                        .value=${this.data.interval}
                        .width=${this.width}
                        fontSize=${this.fontSizeText}
                        @ik-input:change=${(e) => {this.data.interval = e.detail.value}}
                    ></ik-input>
                </div>
                <div class="error-message">${this.errorMessage}</div>
                <ik-button
                    text="Create"
                    height="auto"
                    @ik-button:click=${() => _emit(this, "ik-check-form-post-creation:click-create", this.data)}
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
            .error-message {
                color: var(--text-red);
                font-family: Inter, sans-serif;
            }
        `
    ];
}

customElements.define('ik-check-form-post-creation', IkCheckFormPostCreation);