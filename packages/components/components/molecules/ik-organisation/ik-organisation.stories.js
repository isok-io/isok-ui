import './ik-organisation.js';
import {html} from "lit";

export default {
    title: 'Molecules/ik-organisation',
    tags: ['autodocs'],
};

const Template = (args) => {
    return html`<ik-organisation 
            .nameOrga=${args.nameOrga}
            .nbMemberOrga=${args.nbMemberOrga}
            .fontSizeTitle=${args.fontSizeTitle}
            .fontSizeTextTitle=${args.fontSizeTextTitle}
            .fontSizeTextContent=${args.fontSizeTextContent}
            .iconSize=${args.iconSize}
            .width=${args.width}
    ></ik-organisation>`;
};

export const Default = Template.bind({});
Default.args = {
    nameOrga: 'MyOrganisation',
    nbMemberOrga: 5,
    fontSizeTitle: "48px",
    fontSizeTextTitle: "16px",
    fontSizeTextContent: "24px",
    iconSize: "32px",
    width: "700px",
};