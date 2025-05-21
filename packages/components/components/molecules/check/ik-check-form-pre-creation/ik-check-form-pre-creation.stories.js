import './ik-check-form-pre-creation.js';
import {html} from "lit";

export default {
    title: 'Molecules/Checks/ik-check-form-pre-creation',
    tags: ['autodocs'],
};

const Template = (args) => {
    return html`<ik-check-form-pre-creation 
            .fontSizeTitle=${args.fontSizeTitle}
            .fontSizeText=${args.fontSizeText}
            .width=${args.width}
            .checksType=${args.checksType}
    ></ik-check-form-pre-creation>`;
};

export const HTTP = Template.bind({});
HTTP.args = {
    fontSizeTitle: "50px",
    fontSizeText: "25px",
    width: "660px",
    checksType: ["HTTP", "PING", "SSL", "UDP", "TCP"]
};