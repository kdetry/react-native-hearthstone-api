import React, { FunctionComponent } from 'react';
import { View, Text } from 'react-native';
import { CardItem } from 'transferobjects/card/CardItem';

type Props = {
    propertyTitle: string;
    propertyValue: number | string | undefined;
};

export const CardBackInfo: FunctionComponent<Props> = ({
    propertyTitle,
    propertyValue,
}): JSX.Element => {
    if (propertyValue === undefined) return <View></View>;

    return (
        <View>
            <Text style={{ fontSize: 16, marginBottom: 10 }}>
                <Text style={{ fontWeight: '600' }}>{propertyTitle} : </Text>
                {propertyValue}
            </Text>
        </View>
    );
};
