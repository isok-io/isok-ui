import './ik-check-form-post-creation.js';
import {html} from "lit";

export default {
    title: 'Molecules/Checks/ik-check-form-post-creation',
    tags: ['autodocs'],
};

const Template = (args) => {
    return html`<ik-check-form-post-creation
            .typeCheck=${args.typeCheck}
            .fontSizeTitle=${args.fontSizeTitle}
            .fontSizeText=${args.fontSizeText}
            .width=${args.width}
            .zoneOptions=${args.zoneOptions}
    ></ik-check-form-post-creation>`;
};

export const HTTP = Template.bind({});
HTTP.args = {
    typeCheck: "HTTP",
    fontSizeTitle: "50px",
    fontSizeText: "25px",
    width: "660px",
    zoneOptions: [{value: "pau", label: "Pau"}, {value: "toulouse", label: "Toulouse"}],
};