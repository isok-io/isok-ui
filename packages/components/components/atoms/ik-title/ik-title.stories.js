import './ik-title.js';
import {html} from "lit";

export default {
    title: 'Atoms/ik-title',
    tags: ['autodocs'],
    argTypes: {
        align: {
            control: { type: 'select' },
            options: ['left', 'right', 'center'],
        },
        align1: {
            control: { type: 'select' },
            options: ['left', 'right', 'center'],
        },
        align2: {
            control: { type: 'select' },
            options: ['left', 'right', 'center'],
        },
        align3: {
            control: { type: 'select' },
            options: ['left', 'right', 'center'],
        },
    },
};

const Template = (args) => {
    return html`<ik-title 
            .title=${args.title}
            .subtitle=${args.subtitle}
            .align=${args.align}
            .font-size-title=${args.fontSizeTitle}
            .font-size-subtitle=${args.fontSizeSubtitle}
    ></ik-title>`;
};

export const Default = Template.bind({});
Default.args = {
    title: 'Title',
    subtitle: 'Subtitle',
    align: 'left',
    fontSizeTitle: '16px',
    fontSizeSubtitle: '24px'
};

const AlignTemplate = (args) => {
    return html`
        <div style="display: flex; flex-direction: row; gap: 4em">
            <ik-title 
                .title=${args.title}
                .subtitle=${args.subtitle}
                .align=${args.align1}
                .font-size-title=${args.fontSizeTitle}
                .font-size-subtitle=${args.fontSizeSubtitle}
            ></ik-title>
            <ik-title 
                    .title=${args.title}
                    .subtitle=${args.subtitle}
                    .align=${args.align2}
                    .font-size-title=${args.fontSizeTitle}
                    .font-size-subtitle=${args.fontSizeSubtitle}
            ></ik-title>
            <ik-title 
                .title=${args.title}
                .subtitle=${args.subtitle}
                .align=${args.align3}
                .font-size-title=${args.fontSizeTitle}
                .font-size-subtitle=${args.fontSizeSubtitle}
            ></ik-title>
        </div>
    `;
};

export const Align = AlignTemplate.bind({});
Align.args = {
    title: 'Title',
    subtitle: 'Subtitle',
    align1: 'left',
    align2: 'right',
    align3: 'center',
    fontSizeTitle: '16px',
    fontSizeSubtitle: '24px'
};