import './ik-button.js';
import {html} from "lit";

export default {
    title: 'Atoms/ik-button',
    tags: ['autodocs'],
    argTypes: {
        type: {
            control: { type: 'select' },
            options: ['full', 'outlined', 'blue', 'red', 'icon'],
        },
    },
};

const Template = (args) => {
    return html`<ik-button 
            .text=${args.text} 
            .width=${args.width} 
            .height=${args.height} 
            .fontSize=${args.fontSize} 
            .img=${args.img}
            .icon=${args.icon}
            .iconSize=${args.iconSize}
            .type=${args.type}
            .align=${args.align}
    ></ik-button>`;
};

export const Default = Template.bind({});
Default.args = {
    text: 'Click !',
    width: 'auto',
    height: 'auto',
    fontSize: '25px',
    img: undefined,
    icon: undefined,
    iconSize: '',
    type: 'full',
    align: 'center',
};

export const WithImg = Template.bind({});
WithImg.args = {
    text: 'Click !',
    width: 'auto',
    height: 'auto',
    fontSize: '25px',
    img: 'https://www.clever-cloud.com/app/themes/Starter/assets/img/brand-assets/square-png.png',
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

const TemplateIcon = (args) => {
    return html`
        <div style="display: flex; flex-direction: row">
            <ik-button 
                .text=${args.text} 
                .width=${args.width} 
                .height=${args.height} 
                .fontSize=${args.fontSize} 
                .icon=${args.icon}
                .iconSize=${args.iconSize}
                .type=${args.type}
            ></ik-button>
            <ik-button 
                .text=${args.text} 
                .width=${args.width} 
                .height=${args.height} 
                .fontSize=${args.fontSize} 
                .icon=${args.icon2}
                .iconSize=${args.iconSize}
                .type=${args.type}
            ></ik-button>
            <ik-button 
                .text=${args.text} 
                .width=${args.width} 
                .height=${args.height} 
                .fontSize=${args.fontSize} 
                .icon=${args.icon3}
                .iconSize=${args.iconSize}
                .type=${args.type}
            ></ik-button>
        </div>
    `;
};

export const Icon = TemplateIcon.bind({});
Icon.args = {
    width: 'auto',
    height: 'auto',
    fontSize: '25px',
    icon: 'material-symbols:light-mode-outline-rounded',
    icon2: 'material-symbols:dark-mode-outline-rounded',
    icon3: 'material-symbols:add-circle-outline-rounded',
    iconSize: '40px',
    type: 'icon',
};

const TemplateAlign = (args) => {
    return html`
        <div style="display: flex; flex-direction: row; gap: 2em">
            <ik-button 
                .text=${args.text} 
                .width=${args.width} 
                .height=${args.height} 
                .fontSize=${args.fontSize} 
                .type=${args.type}
                .align=${args.align}
            ></ik-button>
            <ik-button 
                .text=${args.text2} 
                .width=${args.width} 
                .height=${args.height} 
                .fontSize=${args.fontSize} 
                .icon=${args.icon2}
                .iconSize=${args.iconSize}
                .type=${args.type}
                .align=${args.align2}
            ></ik-button>
            <ik-button 
                .text=${args.text3} 
                .width=${args.width} 
                .height=${args.height} 
                .fontSize=${args.fontSize} 
                .icon=${args.icon3}
                .iconSize=${args.iconSize}
                .type=${args.type}
                .align=${args.align3}
            ></ik-button>
        </div>
    `;
};

export const Align = TemplateAlign.bind({});
Align.args = {
    text: 'Left align',
    text2: 'Center align',
    text3: 'Right align',
    width: '10em',
    height: 'auto',
    fontSize: '25px',
    type: 'full',
    align: 'left',
    align2: 'center',
    align3: 'right',
};