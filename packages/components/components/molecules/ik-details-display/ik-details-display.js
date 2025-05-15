import {css, html, LitElement} from "lit";
import "../../atoms/ik-title/ik-title"

class IkDetailsDisplay extends LitElement {
    static properties = {
        data: {type: Array},
        fontSizeTitle: {type: String},
        fontSizeValue: {type: String},
        width: {type: String},
    }


    constructor() {
        super();
        this.data = []
        this.fontSizeTitle = "20px"
        this.fontSizeValue = "40px";
        this.width = "auto"
    }



    render() {
        return html`
            <div class="ik-details-display" 
                 style="
                    --dtd-width:${this.width};
                "
            >
                ${ this.data.map(item => {
                    return html`
                        <ik-title 
                                .title=${item.title} 
                                .subtitle=${item.value} 
                                align="center"
                                .fontSizeTitle=${item.fontSizeTitle ? item.fontSizeTitle : this.fontSizeTitle}
                                .fontSizeSubtitle=${item.fontSizeValue ? item.fontSizeValue :this.fontSizeValue}
                        ></ik-title>
                    `
                })}
            </div>
        `;
    }


    static styles = [
        css`
            .ik-details-display {
                display: flex;
                flex-direction: column;
                align-items: center;
                width: var(--dtd-width);
                gap: 2em;
            }
            
        `
    ];
}

customElements.define('ik-details-display', IkDetailsDisplay);