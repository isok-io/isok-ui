import { LitElement, css, html } from 'lit'
import { customElement } from 'lit/decorators.js'
import "../import"

@customElement('top-page')
export class TopPart extends LitElement {
    render() {
        return html`
        <div class="top">
            <a href="/" class="title">Ping Clever</a>
            <div><menu-pages buttons='{"Connection":"connection"}' /></div>
        </div>
        `
    }

    static styles = css`
    .top {
        position: relative;
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin: 1%
    }

    .title {
        text-decoration: none;
        color: black;
        font-size: xx-large;
        font-weight: bold;
        margin: 0;
    }
    `
}


declare global {
    interface HTMLElementTagNameMap {
        'top-page': TopPart
    }
}