import './ik-diagram-bar.js';
import {html} from "lit";

export default {
    title: 'Atoms/ik-diagram-bar',
    tags: ['autodocs'],
    argTypes: {
        count: { control: 'number' },
        colors: {
            control: { type: 'multi-select' },
            options: ['green', 'red', 'yellow'],
        },
    },
};

const generateBars = (count, colors) =>
    Array.from({ length: count }, () => ({
        color: colors[Math.floor(Math.random() * colors.length)],
        data: ["Date : 03/22/1999 05:06", "Status code : 200"]
    }));


const Template = (args) => {
    const bars = generateBars(args.nbrBar, args.colors);

    return html`<ik-diagram-bar
            .title=${args.title}
            .width=${args.width}
            .height=${args.height}
            .widthBar=${args.widthBar}
            .bar=${bars}
            .showData=${args.showData}
            .dataSize=${args.dataSize}
    ></ik-diagram-bar>`;
};

export const Default = Template.bind({});
Default.args = {
    width: '245px',
    height: '50px',
    widthBar: '7px',
    colors: ['green'],
    nbrBar: 20
};

export const Data = Template.bind({});
Data.args = {
    title: 'All checks',
    width: '400px',
    height: '70px',
    widthBar: '7px',
    colors: ['green', 'red', 'yellow'],
    nbrBar: 40,
    showData: true,
    dataSize: '15px'
};