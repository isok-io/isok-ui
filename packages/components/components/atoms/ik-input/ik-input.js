import {css, html, LitElement} from "lit";
import '../ik-button/ik-button.js';

class IkInput extends LitElement {
    static properties = {
        placeholder: {type: String},
        placeholder2: {type: String},
        type: {type: String},
        width: { type: String },
        height: { type: String },
        fontSize: { type: String },
        title: { type: String },
        selectOptions: { type: Array },
    };

    constructor() {
        super();
        this.placeholder = undefined;
        this.placeholder2 = undefined;
        this.type = "text";
        this.width = '660px';
        this.height = '56px';
        this.fontSize = '25px';
        this.title = undefined;
        this.selectOptions = [];
    }

    renderTitle(){
        if(this.title){
            return html`<span class="title">${this.title}</span>`;
        }
    }
    renderInput(){
        if(this.type === "text"){
            return html`
                <input class="input"
                    placeholder="${this.placeholder}"
                />
            `
        } else if(this.type === "textarea"){
            return html`
                <textarea class="textarea"
                    placeholder="${this.placeholder}"
                ></textarea>
            `
        } else if(this.type === "select"){
            return html`
                <select class="select">
                    ${this.selectOptions.map(opt => html`<option value="${opt.value}">${opt.label}</option>`)}
                </select>
            `
        } else if(this.type === "double"){
            return html`
                <div class="double">
                    <input
                            placeholder="${this.placeholder}"
                    />
                    <input
                            placeholder="${this.placeholder2}"
                    />
                    <ik-button 
                        text="Add"
                        fontSize=${this.fontSize}
                        width="auto"
                        height="auto"
                    ></ik-button>
                </div>
            `
        }
    }

    render() {
        return html`
            <div 
                    class="ik-input ${this.type}"
                    style="
                        --ipt-width: ${this.width}; 
                        --ipt-height: ${this.height};
                        --ipt-font-size: ${this.fontSize};
                    "
            >
                ${this.renderTitle()}
                ${this.renderInput()}
            </div>
        `;
    }


    static styles = [
        css`
            .ik-input {
                display: flex;
                flex-direction: column;
                gap: 0.5em;
                font-family: Inter, sans-serif;
            }
            
            .ik-input .input, .ik-input .textarea, .ik-input .select {
                width: var(--ipt-width);
                height: var(--ipt-height);
                border-radius: 8px;
                font-size: var(--ipt-font-size);
                padding: 0.3em;
                background-color: var(--ipt-bg, #CECECE);
                border: 2px solid var(--border);
                color: var(--text);
            }

            .ik-input .double {
                width: var(--ipt-width);
                height: var(--ipt-height);
                display: flex;
                flex-direction: row;
                gap: 1em;
            }
            
            .ik-input .double input {
                border-radius: 8px;
                font-size: var(--ipt-font-size);
                padding: 0.3em;
                background-color: var(--ipt-bg, #CECECE);
                border: 2px solid var(--border);
                color: var(--text);
                width: 40%;
            }
            
            .title {
                font-size: var(--ipt-font-size);
            }
        `
    ]
}

customElements.define('ik-input', IkInput);