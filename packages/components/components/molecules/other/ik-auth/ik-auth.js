import {css, html, LitElement} from "lit";
import "../../../atoms/ik-button/ik-button"
import "../../../atoms/ik-input/ik-input"
import ccLogo from '../../../../assets/logo/cc-logo.png';
import githubWhiteLogo from '../../../../assets/logo/github-white-logo.png';
import githubBlackLogo from '../../../../assets/logo/github-logo.png';
import googleLogo from '../../../../assets/logo/google-logo.png';

class IkAuth extends LitElement {
    static properties = {
        type: {type: String},
        theme: {type: String},
        fontSizeTitle: {type: String},
        fontSizeText: {type: String},
        buttonWidth: {type: String},
        buttonHeight: {type: String},
        align: {type: String},
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
    }

    renderButtons(prefix) {
        return html`
            <div class="buttons">
                <ik-button class="button"
                           text="${prefix} with Email / Password"
                           width=${this.buttonWidth}
                           height=${this.buttonHeight}
                           fontSize=${this.fontSizeText}
                           align=${this.align}
                ></ik-button>
                <ik-button class="button"
                           text="${prefix} with Clever Cloud"
                           img=${ccLogo}
                           iconSize='40px'
                           width=${this.buttonWidth}
                           height=${this.buttonHeight}
                           fontSize=${this.fontSizeText}
                           align=${this.align}
                ></ik-button>
                <ik-button class="button"
                           text="${prefix} with GitHub"
                           img=${this.theme === 'light' ? githubWhiteLogo : githubBlackLogo}
                           iconSize='40px'
                           width=${this.buttonWidth}
                           height=${this.buttonHeight}
                           fontSize=${this.fontSizeText}
                           align=${this.align}
                ></ik-button>
                <ik-button class="button"
                           text="${prefix} with Google"
                           img=${googleLogo}
                           iconSize='40px'
                           width=${this.buttonWidth}
                           height=${this.buttonHeight}
                           fontSize=${this.fontSizeText}
                           align=${this.align}
                ></ik-button>
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
                ></ik-input>
                <ik-input
                    placeholder="Password"
                    title="Password"
                    height="auto"
                    fontSize=${this.fontSizeText}
                    inputType="password"
                ></ik-input>
                <div class="buttons-form">
                    <ik-button
                        class="validate-btn"
                        text=${text}
                        width="auto"
                        height="auto"
                        fontSize=${this.fontSizeText}
                    ></ik-button>
                    <ik-button
                        class="back-btn"
                        text="Back"
                        width="auto"
                        height="auto"
                        type="outlined"
                        fontSize=${this.fontSizeText}
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
                    <a class="link">Join now</a>
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
                    <a class="link">Log In</a>
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
        `
    ]
}

customElements.define('ik-auth', IkAuth);