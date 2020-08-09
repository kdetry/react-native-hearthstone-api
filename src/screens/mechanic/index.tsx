import React, { FunctionComponent } from 'react';
import { SafeAreaView, FlatList } from 'react-native';
import { getCardsByMechanic } from 'services/card/getCardsByMechanic';
import { CardItem } from 'transferobjects/card/CardItem';
import CardArea from 'screens/common/cardarea';

type Props = {
    mechanicName: string;
};

export const MechanicScreen: FunctionComponent<Props> = ({
    mechanicName,
}): JSX.Element => {
    let cards: Array<CardItem> = getCardsByMechanic(mechanicName);
    
    return (
        <SafeAreaView>
            <FlatList
                data={cards}
                initialNumToRender={4}
                windowSize={6}
                onEndReachedThreshold={0.5}
                keyExtractor={(item, index) => `cardArea${item.cardId}`}
                renderItem={({ item, index }) => <CardArea data={item} />}
            />
        </SafeAreaView>
    );
};
