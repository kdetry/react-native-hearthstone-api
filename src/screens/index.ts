import { Navigation } from 'react-native-navigation';
import HomeScreen from './home';
import {
    HomeScreenKey,
    MechanicScreenKey,
    SearchScreenKey,
    SearchButtonId,
    TopbarKey,
} from './navigationkeys';
import { MechanicScreen } from './mechanic';
import SearchScreen from './search';
import { Provider } from 'react-redux';
import { store } from 'state/store';
import { Topbar } from './common/topbar';

export const registerScreens: Function = (): void => {
    Navigation.registerComponent(HomeScreenKey, () => HomeScreen);
    Navigation.registerComponent(MechanicScreenKey, () => MechanicScreen);

    Navigation.registerComponent(TopbarKey, () => Topbar);
    Navigation.registerComponentWithRedux(
        SearchScreenKey,
        () => SearchScreen,
        Provider,
        store,
    );
};

export const setRoot: Function = (): void => {
    Navigation.setRoot({
        root: {
            stack: {
                id: 'RootStackId',
                children: [
                    {
                        component: {
                            name: HomeScreenKey,
                        },
                    },
                ],
            },
        },
    });
};
