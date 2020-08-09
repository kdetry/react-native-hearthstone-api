import { Navigation } from 'react-native-navigation';
import { registerScreens, setRoot } from 'screens';
import { setDefaultOptions } from 'screens/defaultoptions';

registerScreens();

Navigation.events().registerAppLaunchedListener(() => {
    setDefaultOptions();
    setRoot();
});
