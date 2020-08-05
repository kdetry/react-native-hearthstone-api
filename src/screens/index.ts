import { Navigation } from 'react-native-navigation';
import HomeScreen from './home';
import { HomeScreenKey } from './navigationkeys';

export const registerScreens: Function = (): void => {
    Navigation.registerComponent(HomeScreenKey, () => HomeScreen);
};

export const setRoot: Function = (): void => {
    Navigation.setRoot({
        root: {
            component: {
                name: HomeScreenKey,
            },
        },
    });
};
