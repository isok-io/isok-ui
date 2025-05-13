import '../styles/light-theme.css';
import '../styles/dark-theme.css';
import '../styles/preview.css';

export const globalTypes = {
    theme: {
        name: 'Theme',
        description: 'Global theme for components',
        defaultValue: 'light',
        toolbar: {
            icon: 'paintbrush',
            items: [
                { value: 'light', title: 'Light' },
                { value: 'dark', title: 'Dark' },
            ],
        },
    },
};

export const decorators = [
    (storyFn, context) => {
        const { theme } = context.globals;

        document.documentElement.classList.remove('light', 'dark');
        document.documentElement.classList.add(theme);

        return storyFn();
    },
];
