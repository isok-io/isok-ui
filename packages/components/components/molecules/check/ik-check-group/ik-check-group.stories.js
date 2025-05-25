import './ik-check-group';
import {html} from "lit";
import "../ik-check/ik-check"

export default {
    title: 'Molecules/Checks/ik-check-group',
    tags: ['autodocs'],
    argTypes: {
        type: {
            control: { type: 'select' },
            options: ['groupByDomain', 'groupByType'],
        },
    },
};

const Template = (args) => {
    return html`<ik-check-group
            .type=${args.type}
            .fontSizeTitle=${args.fontSizeTitle}
            .fontSizeValue=${args.fontSizeValue}
            .typeCheck=${args.typeCheck}
            .domainCheck=${args.domainCheck}
            .uptimeCheck=${args.uptimeCheck}
            .latencyCheck=${args.latencyCheck}
            .barsCheck=${args.barsCheck}
            .width=${args.width}
    >
        <ik-check 
            slot="check"
            .type=${args.checksType}
            .fontSizeTitle=${args.fontSizeTitle}
            .fontSizeValue=${args.fontSizeValue}
            nameCheck="My check"
            typeCheck="HTTP"
            domainCheck="http://domain-exemple"
            uptimeCheck="80%"
            latencyCheck="300ms"
            .barsCheck=${args.barsCheck}
            width="70em"
        ></ik-check>
        <ik-check
            slot="check"
            .type=${args.checksType}
            .fontSizeTitle=${args.fontSizeTitle}
            .fontSizeValue=${args.fontSizeValue}
            nameCheck="My check"
            typeCheck="HTTP"
            domainCheck="http://domain-exemple"
            uptimeCheck="80%"
            latencyCheck="300ms"
            .barsCheck=${args.barsCheck}
            width="70em"
        ></ik-check>
    </ik-check-group>`;
};

export const Default = Template.bind({});
Default.args = {
    type : 'groupByDomain',
    fontSizeTitle: "16px",
    fontSizeValue: "24px",
    nameCheck : 'My check',
    domainCheck: 'http://domain-exemple',
    uptimeCheck: "80%",
    latencyCheck: "300ms",
    barsCheck:
        Array.from({ length: 20 }, () => ({
            color: 'yellow',
        })),
    width: '60em',
    checksType: 'checkWithType'
};

export const groupByType = Template.bind({});
groupByType.args = {
    type : 'groupByType',
    fontSizeTitle: "16px",
    fontSizeValue: "24px",
    typeCheck: 'HTTP',
    uptimeCheck: "80%",
    latencyCheck: "300ms",
    barsCheck:
        Array.from({ length: 20 }, () => ({
            color: 'yellow',
        })),
    width: '50em',
    checksType: 'checkWithDomain'
};