import './ik-check';
import {html} from "lit";

export default {
    title: 'Molecules/ik-check',
    tags: ['autodocs'],
    argTypes: {
        type: {
            control: { type: 'select' },
            options: ['checkWithType', 'checkWithDomain'],
        },
    },
};

const Template = (args) => {
    return html`<ik-check 
            .type=${args.type}
            .fontSizeTitle=${args.fontSizeTitle}
            .fontSizeValue=${args.fontSizeValue}
            .nameCheck=${args.nameCheck}
            .typeCheck=${args.typeCheck}
            .domainCheck=${args.domainCheck}
            .uptimeCheck=${args.uptimeCheck}
            .responseTimeCheck=${args.responseTimeCheck}
            .barsCheck=${args.barsCheck}
            .width=${args.width}
    ></ik-check>`;
};

export const Default = Template.bind({});
Default.args = {
    type : 'checkWithType',
    fontSizeTitle: "16px",
    fontSizeValue: "24px",
    nameCheck : 'My check',
    typeCheck: 'HTTP',
    uptimeCheck: "80%",
    responseTimeCheck: "300ms",
    barsCheck:
        Array.from({ length: 20 }, () => ({
            color: 'yellow',
        })),
    width: '60em'
};

export const withDomain = Template.bind({});
withDomain.args = {
    type : 'checkWithDomain',
    fontSizeTitle: "16px",
    fontSizeValue: "24px",
    nameCheck : 'My check',
    domainCheck: 'http://domain-exemple',
    uptimeCheck: "80%",
    responseTimeCheck: "300ms",
    barsCheck:
        Array.from({ length: 20 }, () => ({
            color: 'yellow',
        })),
    width: '70em'
};