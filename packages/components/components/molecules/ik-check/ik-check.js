import {css, html, LitElement} from "lit";
import "../../atoms/ik-title/ik-title"
import "../../atoms/ik-diagram-bar/ik-diagram-bar"
import "../../atoms/ik-button/ik-button"

class IkCheck extends LitElement {
    static properties = {
        type: {type: String},
        fontSizeTitle: {type: String},
        fontSizeValue: {type: String},
        nameCheck: {type: String},
        typeCheck: {type: String},
        domainCheck: {type: String},
        uptimeCheck: {type: String},
        responseTimeCheck: {type: String},
        barsCheck: {type: Array},
        width: {type: String},
    }


    constructor() {
        super();
        this.type = 'checkWithType';
        this.fontSizeTitle = "16px";
        this.fontSizeValue = "24px";
        this.nameCheck = undefined;
        this.typeCheck = undefined;
        this.domainCheck = undefined;
        this.uptimeCheck = undefined;
        this.responseTimeCheck = undefined;
        this.barsCheck = [];
        this.width = "800px";
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
            <div class="ik-check" style="--ck-width:${this.width}">
                ${ this.renderTitle("NAME", this.nameCheck) }
                ${ this.type === "checkWithType" ? this.renderTitle("TYPE", this.typeCheck) : "" }
                ${ this.type === "checkWithDomain" ? this.renderTitle("DOMAIN", this.domainCheck) : "" }
                ${ this.renderTitle("UPTIME", this.uptimeCheck) }
                ${ this.renderTitle("RESPONSE TIME", this.responseTimeCheck) }
                <ik-diagram-bar 
                        .bars=${this.barsCheck}
                ></ik-diagram-bar>
                <ik-button
                        width='auto'
                        height='auto'
                        icon="material-symbols:info-outline-rounded"
                        type='icon'
                ></ik-button>
            </div>
        `;
    }


    static styles = [
        css`

            .ik-check {
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                align-items: center;
                width: var(--ck-width);
            }
        `
    ];
}

customElements.define('ik-check', IkCheck);