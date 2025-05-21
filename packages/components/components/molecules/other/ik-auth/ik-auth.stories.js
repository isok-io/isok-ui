import './ik-auth.js';
import {html} from "lit";

export default {
    title: 'Molecules/Other/ik-auth',
    tags: ['autodocs'],
    argTypes: {
        type: {
            control: { type: 'select' },
            options: ['login-menu', 'signup-menu', 'login-form', 'signup-form'],
        },
        align: {
            control: { type: 'select' },
            options: ['left', 'center'],
        },
        methods: {
            control: { type: 'multi-select' },
            options: ['ep', 'cc','gh','g'],
        },
    },
};

const Template = (args, { globals }) => {
    return html`<ik-auth 
            .type=${args.type}
            .theme=${globals.theme}
            .fontSizeTitle=${args.fontSizeTitle}
            .fontSizeText=${args.fontSizeText}
            .buttonWidth=${args.buttonWidth}
            .buttonHeight=${args.buttonHeight}
            .align=${args.align}
            .methods=${args.methods}
    ></ik-auth>`;
};

export const Default = Template.bind({});
Default.args = {
    type: 'login-menu',
    fontSizeTitle: "80px",
    fontSizeText: "25px",
    buttonWidth: "16em",
    buttonHeight: "2.8em",
    align: 'center',
    methods: ['ep','cc','gh','g']
};

export const Signup = Template.bind({});
Signup.args = {
    type: 'signup-menu',
    fontSizeTitle: "80px",
    fontSizeText: "25px",
    buttonWidth: "16em",
    buttonHeight: "2.8em",
    align: 'center',
    methods: ['ep','cc','gh','g']
};

export const LoginForm = Template.bind({});
LoginForm.args = {
    type: 'login-form',
    fontSizeTitle: "80px",
    fontSizeText: "25px",
    buttonWidth: "16em",
    buttonHeight: "2.8em",
    align: 'center'
};

export const SignupForm = Template.bind({});
SignupForm.args = {
    type: 'signup-form',
    fontSizeTitle: "80px",
    fontSizeText: "25px",
    buttonWidth: "16em",
    buttonHeight: "2.8em",
    align: 'center'
};