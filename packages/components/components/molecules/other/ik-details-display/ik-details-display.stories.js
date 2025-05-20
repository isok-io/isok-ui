import './ik-details-display';
import {html} from "lit";

export default {
    title: 'Molecules/Other/ik-details-display',
    tags: ['autodocs'],
};

const Template = (args) => {
    return html`<ik-details-display
        .data = ${args.data}
        .fontSizeTitle = ${args.fontSizeTitle}
        .fontSizeValue = ${args.fontSizeValue}
        .width = ${ args.width }
    >
        
    </ik-details-display>`;
};

export const Default = Template.bind({});
Default.args = {
    data : [
        {title: 'URL', value: 'http://my-website.com', fontSizeValue: "18px"},
        {title: "UPTIME", value: '100%'},
        {title: "RESPONSE TIME", value: '300ms'},
    ],
    fontSizeTitle: "16px",
    fontSizeValue: "24px",
    width: '17em',
};