import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import "../import"
import iconThreePoints from '../assets/three-points.png'
import { CheckData } from '../components/domain-checks';

@customElement('check-bar')
export class Check extends LitElement {

    @property({type: Object})
    dataCheck: CheckData = {type: "",uptime: 0, responseTime: 0, data: new Array(60).fill(0)}

    buttons = new Map<string, string>([
        ['Supprimer', ""]
    ]); 
    @property()
    hideMenu = "menu hidden";


    private _onClick() {
        if(this.hideMenu == "menu hidden"){
            this.hideMenu = "menu visible";
        } else {
            this.hideMenu = "menu hidden";
        }

    }

    render() {

        return html`
        <p class="check-type">${this.dataCheck.type}</p>
        <div class="column"><p class="name-column">UPTIME</p><p class="value">${this.dataCheck.uptime}%<p></div>
        <div class="column"><p class="name-column">RESPONSE TIME</p><p class="value">${this.dataCheck.responseTime}ms<p></div>
        <bar-chart data=${JSON.stringify(this.dataCheck.data)} responseTime=${this.dataCheck.responseTime}></bar-chart>
        <a @click=${this._onClick}><img src=${iconThreePoints}></a>
        <div class=${this.hideMenu}>
                ${this.buttons?.size > 0
                    ? html `
                        ${Array.from(this.buttons.keys()).map((item) =>
                            html`
                                <button-menu text="${item}" link=${this.buttons.get(item)}/>
                            `
                        )}
                    `
                    : html`
                        <p>Aucune action disponible</p>
                    `
                }
            </div>
        `
    }

    static styles = css`
    :host {
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
    .check-type {
        font-size: large;
        color: #818181;
        width: 25%
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
        height: 100%;
        margin: 0;
    }
    img {
        height: 80%
    }
    .visible {
        visibility: visible
    }

    .hidden {
        visibility: collapse
    }

    menu {
        display: flex;
        flex-direction: row;
    }

    `
}


declare global {
    interface HTMLElementTagNameMap {
        'check-bar': Check
    }
}