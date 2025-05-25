import {css, html, LitElement} from "lit";
import "../../../atoms/ik-button/ik-button"
import "../../../atoms/ik-input/ik-input"
import ccLogo from '../../../../assets/logo/cc-logo.png';
import githubWhiteLogo from '../../../../assets/logo/github-white-logo.png';
import githubBlackLogo from '../../../../assets/logo/github-logo.png';
import googleLogo from '../../../../assets/logo/google-logo.png';
import {_emit} from "../../../../utils/event";

class IkAuth extends LitElement {
    static properties = {
        type: {type: String},
        theme: {type: String},
        fontSizeTitle: {type: String},
        fontSizeText: {type: String},
        buttonWidth: {type: String},
        buttonHeight: {type: String},
        align: {type: String},
        methods: {type: Array},
        errorMessage: {type: String},
    };

    constructor() {
        super();
        this.type = 'login-menu';
        this.theme = 'light';
        this.fontSizeTitle = '80px'
        this.fontSizeText = '25px'
        this.buttonWidth = '16em'
        this.buttonHeight = '2.8em'
        this.align = 'center'
        this.methods = ['ep','cc', 'gh','g']
        this.data = {
            email: '',
            password: '',
        }
        this.errorMessage = '';
    }

    renderButtons(prefix) {
        return html`
            <div class="buttons">
                ${this.methods.includes('ep') ? html`<ik-button class="button"
                           text="${prefix} with Email / Password"
                           width=${this.buttonWidth}
                           height=${this.buttonHeight}
                           fontSize=${this.fontSizeText}
                           align=${this.align}
                           @ik-button:click="${() => _emit(this, 'ik-auth:click',{type: this.type, method: 'ep'})}"
                ></ik-button>`: ``}
                ${this.methods.includes('cc') ? html`<ik-button class="button"
                           text="${prefix} with Clever Cloud"
                           img=${ccLogo}
                           iconSize='40px'
                           width=${this.buttonWidth}
                           height=${this.buttonHeight}
                           fontSize=${this.fontSizeText}
                           align=${this.align}
                           @ik-button:click="${() => _emit(this, 'ik-auth:click',{type: this.type, method: 'cc'})}"
                ></ik-button>`:``}
                ${this.methods.includes('gh') ? html`<ik-button class="button"
                           text="${prefix} with GitHub"
                           img=${this.theme === 'light' ? githubWhiteLogo : githubBlackLogo}
                           iconSize='40px'
                           width=${this.buttonWidth}
                           height=${this.buttonHeight}
                           fontSize=${this.fontSizeText}
                           align=${this.align}
                           @ik-button:click="${() => _emit(this, 'ik-auth:click',{type: this.type, method: 'gh'})}"
                ></ik-button>`:``}
                ${this.methods.includes('g') ? html`<ik-button class="button"
                           text="${prefix} with Google"
                           img=${googleLogo}
                           iconSize='40px'
                           width=${this.buttonWidth}
                           height=${this.buttonHeight}
                           fontSize=${this.fontSizeText}
                           align=${this.align}
                           @ik-button:click="${() => _emit(this, 'ik-auth:click',{type: this.type, method: 'g'})}"
                ></ik-button>`:``}
            </div>
        `
    }

    renderForm(text){
        return html`
            <div class="form">
                <ik-input 
                    placeholder="Email"
                    title="Email"
                    height="auto"
                    fontSize=${this.fontSizeText}
                    .value=${this.data.email}
                    @ik-input:change=${(e) => this.data.email = e.detail.value}
                ></ik-input>
                <ik-input
                    placeholder="Password"
                    title="Password"
                    height="auto"
                    fontSize=${this.fontSizeText}
                    inputType="password"
                    .value=${this.data.password}
                    info="The password need 6–128 characters."
                    @ik-input:change=${(e) => this.data.password = e.detail.value}
                ></ik-input>
                <div class="error-message">${this.errorMessage}</div>
                <div class="buttons-form">
                    <ik-button
                        class="validate-btn"
                        text=${text}
                        width="auto"
                        height="auto"
                        fontSize=${this.fontSizeText}
                        @ik-button:click=${() => _emit(this, 'ik-auth:click-validate',{data: this.data})}
                    ></ik-button>
                    <ik-button
                        class="back-btn"
                        text="Back"
                        width="auto"
                        height="auto"
                        type="outlined"
                        fontSize=${this.fontSizeText}
                        @ik-button:click=${() => _emit(this, 'ik-auth:click-back',{})}
                    ></ik-button>
                </div>
            </div>
        `
    }


    renderLogin(){
        if(this.type === 'login-menu' || this.type === 'login-form'){
            return html`
                <span class="title">Log In</span>
                <div class="text">
                    <span>New to IsOk ?</span>
                    <a class="link" @click=${() => _emit(this, 'ik-auth:click-signup',{})}>Join now</a>
                </div>
                ${ this.type === 'login-menu' 
                    ? this.renderButtons("Log in")
                    : this.renderForm("Log in")
                }
            `
        }
    }

    renderSignup(){
        if(this.type === 'signup-menu' || this.type === 'signup-form'){
            return html`
                <span class="title">Sign up</span>
                <div class="text">
                    <span>You have an account ?</span>
                    <a class="link" @click=${() => _emit(this, 'ik-auth:click-login',{})}>Log In</a>
                </div>
                ${this.type === 'signup-menu'
                    ? this.renderButtons("Sign up")
                    : this.renderForm("Sign up")
                }
            `
        }
    }


    render() {
        return html`
            <div 
                    class="ik-auth ${this.type}"
                    style="
                        --auth-font-size-title: ${this.fontSizeTitle};
                        --auth-font-size-text: ${this.fontSizeText};
                    "           
            >
                ${this.renderLogin()}
                ${this.renderSignup()}
            </div>
        `;
    }


    static styles = [
        css`
            .ik-auth {
                display: flex;
                flex-direction: column;
                align-items: center;
                color: var(--text);
                font-family: Inter, sans-serif;
                gap: 1em;
            }
            
            .title {
                font-family: Jura, sans-serif;
                font-size: var(--auth-font-size-title);
                font-weight: bold;
            }
            
            .text {
                font-size: var(--auth-font-size-text);
            }
            
            .link {
                color: var(--text-blue);
                cursor: pointer;
            }
            
            .buttons {
                margin: 0.8em;
                display: flex;
                flex-direction: column;
                gap: 1em;
            }
            
            .form {
                display: flex;
                flex-direction: column;
                gap: 1em;
            }

            .buttons-form {
                display: grid;
                grid-template-columns: 1fr auto 1fr;
                align-items: center;
            }

            .validate-btn {
                grid-column: 2; 
                justify-self: center;
            }

            .back-btn {
                grid-column: 3;
                justify-self: end;
            }
            
            .error-message {
                color: var(--text-red);
                width: 50%;
                min-height: 2.8em; /* ou 2 lignes de texte, ajustable */
                display: block;
                line-height: 1.4em;
            }
        `
    ]
}

customElements.define('ik-auth', IkAuth);