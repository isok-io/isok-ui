import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'

@customElement('popup-new-check')
export class PopupNewCheck extends LitElement {

    @property({type: Boolean })
    popupHide?: Boolean;

    private _onClick() {
        this.dispatchEvent(new CustomEvent("popup-closed", { bubbles: true, composed: true }))
    }

    @property()
    typeCheck = "DNS"

    private onChange(e: Event) {
        //@ts-ignore
        this.typeCheck = e.target.value;
    }

    render() {
        const visible = html`
            <style>
                :host {
                    visibility: visible
                }
            </style>
        `

        const invisible = html`
            <style>
                :host {
                    visibility: collapse
                }
            </style>
            `

        const dnsFields = html`
            <input type="text" id="domain" class="long" name="domain" placeholder="domain" />
            <input type="text" id="dns_server" class="long" name="dns_server" placeholder="dns server" />
        `

        const icmpFields = html`
            <input type="text" id="host" class="long" name="host" placeholder="host" />
        `

        const httpFields = html`
            <input type="text" id="uri" class="long" name="uri" placeholder="uri" />
            <textarea id="headers" class="long" name="headers" placeholder="headers\n\nexemple:\n'Cache-Control': 'max-age=0','Connection': 'keep-alive'"></textarea>
        `

        const tcpFields = html`
            <input type="text" id="host" class="long" name="host" placeholder="host" />
            <input type="number" id="port" class="short" name="port" placeholder="port" />
        `

        const typeCheckFields = () => {
            switch (this.typeCheck){
                case "DNS": return dnsFields; 
                case "ICMP": return icmpFields; 
                case "HTTP": return httpFields; 
                case "TCP": return tcpFields;
            }
        }

        const visibility = (this.popupHide)? invisible: visible
        return html`
        ${visibility}
        <div class="head">
            <button class="close" @click=${this._onClick}>x</button>
            <h1>Check creation</h1>
        </div>
        <form>
            <h2>General informations</h1>
            <div class="unit ms">
                <input type="number" id="max_latency" name="max_latency" placeholder="max latency" />
            </div>
            <div class="unit s">
                <input type="number" id="interval" name="interval" placeholder="interval" />
            </div>
            <input type="text" id="region" class="short" name="region" placeholder="region" />

            <h2>Type of check</h1>
            <select @change="${this.onChange}">
                <option valeur="dns">DNS</option>
                <option valeur="icmp">ICMP</option>
                <option valeur="http">HTTP</option>
                <option valeur="tcp">TCP</option>
            </select>
            ${typeCheckFields()}
            <button type="submit">Register</button>
        </form>
        
        `;
    }

    static styles = css`
        :host {
            background-color: white;
            box-shadow: 0 30px 60px 0 rgba(0,0,0,0.3);
            border-radius: 10px 10px 10px 10px;
        }
        .head {
            display: flex;
            flex-direction: row;
        }
        h1 {
            width: 80%;
        }
        .close {
            border: 0;
            background-color: white;
            font-size: x-large;
            margin: 2%;
            width: 10%
        }
        
        .unit {
            display: inline-block;
            position: relative;
        }
  
        .unit::after {
            position: absolute;
            top: 30%;
        }
        .s::after {
            content: 's';
            right: -1rem;
        }
        .ms::after {
            content: 'ms';
            right: -1.5rem;
        }
        form {
            display: flex;
            flex-direction: column;
            align-items: center
        }

        form input, select, textarea {
        
            background-color: #f6f6f6;
            border: none;
            color: #0d0d0d;
            padding: 15px 32px;
            text-align: center;
            text-decoration: none;
            display: inline-block;
            font-size: 16px;
            margin: 5px;
            width: 85%;
            border: 2px solid #f6f6f6;
            border-radius: 5px 5px 5px 5px;
        }

        button[type="submit"] {
            background-color: #56baed;
            border: none;
            color: white;
            padding: 15px 80px;
            text-align: center;
            text-decoration: none;
            display: inline-block;
            text-transform: uppercase;
            font-size: 13px;
            box-shadow: 0 10px 30px 0 rgba(95,186,233,0.4);
            border-radius: 5px 5px 5px 5px;
            margin: 5px 20px 40px 20px;
        }

        button[type="submit"]:hover {
            background-color: #39ace7;
        }

        *:focus {
            outline: none;
        }

        input:focus, select:focus, textarea:focus {
            background-color: #fff;
            border-bottom: 2px solid #5fbae9;
        }

        
        form div[class="unit"], .short {
            width: 40%;
        }

        textarea {
            min-height: 6rem
        }

        .long {
            width: 60%
        }

        select {
            width: 20%
        }
    `
}

declare global {
    interface HTMLElementTagNameMap {
        'popup-new-check': PopupNewCheck
    }
}