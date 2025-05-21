import {css, html, LitElement} from "lit";
import "../../../atoms/ik-filter/ik-filter"
import "../../../atoms/ik-input/ik-input"
import {_emit} from "../../../../utils/event";

class IkFiltersMenu extends LitElement {
    static properties = {
        fontSize: { type: String },
        searchBarWidth: { type: String },
        filters: { type: Object },
    }

    constructor() {
        super();
        this.fontSize = "15px"
        this.searchBarWidth = "20em"
        this.filters = {
            groupBy: "domain",
            checkIn: [10,"minutes"]
        }
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
                        .valueSelect=${this.filters.groupBy}
                        @ik-filter:change-select=${(e) => _emit(this, "ik-filter-menu:change-group", e.detail)}
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
                        .valueInput=${this.filters.checkIn[0]}
                        .valueSelect=${this.filters.checkIn[1]}
                        @ik-filter:change-input=${(e) => {
                            this.filters.checkIn[0] = e.detail.value; 
                            _emit(this, "ik-filter-menu:change-checkin", {value1: this.filters.checkIn[0], value2: this.filters.checkIn[1]});
                        }}
                        @ik-filter:change-select=${(e) => {
                            this.filters.checkIn[1] = e.detail.value; 
                            _emit(this, "ik-filter-menu:change-checkin", {value1: this.filters.checkIn[0], value2: this.filters.checkIn[1]});
                        }}
                ></ik-filter>
                <ik-input
                        fontSize=${this.fontSize}
                        height="auto"
                        placeholder="Research..."
                        width=${this.searchBarWidth}
                        @ik-input:change=${(e) => _emit(this, "ik-filter-menu:change-research", e.detail)}
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