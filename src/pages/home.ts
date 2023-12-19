
import { LitElement, html, css } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { DomainCheckData } from '../components/domain-checks';

@customElement('home-page')
export class Home extends LitElement {

  @property({ reflect: true })
  popupHide: Boolean = true;

  private _onClick() {
      this.popupHide = false;
  }
  
  render() {

    const domainExemple: DomainCheckData = {
      name: "domain exemple",
      path: "http://domain-exemple",
      responseTime: 300,
      uptime: 100,
      data: new Array(60).fill(100),
      checks: [
        {type: "HTTP", uptime: 100, responseTime: 500,data: new Array(60).fill(10)},
        {type: "TCP",uptime: 80, responseTime: 1000,data: new Array(60).fill(8)},
        {type: "DNS",uptime: 50, responseTime: 2000,data: new Array(60).fill(5)}
      ]
    }

    return html`
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

      <h1>Checks</h1>
      <domain-bar dataDomain=${JSON.stringify(domainExemple)}></domain-bar>

      <popup-new-check ?popupHide=${this.popupHide} @popup-closed=${this._onClosed}></popup-new-check>

      <button class="btn" @click=${this._onClick}><i class="fa fa-plus"></i></button>
      
    `;
  }

  _onClosed() {
    this.popupHide = true;
  }

  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    h1 {
      font-size: xxx-large;
    }

    domain-bar {
      width: 60%;
      min-width: 50rem;
    }

    .btn {
      width: 3rem;
      height: 3rem;
      border-radius: 50%;
      font-size: xx-large;
      background-color: white;
      border: solid 1px #bfbfbf;
      margin: 2%;
    }

    .btn:hover {
      background-color: #bfbfbf;
    }

    popup-new-check {
      position: fixed;
      top: 50%;
      transform: translateY(-50%);
      min-width: 30rem;
      width: 50%;
    }
  `
}
