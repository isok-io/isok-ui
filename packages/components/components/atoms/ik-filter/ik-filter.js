import {css, html, LitElement} from "lit";
import {_emit} from "../../../utils/event";

class IkFilter extends LitElement {
    static properties = {
        type: {type: String},
        title: {type: String},
        selectOptions: { type: Array },
        inputType: { type: String },
        widthTitle: { type: String },
        widthZ1: { type: String },
        widthZ2: { type: String },
        fontSize: { type: String },
        placeholder: { type: String },
        valueInput: { type: String },
        valueSelect: { type: String },
    };

    constructor() {
        super();
        this.type = 'simple-select';
        this.title = undefined;
        this.selectOptions = [];
        this.inputType = 'text';
        this.widthTitle = '100px';
        this.widthZ1 = '145px';
        this.widthZ2 = '0px';
        this.fontSize = '20px';
        this.placeholder = '';
        this.valueInput = '';
        this.valueSelect = '';
    }

    render() {
        return html`
            <div 
                    class="ik-filter ${this.type}"
                    style="
                        --flt-font-size: ${this.fontSize};
                        --flt-width-title: ${this.widthTitle};
                        --flt-width-z1: ${this.widthZ1};
                        --flt-width-z2: ${this.widthZ2};
                    "
            >
                <div class="ik-filter-title">
                    <span class="ik-filter-title-text">${this.title}</span>
                </div>
                <div class="ik-filter-input">
                    ${ this.type === "simple-text" || this.type === "double" ? html`
                        <input class="ik-filter-input-text" 
                               type=${this.inputType} 
                               placeholder=${this.placeholder} 
                               .value=${this.valueInput}
                               @input=${(e) => _emit(this, "ik-filter:change-input", {value: e.target.value})}
                        >
                    `: ``}
                    ${ this.type === "simple-select" || this.type === "double" ? html`
                    <select class="ik-filter-input-select"
                        @change=${(e) => _emit(this, "ik-filter:change-select", {value: e.target.value})}
                    >
                        ${this.selectOptions.map(opt => html`<option value="${opt.value}" ?selected=${opt.value === this.valueSelect}>${opt.label}</option>`)}
                    </select>
                    `:``}
                </div>
            </div>
        `;
    }


    static styles = [
        css`
            .ik-filter {
                display: flex;
                flex-direction: row;
                font-size: var(--flt-font-size);
                font-family: Inter, sans-serif;
            }
            
            .ik-filter-title {
                border-radius: 5px 0 0 5px;
                border-block: solid 2px var(--border, #A7A7A7);
                border-left: solid 2px var(--border, #A7A7A7);
                background: var(--tag-bg);
                padding: 0.3em;
                color: var(--text-blue);
                font-weight: bold;
                width: var(--flt-width-title);
            }
            
            .ik-filter-title-text {
                height: 100%;
                font-size: var(--flt-font-size);
            }
            
            .ik-filter-input {
                display: flex;
                flex-direction: row;
            }
            
            .ik-filter-input-select {
                border-radius: 0 5px 5px 0;
                padding: 0.3em;
                background-color: var(--ipt-bg, #CECECE);
                border: 2px solid var(--border, #A7A7A7);
                font-size: var(--flt-font-size);
                color: var(--text);
            }
            
            .ik-filter.simple-select .ik-filter-input-select {
                width: var(--flt-width-z1);
            }

            .ik-filter.double .ik-filter-input-select {
                width: var(--flt-width-z2);
            }

            .ik-filter-input-text {
                padding: 0.3em;
                background-color: var(--ipt-bg, #CECECE);
                width: var(--flt-width-z1);
                color: var(--text);
                font-size: var(--flt-font-size);
                -webkit-appearance: none;
                -moz-appearance: textfield;
                margin: 0;
            }
            
            .ik-filter.simple-text .ik-filter-input-text {
                border-radius: 0 5px 5px 0;
                border: 2px solid var(--border, #A7A7A7);
            }
            
            .ik-filter.double .ik-filter-input-text {
                border-radius: 0;
                border-block: solid 2px var(--border, #A7A7A7);
                border-left: solid 2px var(--border, #A7A7A7);
                border-right: none;
                z-index: 10;
            }
            
        `
    ]
}

customElements.define('ik-filter', IkFilter);