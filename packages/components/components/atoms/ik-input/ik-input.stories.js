import './ik-input.js';
import {html} from "lit";

export default {
    title: 'Atoms/ik-input',
    tags: ['autodocs'],
    argTypes: {
        type: {
            control: { type: 'select' },
            options: ['text', 'textarea', 'select', 'double'],
        },
    },
};

const Template = (args) => {
    return html`<ik-input 
            .placeholder=${args.placeholder}
            .placeholder2=${args.placeholder2}
            .type=${args.type}
            .width=${args.width} 
            .height=${args.height} 
            .fontSize=${args.fontSize}
            .title=${args.title}
    ></ik-input>`;
};

export const Default = Template.bind({});
Default.args = {
    placeholder: 'Email...',
    type: 'text',
    width: 'auto',
    height: 'auto',
    fontSize: '25px',
};

export const WithTitle = Template.bind({});
WithTitle.args = {
    placeholder: 'Email...',
    type: 'text',
    width: 'auto',
    height: 'auto',
    fontSize: '25px',
    title: 'Email'
};

export const TextArea = Template.bind({});
TextArea.args = {
    placeholder: 'Adress...',
    type: 'textarea',
    width: 'auto',
    height: 'auto',
    fontSize: '25px',
};

const SelectTemplate = (args) => {
    return html`<ik-input 
            .placeholder=${args.placeholder}
            .type=${args.type}
            .width=${args.width} 
            .height=${args.height} 
            .fontSize=${args.fontSize}
            .title=${args.title}
            .selectOptions=${args.selectOptions}
    >
    </ik-input>`;
};

export const Select = SelectTemplate.bind({});
Select.args = {
    placeholder: 'Email...',
    type: 'select',
    width: 'auto',
    height: 'auto',
    fontSize: '25px',
    selectOptions: [
        { value: 'dog', label: 'Dog' },
        { value: 'cat', label: 'Cat' },
        { value: 'rabbit', label: 'Rabbit' },
    ],
};

export const Double = Template.bind({});
Double.args = {
    placeholder: 'Key...',
    placeholder2: 'Value...',
    type: 'double',
    width: 'auto',
    height: 'auto',
    fontSize: '25px',
};