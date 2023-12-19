import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import menuIcon from '../assets/menu.png'

@customElement('menu-pages')
export class Menu extends LitElement {

    @property({
        type: Object, 
        converter: (value, _) => (
            new Map(Object.entries(JSON.parse(value ?? '')))
        )
    })
    buttons = new Map<string, string>([
        ['Google', "https://www.google.com"],
        ['Youtube', "https://www.youtube.com/"]
    ]); 
    
    @property()
    hideMenu = "innerMenu hidden";

    private _onClick() {
        if(this.hideMenu == "innerMenu hidden"){
            this.hideMenu = "innerMenu visible";
        } else {
            this.hideMenu = "innerMenu hidden";
        }

    }


    render() {       
        return html`
        <div class="menu">
            <div class="button-menu">menu<button @click=${this._onClick}><img src=${menuIcon} /></button></div>
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
                        <p>Aucune page disponible</p>
                    `
                }
            </div>
        </div>
        `;
    }

    static styles = css`

    .menu {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .button-menu {
        height: 5vh;
        display: flex;
        align-items: center;
        font-size: 200%;
    }

    .button-menu button {
        background: none;
	    color: inherit;
	    border: none;
        margin: 10%;
        height: 100%;
    }

    .button-menu button img {
        height: 100%
    }

    .innerMenu {
        transition: all .3s ease;
        margin: 2vh;
        width: 10vw;
        box-shadow: 0 0 1em black;
        border-radius: 5px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .visible {
        opacity: 1;
    }

    .hidden {
        opacity: 0;
        top: -30%;
        transform:translateY(-30%);
    }

    .innerMenu button-menu {
        margin: 0 auto;
        display: flex;
        justify-content: center;
        width: 100%
    }

    .hidden button-menu {
        pointer-events: none;
    }

    `
}

declare global {
    interface HTMLElementTagNameMap {
      'menu-pages': Menu
    }
}


