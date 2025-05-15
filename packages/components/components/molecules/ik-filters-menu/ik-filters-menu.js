import {css, html, LitElement} from "lit";
import "../../atoms/ik-filter/ik-filter"
import "../../atoms/ik-input/ik-input"

class IkFiltersMenu extends LitElement {
    static properties = {
        fontSize: { type: String },
        searchBarWidth: { type: String },
    }

    constructor() {
        super();
        this.fontSize = "15px"
        this.searchBarWidth = "20em"
    }

    render() {
        return html`
            <div class="ik-filters-menu"
                style="
                    --ftm-font-size: ${this.fontSize}
                "
            >
                <ik-filter 
                        type="simple-select" 
                        title="Group by" 
                        fontSize=${this.fontSize}
                        .selectOptions=${[
                            { value: 'domain', label: 'Domain' },
                            { value: 'type', label: 'Type' },
                        ]}
                        widthTitle="auto"
                        widthZ1="auto"
                ></ik-filter>
                <ik-filter
                        type="double"
                        title="Check in"
                        fontSize=${this.fontSize}
                        .selectOptions=${[
                            { value: 'minutes', label: 'Minutes' },
                            { value: 'days', label: 'Days' },
                            { value: 'months', label: 'Months' },
                        ]}
                        widthTitle="auto"
                        widthZ1="3em"
                        widthZ2="auto"
                        valueInput="10"
                        valueSelect="days"
                ></ik-filter>
                <ik-input
                        fontSize=${this.fontSize}
                        height="auto"
                        placeholder="Research..."
                        width=${this.searchBarWidth}
                ></ik-input>
            </div>
        `;
    }


    static styles = [
        css`
           .ik-filters-menu {
               display: flex;
               flex-direction: row;
               gap: 1em;
           }
        `
    ];
}

customElements.define('ik-filters-menu', IkFiltersMenu);