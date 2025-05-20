import {css, html, LitElement} from "lit";
import "../../../atoms/ik-input/ik-input";
import "../../../atoms/ik-button/ik-button";

class IkCheckFormUpdate extends LitElement {
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

    renderInputText(dataInput, fontSize){
        return html`
            <ik-input 
                .title=${dataInput.title}
                .placeholder=${dataInput.placeholder}
                .value=${dataInput.value}
                height="auto"
                .width=${this.width}
                fontSize=${fontSize}
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
            ></ik-input>
        `
    }

    renderInputSelect(dataInput, fontSize){
        return html`
            <ik-input
                .title=${dataInput.title}
                type="select"
                .selectOptions = ${dataInput.selectOptions}
                .value=${dataInput.value}
                heigth="auto"
                width="auto"
                fontSize=${fontSize}
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
            <div class="ik-check-form-update"
                style="
                    --cfu-font-size-title: ${this.fontSizeTitle};
                    --cfu-font-size-text-advanced: ${this.fontSizeTextAdvanced};
                    --cfu-width: ${this.width};
                "
            >
                <span class="title">Update check</span>
                <div class="form">
                    ${this.renderInputs(this.data.inputs, this.fontSizeText)}
                </div>
                <ik-button
                    type="blue"
                    text="Save"
                    height="auto"
                ></ik-button>
            </div>
        `;
    }


    static styles = [
        css`
            .ik-check-form-update {
                display: flex;
                flex-direction: column;
                width: var(--cfu-width);
                color: var(--text);
                align-items: center;
                gap: 2em;
            }
            
            .title {
                font-size: var(--cfu-font-size-title);
                font-family: Jura, sans-serif;
            }
            
            .form {
                display: flex;
                flex-direction: column;
                gap: 1em;
            }
        `
    ];
}

customElements.define('ik-check-form-update', IkCheckFormUpdate);