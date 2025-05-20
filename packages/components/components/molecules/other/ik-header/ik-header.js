import {css, html, LitElement} from "lit";
import "../../../atoms/ik-input/ik-input";
import "../../../atoms/ik-button/ik-button";

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
        this.width = "100vh";
    }

    render() {
        return html`
            <div class="ik-header"
                style="
                    --hdr-font-size-title: ${this.fontSizeTitle};
                    --hdr-width: ${this.width};
                "
            >
                <span class="title">IsOk</span>
                <div class="menu">
                    ${ this.connected ? html`
                        <ik-input 
                            type="select"
                            fontSize=${this.fontSizeSelect}
                            .selectOptions=${this.optionsSelect}
                            height="auto"
                            width=${this.widthSelect}
                        ></ik-input>
                    ` : html``}
                    <ik-button 
                        width='auto'
                        height='auto'
                        icon=${this.iconTheme}
                        iconSize=${this.iconSize}
                        type='icon'
                    ></ik-button>
                    ${ this.connected ? html`
                        <ik-button
                            width='auto'
                            height='auto'
                            icon="material-symbols:account-circle"
                            iconSize=${this.iconSize}
                            type='icon'
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