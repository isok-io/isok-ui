import './ik-check-details.js';
import {html} from "lit";

export default {
    title: 'Molecules/Checks/ik-check-details',
    tags: ['autodocs'],
};

const Template = (args) => {
    return html`<ik-check-details
            .fontSizeTitle=${args.fontSizeTitle}
            .fontSizeText=${args.fontSizeText}
            .fontSizeSmallText=${args.fontSizeSmallText}
            .width=${args.width}
            .data=${args.data}
    ></ik-check-form-pre-creation>`;
};

export const HTTP = Template.bind({});
HTTP.args = {
    fontSizeTitle: "50px",
    fontSizeText: "27px",
    fontSizeSmallText: "20px",
    width: "660px",
    data: {
        name: "My check",
        type: "HTTP",
        domain: "http://domain-exemple",
        uptime: "40%",
        latency: "300ms",
        bars: Array.from({ length: 60 }, () => ({
            color: ["red","yellow","green"][Math.floor(Math.random() * ["red","yellow","green"].length)],
            data: ["Date : 03/22/1999 05:06", "Status code : 200"]
        })),
        latencyBars: Array.from({ length: 20 }, () => Math.floor(Math.random() * 151) + 50)
    },
};