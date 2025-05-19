import './ik-check-form-post-creation.js';
import {html} from "lit";

export default {
    title: 'Molecules/ik-check-form-post-creation',
    tags: ['autodocs'],
};

const Template = (args) => {
    return html`<ik-check-form-post-creation
            .typeCheck=${args.typeCheck}
            .fontSizeTitle=${args.fontSizeTitle}
            .fontSizeText=${args.fontSizeText}
            .width=${args.width}
    ></ik-check-form-post-creation>`;
};

export const HTTP = Template.bind({});
HTTP.args = {
    typeCheck: "HTTP",
    fontSizeTitle: "50px",
    fontSizeText: "25px",
    width: "660px"
};