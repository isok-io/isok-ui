import './ik-filter.js';
import {html} from "lit";

export default {
    title: 'Atoms/ik-filter',
    tags: ['autodocs'],
    argTypes: {
        type: {
            control: { type: 'select' },
            options: ['simple-select', 'simple-text', 'double'],
        },
        inputType: {
            control: { type: 'select' },
            options: ['text', 'number'],
        },
        valueSelect: {
            control: { type: 'select' },
            options: ['type', 'domain'],
        },
    },
};

const Template = (args) => {
    return html`<ik-filter 
            .type=${args.type}
            .title=${args.title}
            .selectOptions=${args.selectOptions}
            .inputType=${args.inputType}
            .widthTitle=${args.widthTitle}
            .widthZ1=${args.widthZ1}
            .widthZ2=${args.widthZ2}
            .fontSize=${args.fontSize}
            .placeholder=${args.placeholder}
            .valueSelect="${args.valueSelect}"
    ></ik-filter>`;
};

export const Default = Template.bind({});
Default.args = {
    type : 'simple-select',
    title : 'Group by',
    selectOptions: [
        { value: 'domain', label: 'Domain' },
        { value: 'type', label: 'Type' },
    ],
    inputType : undefined,
    widthTitle : 'auto',
    widthZ1 : 'auto',
    widthZ2: 'auto',
    fontSize : '20px',
    valueSelect: "type"
};

export const Text = Template.bind({});
Text.args = {
    type : 'simple-text',
    title : 'Name',
    inputType : 'text',
    widthTitle : 'auto',
    widthZ1 : 'auto',
    widthZ2: 'auto',
    fontSize : '20px',
};

export const Number = Template.bind({});
Number.args = {
    type : 'simple-text',
    title : 'Number',
    inputType : 'number',
    widthTitle : 'auto',
    widthZ1 : '3em',
    widthZ2: 'auto',
    fontSize : '20px',
    placeholder: '0'
};

export const Double = Template.bind({});
Double.args = {
    type : 'double',
    title : 'Check in',
    selectOptions: [
        { value: 'days', label: 'days' },
        { value: 'min', label: 'minutes' },
    ],
    inputType : 'number',
    widthTitle : 'auto',
    widthZ1 : '3em',
    widthZ2: 'auto',
    fontSize : '20px',
    placeholder: '10'
};