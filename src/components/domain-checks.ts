import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import "../import"
import arrowUp from "../assets/up-arrow.png"
import arrowDown from "../assets/down-arrow.png"

export interface CheckData {
    type: string,
    uptime: number,
    responseTime: number,
    data: number[]
}

export interface DomainCheckData {
    name: string,
    path: string,
    uptime: number,
    responseTime: number,
    data: number[],
    checks: CheckData[]
}

@customElement('domain-bar')
export class DomainBar extends LitElement {

    @property()
    accordeonClass = "accordeon hidden";
    @property()
    iconArrow = arrowDown;

    @property({type: Object})
    dataDomain: DomainCheckData = {
        name: "", 
        path: "", 
        uptime: 0, 
        responseTime: 0, 
        data: new Array(60).fill(0),
        checks: []
    }

    private _onClick() {
        if (this.accordeonClass == "accordeon hidden") {
            this.iconArrow = arrowUp;
            this.accordeonClass = "accordeon visible";
        } else {
            this.iconArrow = arrowDown;
            this.accordeonClass = "accordeon hidden";
        }

    }

    render() {
        return html`
        <div class="domain-bar">
            <div class="domain-name"><p class="name-column">${this.dataDomain.name}</p><p class="value">${this.dataDomain.path}<p></div>
            <div class="column"><p class="name-column">UPTIME</p><p class="value">${this.dataDomain.uptime}%<p></div>
            <div class="column"><p class="name-column">RESPONSE TIME</p><p class="value">${this.dataDomain.responseTime}ms<p></div>
            <bar-chart data=${JSON.stringify(this.dataDomain.data)} responseTime=${this.dataDomain.responseTime}></bar-chart>
            <a><img src=${this.iconArrow} @click=${this._onClick}></a>
        </div>
        <div class=${this.accordeonClass}>
            <div class="checks">
                ${Array.from(this.dataDomain.checks).map((item) =>
            html`
                        <check-bar dataCheck=${JSON.stringify(item)}></check-bar>
                    `
        )}
            <div>
        </div>
        <hr color="#b8b8b8" size=1 />
        `
    }

    static styles = css`
    .domain-bar {
        height: 2.5rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 1%
    }
    div {
        text-align: center;
    }
    .column {
        width: 18%
    }
    .domain-name {
        width: 25%;
        text-align: start;
    }
    p {
        margin: 0;
        padding: 0;
    }
    .name-column {
        font-size: small;
        font-weight: bold;
    }
    bar-chart {
        width: 40%;
        margin-left: 1rem;
        margin-bottom: 2%
    }
    .value {
        color: #818181;
    }
    a {
        height: 50%;
        margin: 0.5rem;
    }
    img {
        height: 100%
    }
    .accordeon {
        display: flex;
        flex-direction: column;
        align-items: center;
        visibility: 
    }
    .checks {
        width: 90%;
        display: flex;
        flex-direction: column;
        align-items: center;
        border-right: solid 1px #818181;
        border-left: solid 1px #818181;
        border-bottom: solid 1px #818181;
        margin-bottom: 2%;
        border-radius: 20px;
        overflow:hidden;
    }
    .visible {
        visibility: visible;
        transform: scaleY(1);
        transform-origin: top;
        transition: all 1s ease;
    }
    .hidden {
        visibility: collapse;
        transform: scaleY(0);    
        transform-origin: top;
        transition: all 1s ease;
    }

    .checks check-bar {
        width: 95%
    }
    `
}


declare global {
    interface HTMLElementTagNameMap {
        'domain-bar': DomainBar
    }
}