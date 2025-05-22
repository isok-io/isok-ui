import {css, html, LitElement} from "lit";
import "../../../atoms/ik-button/ik-button"
import "../ik-organization/ik-organization"
import {_emit} from "../../../../utils/event";

class IkOrganizationsList extends LitElement {
    static properties = {
        fontSizeTitle: {type: String},
        fontSizeOrgaTitle: {type: String},
        fontSizeOrgaTextTitle: {type: String},
        fontSizeOrgaTextContent: {type: String},
        iconSize: {type: String},
        buttonSize: {type: String},
        orgaWidth: {type: String},
        organizationsList: {type: Array},
    };

    constructor() {
        super();
        this.fontSizeTitle = '50px';
        this.fontSizeOrgaTitle = '40px';
        this.fontSizeOrgaTextTitle = '16px';
        this.fontSizeOrgaTextContent = '24px';
        this.iconSize = '32px';
        this.buttonSize = '40px';
        this.orgaWidth = '700px';
        this.organizationsList = [];
    }

    render() {
        return html`
            <div 
                    class="ik-organizations-list"
                    style="
                        --ofc-font-size-title: ${this.fontSizeTitle};
                    "           
            >
                <span class="title">My organizations</span>
                <div>
                    ${this.organizationsList.map(organization => 
                        html`
                            <ik-organization 
                                    nameOrga=${organization.name}
                                    nbMemberOrga=${organization.members.length}
                                    fontSizeTitle=${this.fontSizeOrgaTitle}
                                    fontSizeTextTitle=${this.fontSizeOrgaTextTitle}
                                    fontSizeTextContent=${this.fontSizeOrgaTextContent}
                                    iconSize=${this.iconSize}
                                    width=${this.orgaWidth}
                                    @ik-organization:click-settings=${() => _emit(this, 'ik-organization-list:click-settings',{organization: organization})}
                                    @ik-organization:click-leave=${() => _emit(this, 'ik-organization-list:click-leave',{organization: organization})}
                            ></ik-organization>
                        `
                    )}
                </div>
                <ik-button 
                        type="icon" 
                        icon="material-symbols:add-circle-outline-rounded" 
                        iconSize=${this.buttonSize} 
                        @ik-button:click=${() => _emit(this,"ik-organizations-list:click-add",{})}></ik-button>
            </div>
        `;
    }


    static styles = [
        css`
            .ik-organizations-list {
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

customElements.define('ik-organizations-list', IkOrganizationsList);