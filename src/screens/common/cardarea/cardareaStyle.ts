import { StyleSheet } from "react-native";
import { imageWidth, imageHeight, AppColors, windowWidth } from "screens/appconstants";

export const cardareaStyle = StyleSheet.create({
    cardareaWrapperView: {
        display: 'flex',
        flex: 1,
        borderBottomWidth: 1,
        borderBottomColor: AppColors.listBorder,
        marginLeft: 20,
        marginRight: 20,
        paddingBottom: 20,
        alignItems: 'center'
    },
    cardView: {
        flex: 1,
        backfaceVisibility: 'hidden',
    },
    cardbackView: {
        padding: 50,
        position: "absolute",
        top: 0,
        width: imageWidth,
        height: imageHeight
    },
    cardareaImage: {
        flex: 1,
        width: imageWidth,
        height: imageHeight,
        resizeMode: "stretch"
    },
    cardareaText: {
        fontSize: 22,
        color: AppColors.listBorder
    }
})