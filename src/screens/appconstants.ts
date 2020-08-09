import { Dimensions } from "react-native";

export const AppColors = {
    listBorder: "#73471C" 
}

export const noImageSource = require('assets/images/noImageCard.png');
export const errorImageSource = require('assets/images/404ImageCard.png');

export const windowWidth = Dimensions.get("window").width;
export const imageWidth = windowWidth - 40;
export const imageHeight = imageWidth*1.51;

export const generalErrorTitle: string = "An error occured";

