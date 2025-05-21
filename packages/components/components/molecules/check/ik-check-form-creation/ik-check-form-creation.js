import {css, html, LitElement} from "lit";
import "../../../atoms/ik-input/ik-input";
import "../../../atoms/ik-button/ik-button";
import {_emit} from "../../../../utils/event";

class IkCheckFormCreation extends LitElement {
    static properties = {
        data: {type: Object},
        fontSizeTitle: { type: String },
        fontSizeText: { type: String },
        fontSizeTextAdvanced: { type: String },
        width: { type: String },
    }


    constructor() {
        super();
        this.data = undefined;
        this.fontSizeTitle = "50px";
        this.fontSizeText = "25px";
        this.fontSizeTextAdvanced = "20px";
        this.width = "660px";
    }

    updateInputValue(targetInput, newValue) {
        const update = (inputs) => {
            const index = inputs.findIndex(i => i === targetInput);
            if (index !== -1) {
                if (Array.isArray(newValue)) {
                    inputs[index] = {
                        ...inputs[index],
                        values: newValue
                    };
                } else {
                    inputs[index] = {
                        ...inputs[index],
                        value: newValue
                    };
                }
            }
        };

        update(this.data.inputs);
        update(this.data.inputsAdvanced);
        this.requestUpdate();
    }



    openToggle() {
        this.toggleOpen = !this.toggleOpen;
        this.requestUpdate();
    }

    renderInputText(dataInput, fontSize){
        return html`
            <ik-input
                    .title=${dataInput.title}
                    .placeholder=${dataInput.placeholder}
                    .value=${dataInput.value}
                    height="auto"
                    .width=${this.width}
                    fontSize=${fontSize}
                    @ik-input:change=${(e) => this.updateInputValue(dataInput, e.detail.value)}
            ></ik-input>
        `
    }

    renderInputArea(dataInput, fontSize){
        return html`
            <ik-input
                    type="textarea"
                    .title=${dataInput.title}
                    .placeholder=${dataInput.placeholder}
                    .value=${dataInput.value}
                    height="auto"
                    .width=${this.width}
                    fontSize=${fontSize}
                    @ik-input:change=${(e) => this.updateInputValue(dataInput, e.detail.value)}
            ></ik-input>
        `
    }

    renderInputSelect(dataInput, fontSize){
        return html`
            <ik-input
                    .title=${dataInput.title}
                    type="select"
                    .selectOptions=${dataInput.selectOptions}
                    .value=${dataInput.value}
                    height="auto"
                    width="auto"
                    fontSize=${fontSize}
                    @ik-input:change=${(e) => this.updateInputValue(dataInput, e.detail.value)}
            ></ik-input>
        `
    }

    renderInputKeyValue(dataInput, fontSize){
        return html`
            <div class="keyValueInput">
                <ik-input
                        .title=${dataInput.title}
                        type="double"
                        .placeholder=${dataInput.placeholder}
                        .placeholder2=${dataInput.placeholder2}
                        .values=${dataInput.values}
                        height="1.8em"
                        width=${this.width}
                        fontSize=${fontSize}
                        @ik-input:change=${(e) => this.updateInputValue(dataInput, e.detail.values)}
                ></ik-input>
            </div>
        `
    }


    renderInputs(dataInputs, fontSize) {
        return html`
            ${dataInputs.map(item => {
                switch(item.type) {
                    case 'text': return this.renderInputText(item, fontSize);
                    case 'area': return this.renderInputArea(item, fontSize);
                    case 'select': return this.renderInputSelect(item, fontSize);
                    case 'key-value': return this.renderInputKeyValue(item, fontSize);
                }
            })}
        `
    }

    render() {
        return html`
            <div class="ik-check-form-creation"
                style="
                    --cfc-font-size-title: ${this.fontSizeTitle};
                    --cfc-font-size-text-advanced: ${this.fontSizeTextAdvanced};
                    --cfc-width: ${this.width};
                "
            >
                <span class="title">New check - ${this.data.type}</span>
                
                <div class="form">
                    <div class="basic-inputs-zone">
                        ${this.renderInputs(this.data.inputs, this.fontSizeText)}
                    </div>
                    
                    ${this.data.inputsAdvanced || this.data.inputsAdvanced?.length > 0 ? html`
                        <div class="toggle" @click=${this.openToggle}>
                            <span>Advanced settings</span>
                            <ik-button
                                    class="icon-button"
                                    width='auto'
                                    height='auto'
                                    icon=${this.toggleOpen ? "material-symbols:keyboard-arrow-up-rounded" :"material-symbols:keyboard-arrow-down-rounded"}
                                    iconColor="var(--text-blue)"
                                    iconColorHover="var(--text-blue)"
                                    type='icon'
                                    iconSize=${this.fontSizeTextAdvanced}
                            ></ik-button>
                        </div>
                    `:`` }
                    
                    ${ this.toggleOpen ? html`
                        <div class="toggle-content">
                            ${this.renderInputs(this.data.inputsAdvanced, this.fontSizeTextAdvanced)}
                        </div>
                    ` : html``}
                </div>
                <ik-button
                    text="Next"
                    height="auto"
                    @ik-button:click=${() => _emit(this, "ik-check-form-creation:click-next", this.data)}
                ></ik-button>
            </div>
        `;
    }


    static styles = [
        css`
            .ik-check-form-creation {
                display: flex;
                flex-direction: column;
                width: var(--cfc-width);
                color: var(--text);
                align-items: center;
                gap: 2em;
            }
            
            .title {
                font-size: var(--cfc-font-size-title);
                font-family: Jura, sans-serif;
            }
            
            .toggle {
                color: var(--text-blue);
                font-family: Inter, sans-serif;
                font-size: var(--cfc-font-size-text-advanced);
                display: flex;
                flex-direction: row;
                align-items: center;
                cursor: pointer;
                margin-top: 1em;
                margin-bottom: 0.5em;
            }
            .icon-button {
                margin-inline: -0.2em;
            }
            
            .toggle-content {
                display: flex;
                flex-direction: column;
                gap: 0.5em;
            }
            
            .basic-inputs-zone {
                display: flex;
                flex-direction: column;
                gap: 1em;
            }
        `
    ];
}

customElements.define('ik-check-form-creation', IkCheckFormCreation);