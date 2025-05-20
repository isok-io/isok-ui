import {css, html, LitElement} from "lit";
import "../../other/ik-filters-menu/ik-filters-menu"
import "../ik-check-group/ik-check-group"
import "../ik-check/ik-check"

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
        const uptimeToColor = (uptime) => {
            if (uptime < 50) return 'red';
            if (uptime < 80) return 'yellow';
            return 'green';
        };

        const grouped = {};

        for (const check of this.checks) {
            const key = check[valueKey];
            if (!grouped[key]) {
                grouped[key] = {
                    [valueKey]: key,
                    checks: [],
                    uptimeSum: 0,
                    responseTimeSum: 0,
                    barsUptimeLists: []
                };
            }

            const coloredBars = check.bars.map(bar => ({
                color: uptimeToColor(bar.uptime)
            }));

            const checkWithColoredBars = {
                ...check,
                bars: coloredBars
            };

            grouped[key].checks.push(checkWithColoredBars);
            grouped[key].uptimeSum += check.uptime;
            grouped[key].responseTimeSum += check.responseTime;

            check.bars.forEach((bar, index) => {
                if (!grouped[key].barsUptimeLists[index]) {
                    grouped[key].barsUptimeLists[index] = [];
                }
                grouped[key].barsUptimeLists[index].push(bar.uptime);
            });
        }

        return Object.values(grouped).map(group => {
            const count = group.checks.length;

            const bars = group.barsUptimeLists.map(uptimeList => {
                const avg = uptimeList.reduce((a, b) => a + b, 0) / uptimeList.length;
                return { color: uptimeToColor(avg) };
            });

            return {
                [valueKey]: group[valueKey],
                uptime: group.uptimeSum / count,
                responseTime: group.responseTimeSum / count,
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
                        @group-change=${(e) => this.groupByValueChange(e.detail.value)}
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
                            responseTimeCheck="${checkGroup.responseTime.toFixed(0)}ms"
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
                                    responseTimeCheck="${check.responseTime.toFixed(0)}ms"
                                    .barsCheck=${check.bars}
                                    width=${this.groupByValue === "domain" ? this.smallCheckWidth : this.bigCheckWidth}
                                ></ik-check>
                            `)}
                            
                        </ik-check-group>
                    `
                    )}
                </div>
                <ik-button type="icon" icon="material-symbols:add-circle-outline-rounded" iconSize=${this.buttonSize}></ik-button>
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
                max-height: 70vh;
                overflow: auto;
            }
        `
    ]
}

customElements.define('ik-checks-list', IkChecksList);
