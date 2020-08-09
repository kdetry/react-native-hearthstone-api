import { TopbarKey } from "screens/navigationkeys"
import { OptionsTopBar } from "react-native-navigation"

export const generateTopbarProperty = (title: string): OptionsTopBar => {
    return {
        title: {
            component: {
                name: TopbarKey,
                alignment: 'center',
                passProps: {
                    title: title,
                },
            },
        }
    }
}