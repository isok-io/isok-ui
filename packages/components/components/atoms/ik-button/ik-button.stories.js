import './ik-button.js';
import {html} from "lit";

export default {
    title: 'Atoms/ik-button',
    tags: ['autodocs'],
    argTypes: {
        type: {
            control: { type: 'select' },
            options: ['full', 'outlined', 'blue', 'red'],
        },
    },
};

const Template = (args) => {
    return html`<ik-button 
            .text=${args.text} 
            .width=${args.width} 
            .height=${args.height} 
            .fontSize=${args.fontSize} 
            .icon=${args.icon}
            .iconSize=${args.iconSize}
            .type=${args.type}
    ></ik-button>`;
};

export const Default = Template.bind({});
Default.args = {
    text: 'Click !',
    width: 'auto',
    height: 'auto',
    fontSize: '25px',
    icon: undefined,
    iconSize: '',
    type: 'full',
};

export const WithIcon = Template.bind({});
WithIcon.args = {
    text: 'Click !',
    width: 'auto',
    height: 'auto',
    fontSize: '25px',
    icon: 'https://www.clever-cloud.com/app/themes/Starter/assets/img/brand-assets/square-png.png',
    iconSize: '40px',
    type: 'full',
};

export const Outlined = Template.bind({});
Outlined.args = {
    text: 'Click !',
    width: 'auto',
    height: 'auto',
    fontSize: '25px',
    type: 'outlined',
};

export const Blue = Template.bind({});
Blue.args = {
    text: 'Click !',
    width: 'auto',
    height: 'auto',
    fontSize: '25px',
    type: 'blue',
};

export const Red = Template.bind({});
Red.args = {
    text: 'Click !',
    width: 'auto',
    height: 'auto',
    fontSize: '25px',
    type: 'red',
};