import {css, html, LitElement} from "lit";
import "../../../atoms/ik-input/ik-input";
import "../../../atoms/ik-button/ik-button";
import {_emit} from "../../../../utils/event";

class IkHeader extends LitElement {
    static properties = {
        fontSizeTitle: { type: String },
        fontSizeSelect: { type: String },
        widthSelect: { type: String },
        optionsSelect: { type: Array },
        iconTheme: { type: String },
        iconSize: { type: String },
        connected: { type: Boolean },
        width: { type: String },
        valueSelect: { type: String },
    }


    constructor() {
        super();
        this.fontSizeTitle = "4em";
        this.fontSizeSelect = "2em";
        this.widthSelect = "15em";
        this.optionsSelect = [];
        this.iconTheme = 'material-symbols:light-mode-outline-rounded';
        this.iconSize = "18px";
        this.connected = true;
        this.width = "100vw";
        this.valueSelect = undefined
    }

    render() {
        return html`
            <div class="ik-header"
                style="
                    --hdr-font-size-title: ${this.fontSizeTitle};
                    --hdr-width: ${this.width};
                "
            >
                <span class="title" @click=${() => _emit(this,"ik-header:click-title")}>IsOk</span>
                <div class="menu">
                    ${ this.connected ? html`
                        <ik-input
                            class="select"
                            type="select"
                            fontSize=${this.fontSizeSelect}
                            .selectOptions=${this.optionsSelect}
                            height="auto"
                            width=${this.widthSelect}
                            .value=${this.valueSelect}
                            @ik-input:change=${(e) => _emit(this, "ik-header:change-organization", e.detail)}
                        ></ik-input>
                    ` : html``}
                    <ik-button 
                        width='auto'
                        height='auto'
                        icon=${this.iconTheme}
                        iconSize=${this.iconSize}
                        type='icon'
                        @ik-button:click=${() => _emit(this, "ik-header:click-theme", {})}
                    ></ik-button>
                    ${ this.connected ? html`
                        <ik-button
                            width='auto'
                            height='auto'
                            icon="material-symbols:account-circle"
                            iconSize=${this.iconSize}
                            type='icon'
                            @ik-button:click=${() => _emit(this, "ik-header:click-account", {})}
                        ></ik-button>
                    ` : html``}
                </div>
            </div>
        `;
    }


    static styles = [
        css`
            .ik-header {
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                width: var(--hdr-width);
                cursor: pointer;
            }
            
            .ik-header .title {
                font-family: Jura, sans-serif;
                font-size: var(--hdr-font-size-title);
                color: var(--text);
            }
            
            .ik-header .menu {
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: right;
                gap: 1em;
                width: 50%;
            }
        `
    ];
}

customElements.define('ik-header', IkHeader);