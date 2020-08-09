import { Navigation } from 'react-native-navigation';
import { TopbarKey } from './navigationkeys';

export const setDefaultOptions = () =>
    Navigation.setDefaultOptions({
        layout: {
            orientation: ['portrait'],
            direction: 'ltr',
        },
        topBar: {
            visible: true,
            drawBehind: false,
            animate: false,
            hideOnScroll: false,
            noBorder: false,
            borderHeight: 0,
            backButton: {
                visible: true,
            },
            title: {
                fontSize: 25,
                fontWeight: 'bold',
                component: {
                    name: TopbarKey,
                    alignment: 'center',
                    passProps: {
                        title: 'Mechanics',
                    },
                },
                alignment: 'center',
            },
        },
        statusBar: {
            style: 'light',
            drawBehind: false,
            visible: true,
        },
    });
