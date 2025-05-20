import './ik-check-form-update.js';
import {html} from "lit";

export default {
    title: 'Molecules/Checks/ik-check-form-update',
    tags: ['autodocs'],
};

const Template = (args) => {
    return html`<ik-check-form-update 
            .data=${args.data}
            .fontSizeTitle=${args.fontSizeTitle}
            .fontSizeText=${args.fontSizeText}
            .fontSizeTextAdvanced=${args.fontSizeTextAdvanced}
            .width=${args.width}
    ></ik-check-form-update>`;
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
                title: 'Name',
                value: 'My check'
            },
            {
                type: 'check',
                title: 'Zone',
                selectOptions: [
                    { value: 'all', label: 'All' },
                    { value: 'fr', label: 'France' },
                ],
                value: 'all'
            },
            {
                type: 'text',
                title: 'Interval',
                value: '10min',
            },
            {
                type: 'text',
                title: 'URL',
                value: 'http://my-website.com',
            },
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
                ],
                value: 'get'
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
                title: 'Name',
                value: 'My check'
            },
            {
                type: 'check',
                title: 'Zone',
                selectOptions: [
                    { value: 'all', label: 'All' },
                    { value: 'fr', label: 'France' },
                ],
                value: 'all'
            },
            {
                type: 'text',
                title: 'Interval',
                value: '10min',
            },
            {
                type: 'text',
                title: 'IP Adress - Hostname',
                value: '153.207.6.221',
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
                title: 'Name',
                value: 'My check'
            },
            {
                type: 'check',
                title: 'Zone',
                selectOptions: [
                    { value: 'all', label: 'All' },
                    { value: 'fr', label: 'France' },
                ],
                value: 'all'
            },
            {
                type: 'text',
                title: 'Interval',
                value: '10min',
            },
            {
                type: 'text',
                title: 'Domain name - Hostname',
                value: 'myapi.example.com',
            },
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
                title: 'Name',
                value: 'My check'
            },
            {
                type: 'check',
                title: 'Zone',
                selectOptions: [
                    { value: 'all', label: 'All' },
                    { value: 'fr', label: 'France' },
                ],
                value: 'all'
            },
            {
                type: 'text',
                title: 'Interval',
                value: '10min',
            },
            {
                type: 'text',
                title: 'IP Adress - Hostname',
                value: '153.207.6.221',
            },
            {
                type: 'text',
                title: 'Port',
                value: '80'
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
                title: 'Name',
                value: 'My check'
            },
            {
                type: 'check',
                title: 'Zone',
                selectOptions: [
                    { value: 'all', label: 'All' },
                    { value: 'fr', label: 'France' },
                ],
                value: 'all'
            },
            {
                type: 'text',
                title: 'Interval',
                value: '10min',
            },
            {
                type: 'text',
                title: 'IP Adress - Hostname',
                value: '153.207.6.221',
            },
            {
                type: 'text',
                title: 'Port',
                value: '53'
            }
        ]
    }
};