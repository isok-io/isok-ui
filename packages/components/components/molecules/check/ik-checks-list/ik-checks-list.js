import {css, html, LitElement} from "lit";
import "../../other/ik-filters-menu/ik-filters-menu"
import "../ik-check-group/ik-check-group"
import "../ik-check/ik-check"
import {_emit} from "../../../../utils/event";

class IkChecksList extends LitElement {
    static properties = {
        fontSizeTitle: {type: String},
        fontSizeCheckTitle: {type: String},
        fontSizeCheckValue: {type: String},
        fontSizeFilterBar: { type: String },
        searchBarWidth: { type: String },
        checks: {type: Array},
        groupByValue: { type: String },
        bigCheckWidth: { type: String },
        smallCheckWidth: { type: String },
        buttonSize: {type: String},
        width: {type: String},
    };

    constructor() {
        super();
        this.fontSizeTitle = '50px';
        this.fontSizeCheckTitle = '16px';
        this.fontSizeCheckValue = '24px';
        this.fontSizeFilterBar = '15px';
        this.searchBarWidth = '20em';
        this.checks = [];
        this.groupByValue = "domain";
        this.bigCheckWidth = "65em";
        this.smallCheckWidth = '55em';
        this.buttonSize = '40px';
        this.width = "auto";
    }

    groupBy(valueKey) {

        const grouped = {};

        for (const check of this.checks) {
            const key = check[valueKey];
            if (!grouped[key]) {
                grouped[key] = {
                    [valueKey]: key,
                    checks: [],
                    uptimeSum: 0,
                    latencySum: 0,
                    barsStatusLists: []
                };
            }

            const bars = check.bars.slice(0, 20).concat(
                Array.from({ length: Math.max(0, 20 - check.bars.length) }, () => ({ color: "grey"}))
            );

            const checkWithColoredBars = {
                ...check,
                bars: bars,
            };

            grouped[key].checks.push(checkWithColoredBars);
            grouped[key].uptimeSum += check.uptime;
            grouped[key].latencySum += check.latency;

            bars.forEach((bar, index) => {
                if (!grouped[key].barsStatusLists[index]) {
                    grouped[key].barsStatusLists[index] = [];
                }
                grouped[key].barsStatusLists[index].push(bar.color);
            });
        }

        return Object.values(grouped).map(group => {
            const count = group.checks.length;

            const colorWeights = {
                red: 3,
                yellow: 2,
                green: 1,
                grey: 0
            };

            const bars = group.barsStatusLists.map(colorsList => {
                const scores = colorsList.reduce((acc, color) => {
                    const weight = colorWeights[color] ?? 0;
                    acc[color] = (acc[color] || 0) + weight;
                    return acc;
                }, {});

                const bestColor = Object.entries(scores)
                    .sort((a, b) => b[1] - a[1])[0]?.[0] || "grey";

                return {
                    color: bestColor
                };
            });

            return {
                [valueKey]: group[valueKey],
                uptime: group.uptimeSum / count,
                latency: group.latencySum / count,
                bars,
                checks: group.checks
            };
        });
    }

    groupByValueChange(value) {
        this.groupByValue = value;
        this.requestUpdate();
    }


    render() {
        return html`
            <div class="ik-checks-list" 
                 style="--ckl-font-size-title: ${this.fontSizeTitle}; --ckl-width: ${this.width}"
            >
                <span class="title">Checks</span>
                <ik-filters-menu 
                        fontSize=${this.fontSizeFilterBar} 
                        searchBarWidth=${this.searchBarWidth}
                        valueSelect=${this.groupByValue}
                        @ik-filter-menu:change-group=${(e) => this.groupByValueChange(e.detail.value)}
                        @ik-filter-menu:change-checkin=${(e) => _emit(this, "ik-checks-list:change-checkin", e.detail)}
                        @ik-filter-menu:change-research=${(e) => _emit(this, "ik-checks-list:change-research", e.detail)}
                ></ik-filters-menu>
                <div class="checks">
                    ${this.groupBy(this.groupByValue).map(checkGroup => 
                     html`
                        <ik-check-group 
                            type=${this.groupByValue === "domain" ? "groupByDomain" : "groupByType"}
                            fontSizeTitle=${this.fontSizeCheckTitle}
                            fontSizeValue=${this.fontSizeCheckValue}
                            domainCheck=${this.groupByValue === "domain" ? checkGroup.domain : undefined}
                            typeCheck=${this.groupByValue === "type" ? checkGroup.type : undefined}
                            uptimeCheck="${checkGroup.uptime.toFixed(0)}%"
                            latencyCheck="${checkGroup.latency.toFixed(0)}ms"
                            .barsCheck=${checkGroup.bars}
                            width=${this.groupByValue === "domain" ? this.bigCheckWidth : this.smallCheckWidth}
                        >
                            ${checkGroup.checks.map(check => html`
                                <ik-check
                                    slot="check"
                                    type=${this.groupByValue === "domain" ? "checkWithType" : "checkWithDomain"}
                                    fontSizeTitle=${this.fontSizeCheckTitle}
                                    fontSizeValue=${this.fontSizeCheckValue}
                                    nameCheck=${check.name}
                                    typeCheck=${this.groupByValue === "domain" ? check.type : undefined}
                                    domainCheck=${this.groupByValue === "type" ? check.domain : undefined}
                                    uptimeCheck="${check.uptime.toFixed(0)}%"
                                    latencyCheck="${check.latency.toFixed(0)}ms"
                                    .barsCheck=${check.bars}
                                    width=${this.groupByValue === "domain" ? this.smallCheckWidth : this.bigCheckWidth}
                                    @ik-check:click-info=${() => _emit(this, "ik-check-list:click-info", check)}
                                ></ik-check>
                            `)}
                            
                        </ik-check-group>
                    `
                    )}
                </div>
                <ik-button type="icon" 
                           icon="material-symbols:add-circle-outline-rounded" 
                           iconSize=${this.buttonSize}
                           @ik-button:click=${() => _emit(this, "ik-check-list:click-add", {})}
                ></ik-button>
            </div>
        `;
    }

    static styles = [
        css`
            .ik-checks-list {
                display: flex;
                flex-direction: column;
                align-items: center;
                color: var(--text);
                font-family: Inter, sans-serif;
                gap: 2em;
                width: var(--ckl-width);
            }

            .title {
                font-size: var(--ckl-font-size-title);
                font-family: Jura, sans-serif;
                font-weight: bold;
            }
            
            .checks {
                max-height: 60vh;
                overflow: auto;
            }
        `
    ]
}

customElements.define('ik-checks-list', IkChecksList);
