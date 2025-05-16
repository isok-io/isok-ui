import {css, html, LitElement} from "lit";
import "../../atoms/ik-title/ik-title"
import "../../atoms/ik-button/ik-button"

class IkOrganisation extends LitElement {
    static properties = {
        nameOrga: {type: String},
        nbMemberOrga: {type: Number},
        fontSizeTitle: {type: String},
        fontSizeTextTitle: {type: String},
        fontSizeTextContent: {type: String},
        iconSize: {type: String},
        width: {type: String},
    };

    constructor() {
        super();
        this.nameOrga = undefined;
        this.nbMemberOrga = 1;
        this.fontSizeTitle = "48px";
        this.fontSizeTextTitle = "16px";
        this.fontSizeTextContent = "24px";
        this.iconSize = "32px";
        this.width = "700px";
    }

    render() {
        return html`
            <div 
                    class="ik-organisation"
                    style="
                        --ogn-font-size-title: ${this.fontSizeTitle};
                        --ogn-width: ${this.width};
                    "
            >
                <span class="title">${this.nameOrga ?? "Unnamed organisation"}</span>
                <ik-title title="MEMBERS" 
                          subtitle="${this.nbMemberOrga} people" 
                          .fontSizeTitle=${this.fontSizeTextTitle} 
                          .fontSizeSubtitle=${this.fontSizeTextContent} 
                ></ik-title>
                <div class="icons">
                    <ik-button type="icon" 
                               icon="material-symbols:settings-rounded"
                               iconSize=${this.iconSize}
                    ></ik-button>
                    <ik-button type="icon"
                               icon="material-symbols:logout-rounded"
                               iconSize=${this.iconSize}
                    ></ik-button>
                </div>
            </div>
        `;
    }


    static styles = [
        css`
            .ik-organisation {
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                width: var(--ogn-width);
            }
            
            .title {
                font-size: var(--ogn-font-size-title);
                font-family: Inter, sans-serif;
                color: var(--text);
                margin-inline: 0.5em;
            }
            
            .icons {
                display: flex;
                flex-direction: row;
            }
        `
    ]
}

customElements.define('ik-organisation', IkOrganisation);