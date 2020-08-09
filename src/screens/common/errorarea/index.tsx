import React, { FunctionComponent } from 'react';
import { Alert, View } from 'react-native';
import { GeneralError } from 'transferobjects/GeneralError';

type Props = {
    errorInfo: GeneralError;
};

export const ErrorView: FunctionComponent<Props> = ({
    errorInfo,
}): JSX.Element => {
    Alert.alert(errorInfo.title, errorInfo.body);
    return <View></View>;
};
