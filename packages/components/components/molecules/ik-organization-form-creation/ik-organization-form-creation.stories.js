import './ik-organization-form-creation.js';
import {html} from "lit";

export default {
    title: 'Molecules/ik-organization-form-creation',
    tags: ['autodocs'],
};

const Template = (args => {
    return html`<ik-organization-form-creation
            .fontSizeTitle=${args.fontSizeTitle}
            .fontSizeText=${args.fontSizeText}
    ></ik-organization-form-creation>`;
});

export const Default = Template.bind({});
Default.args = {
    fontSizeTitle: "50px",
    fontSizeText: "25px",
};