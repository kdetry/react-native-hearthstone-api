import React, { FunctionComponent, useState } from 'react';
import { CardItem } from 'transferobjects/card/CardItem';
import {
    View,
    Image,
    Text,
    ImageSourcePropType,
    Animated,
    TouchableWithoutFeedback,
} from 'react-native';
import { noImageSource, errorImageSource } from 'screens/appconstants';
import { cardareaStyle } from './cardareaStyle';

type Props = {
    data: CardItem;
};

export const CardArea: FunctionComponent<Props> = ({ data }): JSX.Element => {
    const [valid, setValid] = useState(true);

    let imageSource: ImageSourcePropType = data.img
        ? { uri: data.img }
        : noImageSource;

    let animatedValue: Animated.Value = new Animated.Value(0);
    let val: number = 0;
    let frontInterpolate: Animated.AnimatedInterpolation = animatedValue.interpolate(
        {
            inputRange: [0, 90],
            outputRange: ['0deg', '180deg'],
        },
    );

    let backInterpolate: Animated.AnimatedInterpolation = animatedValue.interpolate(
        {
            inputRange: [0, 90],
            outputRange: ['0deg', '180deg'],
        },
    );

    let frontOpacity: Animated.AnimatedInterpolation = animatedValue.interpolate(
        {
            inputRange: [89, 90],
            outputRange: [1, 0],
        },
    );
    let backOpacity: Animated.AnimatedInterpolation = animatedValue.interpolate(
        {
            inputRange: [89, 90],
            outputRange: [0, 1],
        },
    );

    let flipCard: Function = () => {
        if (val >= 90) {
            Animated.spring(animatedValue, {
                toValue: 0,
                friction: 8,
                tension: 10,
                useNativeDriver: true,
            }).start();
        } else {
            Animated.spring(animatedValue, {
                toValue: 180,
                friction: 8,
                tension: 10,
                useNativeDriver: true,
            }).start();
        }
    };

    animatedValue.addListener(({ value }) => {
        val = value;
    });

    return (
        <View style={cardareaStyle.cardareaWrapperView}>
            <Animated.View
                style={[
                    cardareaStyle.cardView,
                    cardareaStyle.cardbackView,
                    {
                        opacity: backOpacity,
                        transform: [{ rotateY: backInterpolate }],
                    },
                ]}>
                <View style={{ flex: 1 }}>
                    {Object.entries(data).map((itemArray) => {
                        if (
                            itemArray[0] === 'img' ||
                            itemArray[0] === 'imgGold' ||
                            itemArray[0] === 'mechanics' ||
                            itemArray[1]?.toString().length == 0
                        )
                            return null;

                        return (
                            <View>
                                <Text style={{fontWeight: '600'}}>{itemArray[0]}</Text>
                                <Text>{itemArray[1]}</Text>
                            </View>
                        );
                    })}
                </View>
            </Animated.View>
            <Animated.View
                style={[
                    cardareaStyle.cardView,
                    {
                        opacity: frontOpacity,
                        transform: [{ rotateY: frontInterpolate }],
                    },
                ]}>
                <TouchableWithoutFeedback onPress={() => flipCard()}>
                    <Image
                        onError={() => setValid(false)}
                        source={valid ? imageSource : errorImageSource}
                        style={cardareaStyle.cardareaImage}
                    />
                </TouchableWithoutFeedback>
            </Animated.View>
            <Text style={cardareaStyle.cardareaText}>{data.name}</Text>
        </View>
    );
};
