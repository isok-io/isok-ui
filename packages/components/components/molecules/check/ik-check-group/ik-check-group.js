import {css, html, LitElement} from "lit";
import "../../../atoms/ik-title/ik-title"
import "../../../atoms/ik-diagram-bar/ik-diagram-bar"
import "../../../atoms/ik-button/ik-button"

class IkCheckGroup extends LitElement {
    static properties = {
        type: {type: String},
        fontSizeTitle: {type: String},
        fontSizeValue: {type: String},
        typeCheck: {type: String},
        domainCheck: {type: String},
        uptimeCheck: {type: String},
        responseTimeCheck: {type: String},
        barsCheck: {type: Array},
        width: {type: String},
    }


    constructor() {
        super();
        this.type = 'groupByDomain';
        this.fontSizeTitle = "16px";
        this.fontSizeValue = "24px";
        this.typeCheck = undefined;
        this.domainCheck = undefined;
        this.uptimeCheck = undefined;
        this.responseTimeCheck = undefined;
        this.barsCheck = [];
        this.width = "800px";

        this.toggleOpen = false;
    }

    openToggle() {
        this.toggleOpen = !this.toggleOpen;
        this.requestUpdate();
    }

    renderTitle(title, subtitle) {
        return html`
            <ik-title 
                title=${title} 
                subtitle=${subtitle} 
                fontSizeTitle=${this.fontSizeTitle} 
                fontSizeSubtitle=${this.fontSizeValue}
            ></ik-title>
        `;
    }



    render() {
        return html`
            <div class="ik-check-group" style="--ck-width:${this.width}">
                <div class="ik-check-group-header">
                    ${ this.type === "groupByType" ? this.renderTitle("TYPE", this.typeCheck) : "" }
                    ${ this.type === "groupByDomain" ? this.renderTitle("DOMAIN", this.domainCheck) : "" }
                    ${ this.renderTitle("UPTIME", this.uptimeCheck) }
                    ${ this.renderTitle("RESPONSE TIME", this.responseTimeCheck) }
                    <ik-diagram-bar 
                            .bars=${this.barsCheck}
                    ></ik-diagram-bar>
                    <ik-button
                            width='auto'
                            height='auto'
                            icon=${this.toggleOpen ? "material-symbols:keyboard-arrow-up-rounded" :"material-symbols:keyboard-arrow-down-rounded"}
                            type='icon'
                            @click=${this.openToggle}
                    ></ik-button>
                </div>
                <div class="checks">
                    ${this.toggleOpen ? html`<slot name="check"></slot>` : html``}
                </div>
            </div>
        `;
    }


    static styles = [
        css`
            .ik-check-group {
                display: flex;
                flex-direction: column;
                align-items: center;
            }
            
            .ik-check-group-header {
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                align-items: center;
                width: var(--ck-width);
            }
            
            .checks {
                margin-left: 0.5em;
                border-left: 2px solid var(--border);
                padding-left: 0.5em;
            }
        `
    ];
}

customElements.define('ik-check-group', IkCheckGroup);