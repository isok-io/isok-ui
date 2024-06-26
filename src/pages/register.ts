import { LitElement, html, css } from 'lit'
import { customElement } from 'lit/decorators.js'

@customElement('register-page')
export class Register extends LitElement {

  

  render() {
    return html`

      <div class="wrapper fadeInDown">
        <div id="formContent">
          <!-- Tabs Titles -->
          <a class="inactive underlineHover" href="/connection"> Sign In </a>
          <a class="active">Sign Up </a>

         

          <!-- Login Form -->
          <form>
            <input type="text" id="username" class="fadeIn second" name="username" placeholder="username">
            <input type="email" id="email" class="fadeIn third" name="email" placeholder="email">
            <input type="password" id="password" class="fadeIn fourth" name="login" placeholder="password">
            <input type="password" id="passwordConfirmation" class="fadeIn fifth" name="loginConfirmation" placeholder="password confirmation">
            <input type="submit" class="fadeIn sixth" value="Register">
          </form>

        </div>
      </div>
    `;
  }

  static styles = css`

    a {
      text-decoration: none;
      text-align: center;
      font-size: 130%;
      font-weight: 600;
      text-transform: uppercase;
      display: inline-block;
      margin: 40px 8px 10px 8px; 
      color: #cccccc;
    }


    .wrapper {
      display: flex;
      align-items: center;
      flex-direction: column; 
      justify-content: center;
      width: 100%;
      padding: 20px;
    }

    #formContent {
      border-radius: 10px 10px 10px 10px;
      background: #fff;
      padding: 30px;
      width: 90%;
      max-width: 450px;
      position: relative;
      padding: 0px;
      box-shadow: 0 30px 60px 0 rgba(0,0,0,0.3);
      text-align: center;
    }

    a.inactive {
      color: #cccccc;
    }

    a.active {
      color: #0d0d0d;
      border-bottom: 2px solid #5fbae9;
    }

    input[type=button], input[type=submit], input[type=reset]  {
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
      transition: all 0.3s ease-in-out;
    }

    input[type=button]:hover, input[type=submit]:hover, input[type=reset]:hover  {
      background-color: #39ace7;
    }

    input[type=button]:active, input[type=submit]:active, input[type=reset]:active  {
      transform: scale(0.95);
    }

    input[type=text],input[type=email], input[type=password] {
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
      transition: all 0.5s ease-in-out;
      border-radius: 5px 5px 5px 5px;
    }

    input[type=text]:focus, input[type=email]:focus, input[type=password]:focus {
      background-color: #fff;
      border-bottom: 2px solid #5fbae9;
    }

    .fadeInDown {
      animation-name: fadeInDown;
      animation-duration: 1s;
      animation-fill-mode: both;
    }

    @keyframes fadeInDown {
      0% {
        opacity: 0;
        -webkit-transform: translate3d(0, -100%, 0);
        transform: translate3d(0, -100%, 0);
      }
      100% {
        opacity: 1;
        -webkit-transform: none;
        transform: none;
      }
    }

    @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }

    .fadeIn {
      opacity:0;
      animation:fadeIn ease-in 1;
      animation-fill-mode:forwards;
      animation-duration:1s;
    }

    .fadeIn.first {
      animation-delay: 0.4s;
    }

    .fadeIn.second {
      animation-delay: 0.6s;
    }

    .fadeIn.third {
      animation-delay: 0.8s;
    }

    .fadeIn.fourth {
      animation-delay: 1s;
    }

    .fadeIn.fifth {
        animation-delay: 1.2s
    }

    .fadeIn.sixth {
        animation-delay: 1.4s
    }

    .underlineHover:after {
      display: block;
      left: 0;
      bottom: -10px;
      width: 0;
      height: 2px;
      background-color: #56baed;
      content: "";
      transition: width 0.2s;
    }

    .underlineHover:hover {
      color: #0d0d0d;
    }

    .underlineHover:hover:after{
      width: 100%;
    }

    *:focus {
        outline: none;
    }

    * {
      box-sizing: border-box;
    }
  `
}