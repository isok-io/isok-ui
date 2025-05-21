import {css, html, LitElement} from "lit";
import "../../../atoms/ik-button/ik-button"
import "../../../atoms/ik-input/ik-input"
import {_emit} from "../../../../utils/event";

class IkOrganizationFormUpdate extends LitElement {
    static properties = {
        fontSizeTitle: {type: String},
        fontSizeText: {type: String},
        nameOrga: {type: String},
        membersOrga: {type: Array},
    };

    constructor() {
        super();
        this.fontSizeTitle = '50px'
        this.fontSizeText = '25px'
        this.nameOrga = ''
        this.membersOrga = []
    }

    render() {
        return html`
            <div 
                    class="ik-organization-form-update"
                    style="
                        --ofu-font-size-title: ${this.fontSizeTitle};
                        --ofu-font-size-text: ${this.fontSizeText};
                    "           
            >
                <span class="title">Manage organization</span>
                <ik-input 
                        title="Organization name"
                        height="auto" 
                        .value=${this.nameOrga}
                        @ik-input:change=${(e) => this.nameOrga = e.detail.value}
                ></ik-input>
                <ik-input 
                        title="Members" 
                        placeholder="new-member@gmail.com" 
                        type='list' 
                        .values=${this.membersOrga}
                        @ik-input:change=${(e) => this.membersOrga = e.detail.values}
                ></ik-input>
                <ik-button 
                        text="Save" 
                        height="auto"
                        @ik-button:click=${() => _emit(this, "ik-organization-form-update:click-save", {name: this.nameOrga, members: this.membersOrga})}
                ></ik-button>
                <ik-button 
                        text="Delete organization" 
                        height="auto" 
                        width="auto" 
                        type="red"
                        @ik-button:click=${() => _emit(this, "ik-organization-form-update:click-delete", {})}
                ></ik-button>
            </div>
        `;
    }


    static styles = [
        css`
            .ik-organization-form-update {
                display: flex;
                flex-direction: column;
                align-items: center;
                color: var(--text);
                font-family: Inter, sans-serif;
                gap: 2em;
            }
            
            .title {
                font-size: var(--ofu-font-size-title);
                font-family: Jura, sans-serif;
                font-weight: bold;
            }
        `
    ]
}

customElements.define('ik-organization-form-update', IkOrganizationFormUpdate);