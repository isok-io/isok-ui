import './ik-check-form-creation.js';
import {html} from "lit";

export default {
    title: 'Molecules/Checks/ik-check-form-creation',
    tags: ['autodocs'],
};

const Template = (args) => {
    return html`<ik-check-form-creation 
            .schema=${args.schema}
            .data=${args.data}
            .fontSizeTitle=${args.fontSizeTitle}
            .fontSizeText=${args.fontSizeText}
            .fontSizeTextAdvanced=${args.fontSizeTextAdvanced}
            .width=${args.width}
    ></ik-check-form-creation>`;
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
                "body": "",
                "headers": {},
                "method": "get",
                "url": ""
            }
        },
        "name": "",
        "zones": [
            "All"
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
        }
};

export const PING = Template.bind({});
PING.args = {
    fontSizeTitle: "50px",
    fontSizeText: "25px",
    fontSizeTextAdvanced: "20px",
    width: "660px",
    data: {
        interval: 5,
        kind: {
            Ping: {
                host: ""
            }
        },
        name: "",
        zones: ["All"]
    },
    schema: {
        type: "Ping",
        version: 1,
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
        inputsAdvanced: []
    }
};

export const SSL = Template.bind({});
SSL.args = {
    fontSizeTitle: "50px",
    fontSizeText: "25px",
    fontSizeTextAdvanced: "20px",
    width: "660px",
    data: {
        interval: 5,
        kind: {
            Ssl: {
                host: "",
                port: "443"
            }
        },
        name: "",
        zones: ["All"]
    },
    schema: {
        type: "Ssl",
        version: 1,
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
                    default_value: "443",
                    placeholder: "443"
                }
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
        interval: 5,
        kind: {
            Tcp: {
                host: "",
                port: "80"
            }
        },
        name: "",
        zones: ["All"]
    },
    schema: {
        type: "Tcp",
        version: 1,
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
        inputsAdvanced: []
    }
};

export const UDP = Template.bind({});
UDP.args = {
    fontSizeTitle: "50px",
    fontSizeText: "25px",
    fontSizeTextAdvanced: "20px",
    width: "660px",
    data: {
        interval: 5,
        kind: {
            Udp: {
                host: "",
                port: "53"
            }
        },
        name: "",
        zones: ["All"]
    },
    schema: {
        type: "Udp",
        version: 1,
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
        inputsAdvanced: []
    }
};
