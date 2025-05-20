import "./ik-filters-menu"
import {html} from "lit";

export default {
    title: 'Molecules/Other/ik-filters-menu',
    tags: ['autodocs'],
};

const Template = (args) => {

    return html`<ik-filters-menu
            .fontSize=${ args.fontSize }
            .searchBarWidth=${ args.searchBarWidth }
    ></ik-filters-menu>`;
};

export const Default = Template.bind({});
Default.args = {
    fontSize: "15px",
    searchBarWidth: "20em",
};
