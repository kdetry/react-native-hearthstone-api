import React, { FunctionComponent } from 'react';
import { Text, View } from 'react-native';

type Props = {
    title: string;
};

export const Topbar: FunctionComponent<Props> = ({ title }) => {
    return (
        <View>
            <Text style={{ fontSize: 22, fontWeight: "600"}}>{title}</Text>
        </View>
    );
};
