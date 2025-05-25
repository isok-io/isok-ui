import {css, html, LitElement} from "lit";
import "../../../atoms/ik-input/ik-input";
import "../../../atoms/ik-button/ik-button";
import {_emit} from "../../../../utils/event";
import prettyMs from 'pretty-ms';

class IkCheckFormUpdate extends LitElement {
    static properties = {
        schema: {type: Object},
        data: {type: Object},
        zones: {type: Array},
        fontSizeTitle: { type: String },
        fontSizeText: { type: String },
        fontSizeTextAdvanced: { type: String },
        width: { type: String },
        errorMessage: { type: String },
    }


    constructor() {
        super();
        this.schema = {};
        this.data = undefined;
        this.zones = [];
        this.fontSizeTitle = "50px";
        this.fontSizeText = "25px";
        this.fontSizeTextAdvanced = "20px";
        this.width = "660px";
        this.errorMessage = "";
    }

    normalizeKey(label = "") {
        return label.trim().toLowerCase().replace(/\s+/g, "_").replace(/-/g, "");
    }

    updateInputValue(targetInput, newValue) {

        const type = this.schema.type;
        const key = targetInput.title.trim().toLowerCase().replace(/\s+/g, "_");

        if (!this.data.kind || !this.data.kind[type]) return;

        if(key in this.data.kind[type]) {
            this.data.kind[type][key] = newValue;
        } else {
            if(key === "zones" && newValue !== [ "all" ]){
                this.data.zones = newValue.map(item => ({ Region: item }))
            } else {
                this.data[key] = newValue;
            }
        }
        this.requestUpdate();
    }

    getData(key){
        console.log(this.data.kind[this.schema.type][this.normalizeKey(key)] || this.data[this.normalizeKey(key)])
        return this.data.kind[this.schema.type][this.normalizeKey(key)] || this.data[this.normalizeKey(key)];
    }

    renderInputText(dataInput, fontSize){
        if(dataInput.kind.variant === "Area"){
            return this.renderInputArea(dataInput, fontSize);
        } else {
            return html`
                <ik-input
                        .title=${dataInput.title}
                        .placeholder=${dataInput.kind.placeholder}
                        .value=${this.getData(dataInput.title)}
                        height="auto"
                        .width=${this.width}
                        fontSize=${fontSize}
                        @ik-input:change=${(e) => this.updateInputValue(dataInput, e.detail.value)}
                ></ik-input>
            `
        }
    }

    renderInputArea(dataInput, fontSize){
        return html`
            <ik-input
                    type="textarea"
                    .title=${dataInput.title}
                    .placeholder=${dataInput.kind.placeholder}
                    .value=${this.getData(dataInput.title)}
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
                    .selectOptions=${dataInput.kind.selectOptions}
                    .value=${this.getData(dataInput.title)}
                    height="auto"
                    width="auto"
                    fontSize=${fontSize}
                    @ik-input:change=${(e) => this.updateInputValue(dataInput, e.detail.value)}
            ></ik-input>
        `
    }

    renderInputMultiselect(dataInput, fontSize){
        return html`
            <ik-input
                    .title=${dataInput.title}
                    type="multiselect"
                    .selectOptions=${dataInput.kind.selectOptions}
                    .values=${this.getData(dataInput.title)}
                    height="auto"
                    width="auto"
                    fontSize=${fontSize}
                    @ik-input:change=${(e) => this.updateInputValue(dataInput, e.detail.values)}
            ></ik-input>
        `
    }

    renderInputKeyValue(dataInput, fontSize){
        return html`
            <div class="keyValueInput">
                <ik-input
                        .title=${dataInput.title}
                        type="double"
                        .placeholder=${dataInput.kind.keyPlaceholder}
                        .placeholder2=${dataInput.kind.valuePlaceholder}
                        .values=${this.getData(dataInput.title)}
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
            switch(item.kind.type) {
                case 'Text': return this.renderInputText(item, fontSize);
                case 'Select': return this.renderInputSelect(item, fontSize);
                case 'Multiselect': return this.renderInputMultiselect(item, fontSize);
                case 'KeyValue': return this.renderInputKeyValue(item, fontSize);
            }
        })}
        `
    }

    render() {
        console.log(this.zones)
        this.zones.push({value: 'all', label: 'All'});
        this.data.interval = Number.isInteger(this.data.interval) ? prettyMs(this.data.interval * 1000, {compact: true}) : this.data.interval;
        this.data.zones = this.data.zones.includes('all') ? this.data.zones : this.data.zones.map(zone => zone.Region);
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
                    ${this.renderInputText(
                        {
                            "kind": {
                                "type": "Text",
                            },
                            "title": "Name"
                        },
                        this.fontSizeText
                    )}
                    ${this.renderInputMultiselect(
                            {
                                "kind": {
                                    "type": "Multiselect",
                                    "selectOptions": this.zones
                                },
                                "title": "Zones"
                            },
                            this.fontSizeText
                    )}
                    ${this.renderInputText(
                            {
                                "kind": {
                                    "type": "Text",
                                },
                                "title": "Interval"
                            },
                            this.fontSizeText
                    )}
                    ${this.renderInputs(this.schema.inputs, this.fontSizeText)}
                    ${this.renderInputs(this.schema.inputsAdvanced, this.fontSizeText)}
                </div>
                <div class="error-message">${this.errorMessage}</div>
                <ik-button
                    type="blue"
                    text="Save"
                    height="auto"
                    @ik-button:click=${() => _emit(this, "ik-check-form-update:click-save", this.data)}
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
            .error-message {
                color: var(--text-red);
                font-family: Inter, sans-serif;
            }
        `
    ];
}

customElements.define('ik-check-form-update', IkCheckFormUpdate);