import {Navigation} from 'react-native-navigation';
//import { setDefaultOptions } from 'screens/defaultoptions';
import {registerScreens, setRoot} from 'screens';

registerScreens();

Navigation.events().registerAppLaunchedListener(() => {
    //setDefaultOptions();
    setRoot();
});
