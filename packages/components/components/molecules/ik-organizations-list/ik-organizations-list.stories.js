import './ik-organizations-list';
import {html} from "lit";

export default {
    title: 'Molecules/ik-organizations-list',
    tags: ['autodocs'],
};

const Template = (args => {
    return html`<ik-organizations-list
            .fontSizeTitle=${args.fontSizeTitle}
            .fontSizeOrgaTitle=${args.fontSizeOrgaTitle}
            .fontSizeOrgaTextContent=${args.fontSizeOrgaTextContent}
            .iconSize=${args.iconSize}
            .buttonSize=${args.buttonSize}
            .orgaWidth=${args.orgaWidth}
            .organizationsList=${args.organizationsList}
    ></ik-organizations-list>`;
});

export const Default = Template.bind({});
Default.args = {
    fontSizeTitle: "50px",
    fontSizeOrgaTitle: "30px",
    fontSizeOrgaTextTitle: "12px",
    fontSizeOrgaTextContent: '16px',
    iconSize: '25px',
    buttonSize: '40px',
    orgaWidth: '30em',
    organizationsList: [
        {
            name: "Organization 1",
            members: ["member1", "member2"],
        }
    ],
};