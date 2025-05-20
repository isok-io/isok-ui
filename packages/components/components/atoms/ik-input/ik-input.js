import {css, html, LitElement} from "lit";
import '../ik-button/ik-button.js';

class IkInput extends LitElement {
    static properties = {
        placeholder: {type: String},
        placeholder2: {type: String},
        value: {type: String},
        value2: {type: String},
        type: {type: String},
        width: { type: String },
        height: { type: String },
        fontSize: { type: String },
        title: { type: String },
        selectOptions: { type: Array },
        inputType: { type: String },
        inputType2: { type: String },
    };

    constructor() {
        super();
        this.placeholder = undefined;
        this.placeholder2 = undefined;
        this.value = undefined;
        this.value2 = undefined;
        this.type = "text";
        this.width = '660px';
        this.height = '56px';
        this.fontSize = '25px';
        this.title = undefined;
        this.selectOptions = [];
        this.inputType = 'text';
        this.inputType2 = 'text';
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
                    type=${this.inputType}
                    value="${this.value}"
                />
            `
        } else if(this.type === "textarea"){
            return html`
                <textarea class="textarea"
                    placeholder="${this.placeholder}"
                >${this.value}</textarea>
            `
        } else if(this.type === "select"){
            return html`
                <select class="select">
                    ${this.selectOptions.map(opt => html`<option value="${opt.value}" ?selected=${this.value === opt.value}>${opt.label}</option>`)}
                </select>
            `
        } else if(this.type === "double"){
            return html`
                <div class="double">
                    <div class="grid">
                        <input
                                placeholder="${this.placeholder}"
                                type=${this.inputType}
                                value="${this.value}"
                        />
                        <input
                                placeholder="${this.placeholder2}"
                                type=${this.inputType2}
                                value="${this.value2}"
                        />
                        <ik-button 
                            text="Add"
                            fontSize=${this.fontSize}
                            width="4.5em"
                            height="auto"
                        ></ik-button>
                    </div>
                    ${
                        this.values.map(v => html`
                            <div class="grid">
                                <span class="key">${v.key}</span>
                                <input
                                    type=${this.inputType2}
                                    value="${v.value}"
                                />
                                <ik-button
                                        text="Remove"
                                        fontSize=${this.fontSize}
                                        width="4.5em"
                                        height="auto"
                                ></ik-button>
                            </div>
                        `)
                    }
                </div>
            `
        } else if(this.type === "list"){
            return html`
                <div class="list">
                    <div class="grid2">
                        <input
                            placeholder="${this.placeholder}"
                            type=${this.inputType}
                            value="${this.value}"
                        />
                        <ik-button 
                            text="Add"
                            fontSize=${this.fontSize}
                            width="4.5em"
                            height="auto"
                        ></ik-button>
                    </div>
                    ${
                this.values.map(v => html`
                    <div class="grid2">
                        <span class="key">${v}</span>
                        <ik-button
                                text="Remove"
                                fontSize=${this.fontSize}
                                width="4.5em"
                                height="auto"
                        ></ik-button>
                    </div>
                `)
            }
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
                border-radius: 5px;
                font-size: var(--ipt-font-size);
                padding: 0.3em;
                background-color: var(--ipt-bg, #CECECE);
                border: 2px solid var(--border);
                color: var(--text);
            }

            .ik-input .double, .ik-input .list {
                width: var(--ipt-width);
                display: flex;
                flex-direction: column;
                gap: 1em;
            }
            
            .ik-input .double input, .ik-input .list input {
                border-radius: 8px;
                font-size: var(--ipt-font-size);
                padding: 0.3em;
                background-color: var(--ipt-bg, #CECECE);
                border: 2px solid var(--border);
                color: var(--text);
                width: 90%;
            }
            
            .title {
                font-size: var(--ipt-font-size);
                color: var(--text);
            }

            .grid {
                display: grid;
                grid-template-columns: 1fr 2fr auto;
                gap: 0.5em;
                align-items: center;
            }
            
            .key {
                font-size: var(--ipt-font-size);
                color: var(--text);
            }

            .grid2 {
                display: grid;
                grid-template-columns: 2fr auto;
                gap: 0.5em;
                align-items: center;
            }
        `
    ]
}

customElements.define('ik-input', IkInput);