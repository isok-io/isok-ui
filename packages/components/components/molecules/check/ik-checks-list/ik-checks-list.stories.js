import './ik-checks-list';
import {html} from "lit";

export default {
    title: 'Molecules/Checks/ik-checks-list',
    tags: ['autodocs'],
};

const Template = (args => {
    return html`<ik-checks-list
            .fontSizeTitle=${args.fontSizeTitle}
            .fontSizeCheckTitle=${args.fontSizeCheckTitle}
            .fontSizeCheckValue=${args.fontSizeCheckValue}
            .fontSizeFilterBar=${args.fontSizeFilterBar}
            .searchBarWidth=${args.searchBarWidth}
            .checks=${args.checks}
            .groupChecksWidth=${args.groupChecksWidth}
            .checksWidth=${args.checksWidth}
            .groupByValue=${args.groupByValue}
            .width=${args.width}
    ></ik-checks-list>`;
});

export const Default = Template.bind({});
Default.args = {
    fontSizeTitle: "50px",
    fontSizeCheckTitle: "16px",
    fontSizeCheckValue: "24px",
    fontSizeFilterBar: "20px",
    searchBarWidth: "20em",
    groupChecksWidth: "60em",
    checksWidth: "55em",
    groupByValue: "domain",
    checks: [
        {
            name: "MyCheck1",
            type: "HTTP",
            domain: "http://domain-exemple",
            uptime: 20,
            latency: 300,
            bars: Array.from({ length: 20 }, () => ({
                color: ["green","yellow","red"][Math.floor(Math.random() * 3)]
            }))
        },
        {
            name: "MyCheck2",
            type: "HTTP",
            domain: "http://domain-exemple",
            uptime: 40,
            latency: 300,
            bars: Array.from({ length: 20 }, () => ({
                color: ["green","yellow","red"][Math.floor(Math.random() * 3)]
            }))
        },
        {
            name: "MyCheck3",
            type: "HTTP",
            domain: "http://domain-exemple2",
            uptime: 20,
            latency: 300,
            bars: Array.from({ length: 20 }, () => ({
                color: ["green","yellow","red"][Math.floor(Math.random() * 3)]
            }))
        },
        {
            name: "MyCheck4",
            type: "TCP",
            domain: "http://domain-exemple",
            uptime: 40,
            latency: 300,
            bars: Array.from({ length: 20 }, () => ({
                color: ["green","yellow","red"][Math.floor(Math.random() * 3)]
            }))
        },
        {
            name: "MyCheck5",
            type: "HTTP",
            domain: "http://domain-exemple2",
            uptime: 20,
            latency: 300,
            bars: Array.from({ length: 20 }, () => ({
                color: ["green","yellow","red"][Math.floor(Math.random() * 3)]
            }))
        },
        {
            name: "MyCheck6",
            type: "TCP",
            domain: "http://domain-exemple3",
            uptime: 40,
            latency: 300,
            bars: Array.from({ length: 20 }, () => ({
                color: ["green","yellow","red"][Math.floor(Math.random() * 3)]
            }))
        },
        {
            name: "MyCheck7",
            type: "HTTP",
            domain: "http://domain-exemple",
            uptime: 20,
            latency: 300,
            bars: Array.from({ length: 20 }, () => ({
                color: ["green","yellow","red"][Math.floor(Math.random() * 3)]
            }))
        },
        {
            name: "MyCheck8",
            type: "HTTP",
            domain: "http://domain-exemple",
            uptime: 40,
            latency: 300,
            bars: Array.from({ length: 20 }, () => ({
                color: ["green","yellow","red"][Math.floor(Math.random() * 3)]
            }))
        },
        {
            name: "MyCheck9",
            type: "HTTP",
            domain: "http://domain-exemple2",
            uptime: 20,
            latency: 300,
            bars: Array.from({ length: 20 }, () => ({
                color: ["green","yellow","red"][Math.floor(Math.random() * 3)]
            }))
        },
        {
            name: "MyCheck10",
            type: "TCP",
            domain: "http://domain-exemple",
            uptime: 40,
            latency: 300,
            bars: Array.from({ length: 20 }, () => ({
                color: ["green","yellow","red"][Math.floor(Math.random() * 3)]
            }))
        },
        {
            name: "MyCheck11",
            type: "HTTP",
            domain: "http://domain-exemple2",
            uptime: 20,
            latency: 300,
            bars: Array.from({ length: 20 }, () => ({
                color: ["green","yellow","red"][Math.floor(Math.random() * 3)]
            }))
        },
        {
            name: "MyCheck12",
            type: "TCP",
            domain: "http://domain-exemple3",
            uptime: 40,
            latency: 300,
            bars: Array.from({ length: 20 }, () => ({
                color: ["green","yellow","red"][Math.floor(Math.random() * 3)]
            }))
        }
    ]
};

export const GroupByType = Template.bind({});
GroupByType.args = {
    fontSizeTitle: "50px",
    fontSizeCheckTitle: "16px",
    fontSizeCheckValue: "24px",
    fontSizeFilterBar: "20px",
    searchBarWidth: "20em",
    groupChecksWidth: "60em",
    checksWidth: "55em",
    groupByValue: "type",
    checks: [
        {
            name: "MyCheck1",
            type: "HTTP",
            domain: "http://domain-exemple",
            uptime: 20,
            latency: 300,
            bars: Array.from({ length: 20 }, () => ({
                color: ["green","yellow","red"][Math.floor(Math.random() * 3)]
            }))
        },
        {
            name: "MyCheck2",
            type: "HTTP",
            domain: "http://domain-exemple",
            uptime: 40,
            latency: 300,
            bars: Array.from({ length: 20 }, () => ({
                color: ["green","yellow","red"][Math.floor(Math.random() * 3)]
            }))
        },
        {
            name: "MyCheck3",
            type: "HTTP",
            domain: "http://domain-exemple2",
            uptime: 20,
            latency: 300,
            bars: Array.from({ length: 20 }, () => ({
                color: ["green","yellow","red"][Math.floor(Math.random() * 3)]
            }))
        }
    ],
    width: "70em"
}