import "./ik-header"
import {html} from "lit";

export default {
    title: 'Molecules/ik-header',
    tags: ['autodocs'],
};

const Template = (args, { globals }) => {
    const theme = globals.theme;
    const icon = (theme === 'dark')
        ? 'material-symbols:light-mode-outline-rounded'
        : 'material-symbols:dark-mode-outline-rounded';

    return html`<ik-header
            .fontSizeTitle=${ args.fontSizeTitle }
            .fontSizeSelect=${ args.fontSizeSelect }
            .widthSelect=${ args.widthSelect }
            .optionsSelect=${ args.optionsSelect }
            .iconTheme=${ icon }
            .iconSize=${ args.iconSize }
            .connected=${ args.connected }
            .width=${ args.width }
    ></ik-header>`;
};

export const Default = Template.bind({});
Default.args = {
    fontSizeTitle: "4em",
    fontSizeSelect: "1.2em",
    widthSelect: "15em",
    optionsSelect: [
        { value: 'orga1', label: 'MyOrganisation' },
        { value: 'orga2', label: 'OtherOrganisation' },
    ],
    iconSize: "1.7em",
    connected: true,
    width: "100vh"
};

export const NoConnected = Template.bind({});
NoConnected.args = {
    fontSizeTitle: "4em",
    fontSizeSelect: "1.2em",
    widthSelect: "15em",
    optionsSelect: [
        { value: 'orga1', label: 'MyOrganisation' },
        { value: 'orga2', label: 'OtherOrganisation' },
    ],
    iconSize: "1.7em",
    connected: false,
    width: "100vh"
};