import {css, html, LitElement} from "lit";
import "../../../atoms/ik-button/ik-button"
import "../../../atoms/ik-input/ik-input"

class IkOrganizationFormCreation extends LitElement {
    static properties = {
        fontSizeTitle: {type: String},
        fontSizeText: {type: String},
    };

    constructor() {
        super();
        this.fontSizeTitle = '50px'
        this.fontSizeText = '25px'
    }

    render() {
        return html`
            <div 
                    class="ik-organization-form-creation"
                    style="
                        --ofc-font-size-title: ${this.fontSizeTitle};
                        --ofc-font-size-text: ${this.fontSizeText};
                    "           
            >
                <span class="title">Create organization</span>
                <ik-input title="Organization name" placeholder="myOrganization" height="auto"></ik-input>
                <ik-button text="Create" height="auto"></ik-button>
            </div>
        `;
    }


    static styles = [
        css`
            .ik-organization-form-creation {
                display: flex;
                flex-direction: column;
                align-items: center;
                color: var(--text);
                font-family: Inter, sans-serif;
                gap: 2em;
            }
            
            .title {
                font-size: var(--ofc-font-size-title);
                font-family: Jura, sans-serif;
                font-weight: bold;
            }
        `
    ]
}

customElements.define('ik-organization-form-creation', IkOrganizationFormCreation);