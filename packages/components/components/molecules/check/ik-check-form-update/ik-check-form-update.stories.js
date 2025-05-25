import './ik-check-form-update.js';
import {html} from "lit";

export default {
    title: 'Molecules/Checks/ik-check-form-update',
    tags: ['autodocs'],
};

const Template = (args) => {
    return html`<ik-check-form-update 
            .schema=${args.schema}
            .data=${args.data}
            .zones=${args.zones}
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
        "interval": 5,
        "kind": {
            "Http": {
                "body": "{}",
                "headers": {testKey: "testValue"},
                "method": "get",
                "url": "https://example.com"
            }
        },
        "name": "My check",
        "zones": [
            "all"
        ]
    },
    schema:
    {
        "inputs": [
            {
                "kind": {
                    "default_value": null,
                    "placeholder": "https://example.com",
                    "type": "Text",
                    "variant": "Url"
                },
                "title": "URL"
            }
        ],
        "inputsAdvanced": [
            {
                "kind": {
                    "defaultValue": {
                        "label": "GET",
                        "value": "GET"
                    },
                    "selectOptions": [
                        {
                            "label": "GET",
                            "value": "GET"
                        },
                        {
                            "label": "POST",
                            "value": "POST"
                        },
                        {
                            "label": "PUT",
                            "value": "PUT"
                        },
                        {
                            "label": "DELETE",
                            "value": "DELETE"
                        },
                        {
                            "label": "PATCH",
                            "value": "PATCH"
                        },
                        {
                            "label": "HEAD",
                            "value": "HEAD"
                        },
                        {
                            "label": "OPTIONS",
                            "value": "OPTIONS"
                        },
                        {
                            "label": "CONNECT",
                            "value": "CONNECT"
                        },
                        {
                            "label": "TRACE",
                            "value": "TRACE"
                        }
                    ],
                    "type": "Select"
                },
                "title": "Method"
            },
            {
                "kind": {
                    "default_value": null,
                    "placeholder": "{}",
                    "type": "Text",
                    "variant": "Area"
                },
                "title": "Body"
            },
            {
                "kind": {
                    "defaultValue": {},
                    "keyPlaceholder": "Key",
                    "type": "KeyValue",
                    "valuePlaceholder": "Value"
                },
                "title": "Headers"
            }
        ],
        "type": "Http",
        "version": 1
    },
    zones: [{value: "pau", label: "Pau"}, {value: "toulouse", label: "Toulouse"}],
};

export const PING = Template.bind({});
PING.args = {
    fontSizeTitle: "50px",
    fontSizeText: "25px",
    fontSizeTextAdvanced: "20px",
    width: "660px",
    data: {
        interval: 10,
        kind: {
            Ping: {
                ip_address__hostname: "153.207.6.221"
            }
        },
        name: "My check",
        zones: ["all"]
    },
    schema: {
        inputs: [
            {
                title: "IP Address - Hostname",
                kind: {
                    type: "Text",
                    placeholder: "153.207.6.221",
                    default_value: null
                }
            }
        ],
        inputsAdvanced: [],
        type: "Ping",
        version: 1
    },
    zones: [{value: "all", label: "All"}, {value: "fr", label: "France"}],
};

export const SSL = Template.bind({});
SSL.args = {
    fontSizeTitle: "50px",
    fontSizeText: "25px",
    fontSizeTextAdvanced: "20px",
    width: "660px",
    data: {
        interval: 10,
        kind: {
            Ssl: {
                domain_name__hostname: "myapi.example.com",
                port: "443"
            }
        },
        name: "My check",
        zones: ["all"]
    },
    schema: {
        inputs: [
            {
                title: "Domain name - Hostname",
                kind: {
                    type: "Text",
                    placeholder: "myapi.example.com",
                    default_value: null
                }
            }
        ],
        inputsAdvanced: [
            {
                title: "Port",
                kind: {
                    type: "Text",
                    placeholder: "443",
                    default_value: "443"
                }
            }
        ],
        type: "Ssl",
        version: 1
    },
    zones: [{value: "all", label: "All"}, {value: "fr", label: "France"}],
};

export const TCP = Template.bind({});
TCP.args = {
    fontSizeTitle: "50px",
    fontSizeText: "25px",
    fontSizeTextAdvanced: "20px",
    width: "660px",
    data: {
        interval: 10,
        kind: {
            Tcp: {
                ip_address__hostname: "153.207.6.221",
                port: "80"
            }
        },
        name: "My check",
        zones: ["all"]
    },
    schema: {
        inputs: [
            {
                title: "IP Address - Hostname",
                kind: {
                    type: "Text",
                    placeholder: "153.207.6.221",
                    default_value: null
                }
            },
            {
                title: "Port",
                kind: {
                    type: "Text",
                    placeholder: "80",
                    default_value: null
                }
            }
        ],
        inputsAdvanced: [],
        type: "Tcp",
        version: 1
    },
    zones: [{value: "all", label: "All"}, {value: "fr", label: "France"}],
};

export const UDP = Template.bind({});
UDP.args = {
    fontSizeTitle: "50px",
    fontSizeText: "25px",
    fontSizeTextAdvanced: "20px",
    width: "660px",
    data: {
        interval: 10,
        kind: {
            Udp: {
                ip_address__hostname: "153.207.6.221",
                port: "53"
            }
        },
        name: "My check",
        zones: ["all"]
    },
    schema: {
        inputs: [
            {
                title: "IP Address - Hostname",
                kind: {
                    type: "Text",
                    placeholder: "153.207.6.221",
                    default_value: null
                }
            },
            {
                title: "Port",
                kind: {
                    type: "Text",
                    placeholder: "53",
                    default_value: null
                }
            }
        ],
        inputsAdvanced: [],
        type: "Udp",
        version: 1
    },
    zones: [{value: "all", label: "All"}, {value: "fr", label: "France"}],
};
