import {css, html, LitElement} from "lit";
import "../../../atoms/ik-button/ik-button"
import "../../../atoms/ik-title/ik-title"
import "../../../atoms/ik-input/ik-input"
import {_emit} from "../../../../utils/event";
class IkUserAccount extends LitElement {
    static properties = {
        fontSizeTitle: {type: String},
        fontSizeText: {type: String},
        fontSizeSmallText: {type: String},
        modalInputWidth: {type: String},
        showPasswordModal: {type: Boolean},
        email: {type: String},
        width: {type: String},
        errorMessage: {type: String},
    };

    constructor() {
        super();
        this.fontSizeTitle = '50px';
        this.fontSizeText = '25px';
        this.fontSizeSmallText = '18px';
        this.modalInputWidth = '20em'
        this.showPasswordModal = false;
        this.email = 'name@gmail.com';
        this.oldPassword = '';
        this.newPassword = '';
        this.width = '20em';
        this.errorMessage = '';
    }

    togglePasswordModal() {
        this.errorMessage = '';
        this.showPasswordModal = !this.showPasswordModal;
        _emit(this, "ik-user-account:click-modal",{});
    }

    renderPasswordModal() {
        if (!this.showPasswordModal) return null;

        return html`
            <div class="modal-backdrop" @click=${this.togglePasswordModal}></div>
            <div class="modal">
                <span class="modal-title">Change password</span>
                <ik-input inputType="password" 
                          .value=${this.oldPassword}
                          @ik-input:change=${(e) => this.oldPassword = e.detail.value}
                          placeholder="Old password" 
                          fontSize=${this.fontSizeText} 
                          height="auto" 
                          width=${this.modalInputWidth}
                          info="The password need 6–128 characters, with at least one uppercase letter, one lowercase letter, one number, and one special character"
                ></ik-input>
                <ik-input inputType="password" 
                          .value=${this.newPassword}
                          @ik-input:change=${(e) => this.newPassword = e.detail.value}
                          placeholder="New password" 
                          fontSize=${this.fontSizeText} 
                          height="auto" 
                          width=${this.modalInputWidth}
                          info="The password need 6–128 characters, with at least one uppercase letter, one lowercase letter, one number, and one special character"
                ></ik-input>
                <div class="error-message">${this.errorMessage}</div>
                <div class="modal-actions">
                    <ik-button text="Cancel" @ik-button:click=${this.togglePasswordModal} fontSize=${this.fontSizeSmallText} width="auto" height="auto"></ik-button>
                    <ik-button text="Confirm" type="blue" fontSize=${this.fontSizeSmallText} width="auto" height="auto" @ik-button:click=${() => _emit(this,'ik-user-account:click-confirm',{oldPassword: this.oldPassword ,newPassword: this.newPassword })}></ik-button>
                </div>
            </div>
        `;
    }

    render() {
        return html`
            <div class="ik-user-account" style="--uac-font-size-title: ${this.fontSizeTitle}; --uac-font-size-text: ${this.fontSizeText}; --uac-width: ${this.width}">
                <span class="title">My account</span>
                <div class="user-card">
                    <ik-title title="Email" subtitle=${this.email} fontSizeTitle=${this.fontSizeText} fontSizeText=${this.fontSizeText}></ik-title>
                    <div class="password">
                        <ik-title title="Password" subtitle="********" fontSizeTitle=${this.fontSizeText} fontSizeText=${this.fontSizeText}></ik-title>
                        <ik-button text="Modifier" width="auto" height="auto" fontSize=${this.fontSizeSmallText} @click=${this.togglePasswordModal}></ik-button>
                    </div>
                    <ik-button class="delete-button" text="Delete account" type="red" width="auto" height="auto" fontSize=${this.fontSizeSmallText} @ik-button:click=${() => _emit(this, "ik-user-account:click-delete",{})}></ik-button>
                </div>
                <ik-button type="blue" text="Manage my organizations" width="auto" height="auto" fontSize=${this.fontSizeText} @ik-button:click=${() => _emit(this, "ik-user-account:click-organizations",{})}></ik-button>
                <ik-button type="red" text="Log out" height="auto" fontSize=${this.fontSizeText} @ik-button:click=${() => _emit(this, "ik-user-account:click-logout",{})}></ik-button>

                ${this.renderPasswordModal()}
            </div>
        `;
    }

    static styles = [
        css`
            .ik-user-account {
                display: flex;
                flex-direction: column;
                align-items: center;
                color: var(--text);
                font-family: Inter, sans-serif;
                gap: 2em;
            }

            .title {
                font-size: var(--uac-font-size-title);
                font-family: Jura, sans-serif;
                font-weight: bold;
            }

            .user-card {
                background-color: var(--ipt-bg);
                padding: 1em;
                border: solid 1px var(--border);
                border-radius: 5px;
                display: flex;
                flex-direction: column;
                gap: 2em;
                width: var(--uac-width);
            }

            .password {
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: space-between;
                gap: 1em;
            }

            .delete-button {
                margin: 0 auto;
            }

            .modal-backdrop {
                position: fixed;
                top: 0; left: 0;
                width: 100vw;
                height: 100vh;
                background: rgba(0, 0, 0, 0.5);
                z-index: 1000;
            }

            .modal {
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: var(--bg);
                padding: 2em;
                border-radius: 8px;
                display: flex;
                flex-direction: column;
                gap: 1em;
                z-index: 1001;
                box-shadow: 0 4px 12px rgba(0,0,0,0.2);
            }

            .modal .modal-title {
                margin: 0;
                font-size: var(--uac-font-size-text);
                font-weight: bold;
            }

            .modal-actions {
                display: flex;
                justify-content: flex-end;
                gap: 1em;
                margin-top: 1em;
            }
            
            .error-message {
                color: var(--text-red);
            }
        `
    ]
}

customElements.define('ik-user-account', IkUserAccount);
