import './ik-button.js';
import {html} from "lit";

export default {
    title: 'Atoms/ik-button',
    tags: ['autodocs'],
};

const Template = (args) => {
    return html`<ik-button .text=${args.text}></ik-button>`;
};

export const Default = Template.bind({});
Default.args = {
    text: 'Click !',
};
