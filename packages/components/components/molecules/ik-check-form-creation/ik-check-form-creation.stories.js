import './ik-check-form-creation.js';
import {html} from "lit";

export default {
    title: 'Molecules/ik-check-form-creation',
    tags: ['autodocs'],
};

const Template = (args) => {
    return html`<ik-check-form-creation 
            .data=${args.data}
            .fontSizeTitle=${args.fontSizeTitle}
            .fontSizeText=${args.fontSizeText}
            .fontSizeTextAdvanced=${args.fontSizeTextAdvanced}
            .width={args.width}
    ></ik-check-form-creation>`;
};

export const HTTP = Template.bind({});
HTTP.args = {
    fontSizeTitle: "50px",
    fontSizeText: "25px",
    fontSizeTextAdvanced: "20px",
    width: "660px",
    data: {
        type: 'HTTP',
        inputs: [
            {
                type: 'text',
                title: 'URL',
                placeholder: 'http://my-website.com',
            }
        ],
        inputsAdvanced: [
            {
                type: 'select',
                title: 'Method',
                selectOptions: [
                    { value: 'get', label: 'GET' },
                    { value: 'post', label: 'POST' },
                    { value: 'put', label: 'PUT' },
                    { value: 'delete', label: 'DELETE' },
                    { value: 'patch', label: 'PATCH' },
                    { value: 'head', label: 'HEAD' },
                    { value: 'options', label: 'OPTIONS' },
                    { value: 'connect', label: 'CONNECT' },
                    { value: 'trace', label: 'TRACE' }
                ]
            },
            {
                type: 'area',
                title: 'Body',
                value: '{}',
            },
            {
                type: 'key-value',
                title: 'Header',
                placeholder: 'Key...',
                placeholder2: 'Value...',
                values: [
                    { key: "Accept", value: "*/*" }
                ]
            }
        ]
    }
};

export const PING = Template.bind({});
PING.args = {
    fontSizeTitle: "50px",
    fontSizeText: "25px",
    fontSizeTextAdvanced: "20px",
    width: "660px",
    data: {
        type: 'PING',
        inputs: [
            {
                type: 'text',
                title: 'IP Adress - Hostname',
                placeholder: '153.207.6.221',
            }
        ],
    }
};

export const SSL = Template.bind({});
SSL.args = {
    fontSizeTitle: "50px",
    fontSizeText: "25px",
    fontSizeTextAdvanced: "20px",
    width: "660px",
    data: {
        type: 'SSL',
        inputs: [
            {
                type: 'text',
                title: 'Domain name - Hostname',
                placeholder: 'myapi.example.com',
            }
        ],
        inputsAdvanced: [
            {
                type: 'text',
                title: 'Port',
                value: '443'
            }
        ]
    }
};

export const TCP = Template.bind({});
TCP.args = {
    fontSizeTitle: "50px",
    fontSizeText: "25px",
    fontSizeTextAdvanced: "20px",
    width: "660px",
    data: {
        type: 'TCP',
        inputs: [
            {
                type: 'text',
                title: 'IP Adress - Hostname',
                placeholder: '153.207.6.221',
            },
            {
                type: 'text',
                title: 'Port',
                placeholder: '80'
            }
        ]
    }
};

export const UDP = Template.bind({});
UDP.args = {
    fontSizeTitle: "50px",
    fontSizeText: "25px",
    fontSizeTextAdvanced: "20px",
    width: "660px",
    data: {
        type: 'UDP',
        inputs: [
            {
                type: 'text',
                title: 'IP Adress - Hostname',
                placeholder: '153.207.6.221',
            },
            {
                type: 'text',
                title: 'Port',
                placeholder: '53'
            }
        ]
    }
};