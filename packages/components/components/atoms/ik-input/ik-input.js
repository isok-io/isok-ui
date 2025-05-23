import {css, html, LitElement} from "lit";
import '../ik-button/ik-button.js';
import {_emit} from "../../../utils/event";

class IkInput extends LitElement {
    static properties = {
        placeholder: {type: String},
        placeholder2: {type: String},
        value: {type: String},
        value2: {type: String},
        values: {type: Array},
        type: {type: String},
        width: { type: String },
        height: { type: String },
        fontSize: { type: String },
        title: { type: String },
        selectOptions: { type: Array },
        inputType: { type: String },
        inputType2: { type: String },
        info: { type: String },
    };

    constructor() {
        super();
        this.placeholder = undefined;
        this.placeholder2 = undefined;
        this.value = '';
        this.value2 = '';
        this.values = [];
        this.type = "text";
        this.width = '660px';
        this.height = '56px';
        this.fontSize = '25px';
        this.title = undefined;
        this.selectOptions = [];
        this.inputType = 'text';
        this.inputType2 = 'text';
        this.info = '';
    }

    addValue(value) {
        this.values = [...this.values, value];
        this.value = '';
        this.value2 = '';
        _emit(this, "ik-input:change", {values: this.values});
    }

    updateValue(elem, newValue) {
        this.values = this.values.map(v =>
            v === elem ? { ...v, value: newValue } : v
        );
        _emit(this, "ik-input:change", {values: this.values});
    }

    removeValue(value) {
        this.values = this.values.filter(v => v !== value);
        _emit(this, "ik-input:change", {values: this.values});
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
                    .value=${this.value}
                    @input=${(e) => _emit(this, "ik-input:change", {value: e.target.value})}
                    title=${this.info}
                />
            `
        } else if(this.type === "textarea"){
            return html`
                <textarea class="textarea"
                    placeholder="${this.placeholder}"
                    .value=${this.value}
                    @input=${(e) => _emit(this, "ik-input:change", {value: e.target.value})}
                    title=${this.info}
                ></textarea>
            `
        } else if(this.type === "select"){
            return html`
                <select class="select"
                    @change=${(e) => _emit(this, "ik-input:change", {value: e.target.value})}
                >
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
                                .value=${this.value}
                                @input=${(e) => this.value = e.target.value}
                                title=${this.info}
                        />
                        <input
                                placeholder="${this.placeholder2}"
                                type=${this.inputType2}
                                .value=${this.value2}
                                @input=${(e) => this.value2 = e.target.value}
                                title=${this.info}
                        />
                        <ik-button
                            text="Add"
                            fontSize=${this.fontSize}
                            width="4.5em"
                            height="auto"
                            @ik-button:click=${() => this.addValue({key: this.value, value: this.value2})}
                        ></ik-button>
                    </div>
                    ${
                        this.values.map(v => html`
                            <div class="grid">
                                <span class="key">${v.key}</span>
                                <input
                                    type=${this.inputType2}
                                    value="${v.value}"
                                    @input=${(e) => this.updateValue(v, e.target.value)}
                                    title=${this.info}
                                />
                                <ik-button
                                        text="Remove"
                                        fontSize=${this.fontSize}
                                        width="4.5em"
                                        height="auto"
                                        @ik-button:click=${() => this.removeValue(v)}
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
                            @input=${(e) => this.value = e.target.value}
                        />
                        <ik-button
                            text="Add"
                            fontSize=${this.fontSize}
                            width="4.5em"
                            height="auto"
                            @ik-button:click=${() => this.addValue(this.value)}
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
                                @ik-button:click=${() => this.removeValue(v)}
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
                font-size: var(--ipt-font-size);
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
                font-size: var(--ipt-font-size);
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