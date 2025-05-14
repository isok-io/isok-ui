import {css, html, LitElement} from "lit";

class IkTitle extends LitElement {
    static properties = {
        title: {type: String},
        subtitle: {type: String},
        align: {type: String},
        fontSizeTitle: { type: String },
        fontSizeSubtitle: { type: String },
    };

    constructor() {
        super();
        this.title = undefined;
        this.subtitle = undefined;
        this.align = 'left';
        this.fontSizeTitle = '16px';
        this.fontSizeSubtitle = '24px';
    }

    render() {
        return html`
            <div 
                    class="ik-title ${this.align}"
                    style="
                        --tle-font-size-title: ${this.fontSizeTitle};
                        --tle-font-size-subtitle: ${this.fontSizeSubtitle};
                    "
            >
                ${ this.title ? html`<span class="title">${this.title}</span>` : '' }
                ${ this.subtitle ? html`<span class="subtitle">${this.subtitle}</span>` : '' }
            </div>
        `;
    }


    static styles = [
        css`
            .ik-title {
                display: flex;
                flex-direction: column;
                gap: 0.5em;
                font-family: Inter, sans-serif;
            }
            
            .ik-title.left {
                align-items: flex-start;
            }

            .ik-title.center {
                align-items: center;
            }

            .ik-title.right {
                align-items: flex-end;
            }
            
            .ik-title .title {
                font-size: var(--tle-font-size-title);
                font-weight: bold;
                color: var(--text)
            }
            
            .ik-title .subtitle {
                font-size: var(--tle-font-size-subtitle);
                color: var(--subtext);
            }
        `
    ]
}

customElements.define('ik-title', IkTitle);