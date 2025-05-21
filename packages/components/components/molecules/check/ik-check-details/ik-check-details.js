import {css, html, LitElement} from "lit";
import "../../../atoms/ik-button/ik-button";
import "../../other/ik-details-display/ik-details-display"
import "../../../atoms/ik-diagram-bar/ik-diagram-bar"
import { Chart, registerables } from 'chart.js';
import {_emit} from "../../../../utils/event";
Chart.register(...registerables);

class IkCheckDetails extends LitElement {
    static properties = {
        fontSizeTitle: { type: String },
        fontSizeText: { type: String },
        fontSizeSmallText: { type: String },
        width: { type: String },
        heightBars: { type: String },
        data: { type: Object}
    }


    constructor() {
        super();
        this.fontSizeTitle = "50px";
        this.fontSizeText = "25px";
        this.fontSizeSmallText = "20px";
        this.width = "660px";
        this.heightBars = "5em";
        this.data = {
            name: undefined,
            type: undefined,
            domain: undefined,
            uptime: undefined,
            responseTime: undefined,
            bars: [],
            latency: []
        }
    }

    firstUpdated() {
        const ctx = this.shadowRoot.getElementById('latencyChart').getContext('2d');
        const dataPoints = this.data?.latency?.map((latency, index) => ({
            x: index,
            y: latency
        })) || [];
        const bgColor = getComputedStyle(this).getPropertyValue('--text-blue').trim();
        const textColor = getComputedStyle(this).getPropertyValue('--text').trim();

        new Chart(ctx, {
            type: 'line',
            data: {
                datasets: [{
                    label: 'Latency',
                    data: dataPoints,
                    fill: true,
                    backgroundColor: bgColor,
                    borderColor: 'transparent',
                    tension: 0.4,
                }]
            },
            options: {
                responsive: true,
                scales: {
                    x: {
                        type: 'linear',
                        display: false
                    },
                    y: {
                        display: false
                    }
                },
                plugins: {
                    legend: { display: false },
                    title: {
                        display: true,
                        text: 'Latency',
                        font: {
                            family: 'Jura',
                            size: this.fontSizeText,
                            weight: 'bold'
                        },
                        color: textColor,
                        padding: { top: 10, bottom: 30 },
                        align: 'start'
                    }
                }
            }
        });
    }

    transformData(){
        return Object.entries(this.data)
            .filter(([key]) => key !== 'name' && key !== 'bars' && key !== 'latency')
            .map(([key, value]) => ({
                title: key.replace(/([A-Z])/g, ' $1'),
                value: value
            }));
    }

    render() {
        return html`
            <div class="ik-check-details"
                style="
                    --cd-font-size-title: ${this.fontSizeTitle};
                    --cd-width: ${this.width};
                "
            >
                <div class="title-zone">
                    <span class="title">${this.data.name}</span>
                    <ik-button type="icon" 
                               icon="material-symbols:edit-square-outline-rounded" 
                               iconSize=${this.fontSizeText}
                               @ik-button="${() => _emit(this, 'ik-check-details:click-edit', {check: this.data})}"
                    ></ik-button>
                </div>
                <ik-details-display 
                        .data=${this.transformData()}
                        .fontSizeTitle=${this.fontSizeSmallText}
                        .fontSizeValue=${this.fontSizeText}
                ></ik-details-display>
                <ik-diagram-bar 
                        title="All checks"
                        fontSize=${this.fontSizeText}
                        .bars=${this.data.bars}
                        .showData=${true}
                        dataSize=${this.fontSizeText}
                        width=${this.width}
                        height=${this.heightBars}
                ></ik-diagram-bar>
                <canvas id="latencyChart" width=${this.width} height="200"></canvas>
                <ik-button type="red" 
                           width="auto" 
                           height="auto" 
                           text="Delete check" 
                           fontSize=${this.fontSizeSmallText}
                           @ik-button:click=${() => _emit(this, "ik-check-details:click-delete", {check: this.data})}}
                ></k-button>
            </div>
        `;
    }


    static styles = [
        css`
            .ik-check-details {
                display: flex;
                flex-direction: column;
                width: var(--cd-width);
                color: var(--text);
                align-items: center;
                gap: 2em;
            }
            
            .title-zone {
                display: flex;
            }
            
            .title {
                font-size: var(--cd-font-size-title);
                font-family: Jura, sans-serif;
            }
            
        `
    ];
}

customElements.define('ik-check-details', IkCheckDetails);