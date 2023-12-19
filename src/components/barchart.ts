import { LitElement, PropertyValueMap, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import Chart from 'chart.js/auto'

interface Colour {
    red: number;
    blue: number;
    green: number;
}

function timeToColor(
    current: number,
): Colour {

    
    let time = ((current + 1)/5000)*255
    let log = 1500/(1+Math.exp(-time))

    let maxLog = 1500/(1+Math.exp(-255))

    if(log < 0) {
        log = 0
    }
    if(log > maxLog) {
        log = maxLog
    }

    let min = 0;
    let max = maxLog;
    let colorA: Colour = {red : 0, blue : 255, green : 0}
    let colorB: Colour =  {red : 255, blue : 0, green : 0}
    let color_progression;

    if (current >= max) color_progression = 1;
    else color_progression = (current - min) / (max - min);

    const newRed = colorA.red + color_progression * (colorB.red - colorA.red);
    const newGreen = colorA.green + color_progression * (colorB.green - colorA.green);
    const newBlue = colorA.blue + color_progression * (colorB.blue - colorA.blue);

    const red = Math.floor(newRed);
    const green = Math.floor(newGreen);
    const blue = Math.floor(newBlue);

    return { red, green, blue };
}

@customElement('bar-chart')
export class Bar extends LitElement {
    BAR_SIZE = 60
    MAX_VALUE = 10 
    MIN_VALUE = 0

    @property({type: Array})
    data = new Array(this.BAR_SIZE).fill(this.MIN_VALUE)

    @property({type: Array})
    dataMax = new Array(this.BAR_SIZE).fill(this.MAX_VALUE)

    @property({type: Number})
    responseTime?: number

    protected firstUpdated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
        const ctx = this.renderRoot.querySelector("canvas")?.getContext("2d");

        const responseTime = this.responseTime ?? 5000
        const color = timeToColor(responseTime)

        const colorBar = `rgba(${color.red}, ${color.green}, ${color.blue})`


        if(!ctx) {
            return;
        }

        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: this.data,
                datasets: [{
                    label: '',
                    data: this.data,
                    backgroundColor: [
                        colorBar
                    ],
                    barPercentage: 0.5
                },
                {
                    label: '',
                    data: this.dataMax,
                    backgroundColor: [
                        '#ececec',
                    ],
                    barPercentage: 0.5
                }]
            },
            options: {
                plugins: {
                    legend: {
                        display: false
                    }
                },
                events: [],
                scales: {
                    x: {
                        display: false,
                        stacked: true,
        
                    },
                    y: {
                        display: false,
                    }
                },
                aspectRatio: 6
            }
        });
    }

    render() {
        return html`
            <canvas></canvas>
        `
    }

    static styles = css`

        canvas {
            height: 100%;
        }

        
    ` 
}

declare global {
    interface HTMLElementTagNameMap {
        'bar-chart': Bar
    }
}