import './ik-user-account';
import {html} from "lit";

export default {
    title: 'Molecules/ik-user-account',
    tags: ['autodocs'],
};

const Template = (args => {
    return html`<ik-user-account
            .fontSizeTitle=${args.fontSizeTitle}
            .fontSizeText=${args.fontSizeText}
            .fontSizeSmallText=${args.fontSizeSmallText}
            .modalInputWidth=${args.modalInputWidth},
            .showPasswordModal=${args.showPasswordModal}
    ></ik-user-account>`;
});

export const Default = Template.bind({});
Default.args = {
    fontSizeTitle: "50px",
    fontSizeText: "25px",
    fontSizeSmallText: "18px",
    modalInputWidth: "30em"
};

export const ModalOpen = Template.bind({});
ModalOpen.args = {
    fontSizeTitle: "50px",
    fontSizeText: "25px",
    fontSizeSmallText: "18px",
    modalInputWidth: "30em",
    showPasswordModal: true
};