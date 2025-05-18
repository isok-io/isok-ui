import './ik-organization-form-update.js';
import {html} from "lit";

export default {
    title: 'Molecules/ik-organization-form-update',
    tags: ['autodocs'],
};

const Template = (args => {
    return html`<ik-organization-form-update
            .fontSizeTitle=${args.fontSizeTitle}
            .fontSizeText=${args.fontSizeText}
            .nameOrga=${args.nameOrga}
            .membersOrga=${args.membersOrga}
    ></ik-organization-form-update>`;
});

export const Default = Template.bind({});
Default.args = {
    fontSizeTitle: "50px",
    fontSizeText: "25px",
    nameOrga: "Organization 1",
    membersOrga: ["memberName@gmail.com"]
};