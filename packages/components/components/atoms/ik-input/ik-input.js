import {css, html, LitElement} from "lit";
import '../ik-button/ik-button.js';
import {_emit} from "../../../utils/event";

import Choices from 'choices.js';

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

    firstUpdated() {
        if (this.type === "multiselect") {
            const select = this.renderRoot.querySelector('#choices');
            this.choicesInstance = new Choices(select, {
                removeItemButton: true,
                placeholder: true,
                placeholderValue: this.placeholder,
                searchEnabled: true,
                itemSelectText: '',
                position: 'auto',
                shouldSort: false,
                callbackOnCreateTemplates: function(template) {
                    return {
                        item: (classNames, data) => {
                            return template(`
                            <div class="choices__item ${data.highlighted ? classNames.highlightedState : classNames.itemSelectable}"
                                data-item data-id="${data.id}" data-value="${data.value}" ${data.active ? 'aria-selected="true"' : ''}
                                ${data.disabled ? 'aria-disabled="true"' : ''}>
                                ${data.label}
                                <button type="button" class="button-remove" data-button aria-label="Remove item">
                                    ✕
                                </button>
                            </div>
                        `);
                        }
                    };
                }
            });

            select.addEventListener('change', (e) => {
                let selected = Array.from(select.selectedOptions).map(opt => opt.value);

                if(e.detail.value === "all"){
                    selected.filter(v => v !== 'all').forEach(v => this.choicesInstance.removeActiveItemsByValue(v))
                    selected = ['all'];
                } else if (selected.length === 0 || (selected.length === 1 && selected[0] === 'all')) {
                    if (!selected.includes('all')) {
                        this.choicesInstance.setChoiceByValue('all');
                        selected = ['all'];
                    }
                } else {
                    if (selected.includes('all')) {
                        this.choicesInstance.removeActiveItemsByValue('all');
                        selected = selected.filter(v => v !== 'all');
                    }
                }

                this.values = selected;
                _emit(this, "ik-input:change", { values: selected });
            });


            const container = this.renderRoot.querySelector('.choices');
            const input = container.querySelector('input');

            input.addEventListener('focus', () => {
                container.classList.add('dropdown-open');
            });

            input.addEventListener('blur', () => {
                setTimeout(() => {
                    if (!container.contains(this.shadowRoot.activeElement)) {
                        container.classList.remove('dropdown-open');
                    }
                }, 150);
            });

            container.addEventListener('mousedown', e => {
                e.preventDefault();
                input.focus();
            });
        }
    }

    addValue(key, value) {
        if(key === null){
            this.values.push(value);
        } else {
            this.values[key] = value;
            this.value = '';
            this.value2 = '';
        }
        _emit(this, "ik-input:change", {values: this.values});
        this.requestUpdate();
    }

    updateValue(key, newValue) {
        this.values[key] = newValue;
        _emit(this, "ik-input:change", {values: this.values});
        this.requestUpdate();
    }

    removeValue(key, value) {
        if(key === null){
            delete this.values[this.values.indexOf(value)];
        } else {
            delete this.values[key];
        }
        _emit(this, "ik-input:change", {values: this.values});
        this.requestUpdate();
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
        } else if (this.type === "multiselect") {
            return html`
            <select id="choices" multiple>
              ${this.selectOptions.map(opt => html`
                <option value="${opt.value}" ?selected=${this.values.includes(opt.value)}>${opt.label}</option>
              `)}
            </select>
          `;
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
                            @ik-button:click=${() => this.addValue(this.value, this.value2)}
                        ></ik-button>
                    </div>
                    ${
                        Object.entries(this.values).map(v => html`
                            <div class="grid">
                                <span class="key">${v[0]}</span>
                                <input
                                    type=${this.inputType2}
                                    value="${v[1]}"
                                    @input=${(e) => this.updateValue(v[0], e.target.value)}
                                    title=${this.info}
                                />
                                <ik-button
                                        text="Remove"
                                        fontSize=${this.fontSize}
                                        width="4.5em"
                                        height="auto"
                                        @ik-button:click=${() => this.removeValue(v[0], v[1])}
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
                            @ik-button:click=${() => this.addValue(null, this.value)}
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
                                @ik-button:click=${() => this.removeValue(null, v)}
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

            .choices {
                width: var(--ipt-width);
                font-size: var(--ipt-font-size);
            }

            .choices__inner {
                height: var(--ipt-height);
                width: var(--ipt-width);
                background-color: var(--ipt-bg, #CECECE);
                border: 2px solid var(--border);
                border-radius: 5px;
                padding: 0.3em;
                color: var(--text);
                display: flex;
                align-items: center;
                flex-direction: row;
            }

            .choices__input {
                font-size: var(--ipt-font-size);
                color: var(--text);
                background: transparent;
                border: none;
            }

            .choices__list--multiple {
                display: flex;
                flex-direction: row;
                gap: 0.2em;
            }

            .choices__list--multiple .choices__item {
                background-color: transparent;
                padding: 0 5px;
                margin: 0 3px;
                color: var(--text);
                border: 1px solid var(--border);
                border-radius: 5px;
                display: flex;
                flex-direction: row;
                gap: 0.4em;
            }

            .choices__list--dropdown {
                background-color: var(--ipt-bg, #CECECE);
                color: var(--text);
                border: 1px solid var(--border);
                border-radius: 5px;
                z-index: 100;
            }

            .choices__item--selectable {
                padding: 0.3em;
            }

            .choices__item--selectable.is-highlighted {
                background-color: var(--tag-bg);
            }

            .button-remove {
                background: none;
                border: none;
                color: var(--text);
                font-size: 0.8em;
                cursor: pointer;
                padding: 0;
                display: flex;
                align-items: center;
            }

            .button-remove:hover {
                color: var(--text-hover);
            }

            .choices__list--dropdown {
                display: none;
            }

            .choices.dropdown-open .choices__list--dropdown {
                display: block;
            }
        `
    ]
}

customElements.define('ik-input', IkInput);