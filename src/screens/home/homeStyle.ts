import { StyleSheet } from 'react-native';
import { AppColors } from 'screens/appconstants';

export const homeStyle = StyleSheet.create({
    containerSafearea: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        padding: 10
    },
    listitemText: {
        flex: 1,
        borderBottomWidth: 1,
        borderColor: AppColors.listBorder,
        paddingTop: 10,
        paddingBottom: 10,
        overflow: 'hidden',
        fontSize: 22,
        textAlign: 'center'
    },
});
