import {css, html, LitElement} from "lit";

class IkDiagramBar extends LitElement {
    static properties = {
        title: { type: String },
        fontSize: { type: String },
        width: { type: String },
        height: { type: String },
        bars : { type: Array },
        widthBar: { type: String },
        showData: { type: Boolean },
        dataSize: { type: String },
    };

    constructor() {
        super();
        this.title = undefined;
        this.fontSize = '20px';
        this.bars = []
        this.width = '245px'
        this.height = '50px'
        this.widthBar = '7px'
        this.showData = false;
        this.hoveredBar = null;
        this.dataSize = '15px';
    }

    handleMouseEnter(bar) {
        this.hoveredBar = bar;
        this.requestUpdate();
    }

    handleMouseLeave() {
        this.hoveredBar = null;
        this.requestUpdate();
    }

    render() {
        return html`
            <div class="ik-diagram-bar">
                ${this.title ? html`<span class="title" style="--dgb-font-size: ${this.fontSize}; ">${this.title}</span>` : ''}
                <div class="bars" 
                     style="
                         --dgb-width: ${this.width}; 
                         --dgb-height: ${this.height};
                         --dgb-width-bar: ${this.widthBar};
                     "
                >
                    ${this.bars.map(bar => html`
                        <div 
                                class="bar ${bar.color}"
                                @mouseenter="${() => this.handleMouseEnter(bar)}"
                                @mouseleave="${this.handleMouseLeave}"
                        ></div>
                    `)}
                </div>
                ${this.showData ? html`
                    <div class="data" style="--dgb-data-size: ${this.dataSize}">
                        <ul>
                            ${this.hoveredBar?.data.map(d => html`<li>${d}</li>`)}
                        </ul>
                    </div>
                ` : html``}
            </div>
            `
    }


    static styles = [
        css`
            .ik-diagram-bar {
                display: flex;
                flex-direction: column;
                gap: 0.3em;
            }
            
            .bars {
                width: var(--dgb-width);
                height: var(--dgb-height);
                display: flex;
                flex-direction: row;
                justify-content: space-between;
            }

            .bar {
                width: var(--dgb-width-bar);
                border-radius: 4px;
            }
            
            .bar.green {
                background-color: var(--bar-green);
            }
            .bar.yellow {
                background-color: var(--bar-yellow);
            }
            .bar.red {
                background-color: var(--bar-red);
            }
            .title {
                color: var(--text);
                font-family: Jura,sans-serif;
                font-size: var(--dgb-font-size);
            }
            .data {
                color: var(--text);
                font-family: Jura,sans-serif;
                font-size: var(--dgb-data-size);
            }
            
            .data ul {
                margin: 0;
                padding-inline: 1em;
            }
        `
    ];
}

customElements.define('ik-diagram-bar', IkDiagramBar);