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
import { CardBackInfo } from './CardBack';

type Props = {
    data: CardItem;
};

type State = {
    imageValidation: boolean;
};

export default class CardArea extends React.Component<Props, State> {
    imageSource: ImageSourcePropType;
    animatedValue: Animated.Value = new Animated.Value(0);
    flipVal: number = 0;
    frontInterpolate: Animated.AnimatedInterpolation = this.animatedValue.interpolate(
        {
            inputRange: [0, 90],
            outputRange: ['0deg', '180deg'],
        },
    );

    backInterpolate: Animated.AnimatedInterpolation = this.animatedValue.interpolate(
        {
            inputRange: [0, 90],
            outputRange: ['0deg', '180deg'],
        },
    );
    frontOpacity: Animated.AnimatedInterpolation = this.animatedValue.interpolate(
        {
            inputRange: [89, 90],
            outputRange: [1, 0],
        },
    );
    backOpacity: Animated.AnimatedInterpolation = this.animatedValue.interpolate(
        {
            inputRange: [89, 90],
            outputRange: [0, 1],
        },
    );

    cardLabels: Record<string, keyof CardItem>;
    cardInfoData: Array<JSX.Element> = [];
    constructor(props: Props) {
        super(props);
        this.state = {
            imageValidation: true,
        };
        this.imageSource = this.props.data.img
            ? { uri: this.props.data.img }
            : noImageSource;

        this.animatedValue.addListener(({ value }) => {
            this.flipVal = value;
        });

        this.cardLabels = {
            "Card Name" : "name",
            "Player Class": "playerClass",
            "Card Race": "race",
            "Card Rarity": "rarity",
            "Card Set": "cardSet",
            "Card Type": "type",
            "Health": "health",
            "Attack": "attack",
            "How to get ? ": "howToGet",
            "Is Collectible ? ": "collectible"
        }

        for(let key in this.cardLabels){
            this.cardInfoData.push(<CardBackInfo key={this.props.data.cardId+this.cardLabels[key]} propertyTitle={key} propertyValue={this.props.data[this.cardLabels[key]]?.toString()} />)            
        }
    }

    flipCard() {
        if (this.flipVal >= 90) {
            Animated.spring(this.animatedValue, {
                toValue: 0,
                friction: 8,
                tension: 10,
                useNativeDriver: true,
            }).start();
        } else {
            Animated.spring(this.animatedValue, {
                toValue: 180,
                friction: 8,
                tension: 10,
                useNativeDriver: true,
            }).start();
        }
    }

    render() {
        const frontAnimatedStyle = {
            opacity: this.frontOpacity,
            transform: [{ rotateY: this.frontInterpolate }],
        };
        const backAnimatedStyle = {
            opacity: this.backOpacity,
            transform: [{ rotateY: this.backInterpolate }],
        };

        const { data } = this.props;
        return (
            <View style={cardareaStyle.cardareaWrapperView}>
                <Animated.View
                    style={[
                        cardareaStyle.cardView,
                        cardareaStyle.cardbackView,
                        backAnimatedStyle,
                    ]}>
                    <TouchableWithoutFeedback onPress={() => this.flipCard()}>
                        <View style={{ flex: 1, borderWidth: 1, padding: 20, borderRadius: 10 }}>
                            {this.cardInfoData}
                        </View>
                    </TouchableWithoutFeedback>
                </Animated.View>
                <Animated.View
                    style={[cardareaStyle.cardView, frontAnimatedStyle]}>
                    <TouchableWithoutFeedback onPress={() => this.flipCard()}>
                        <Image
                            onError={() => {
                                this.setState({
                                    imageValidation: false,
                                });
                            }}
                            source={
                                this.state.imageValidation
                                    ? this.imageSource
                                    : errorImageSource
                            }
                            style={cardareaStyle.cardareaImage}
                        />
                    </TouchableWithoutFeedback>
                </Animated.View>
                <Text style={cardareaStyle.cardareaText}>
                    {data.name}
                </Text>
            </View>
        );
    }
}

/*
                            <CardBackInfo propertyTitle={"Card Name"} propertyValue={data.name} />
                            <CardBackInfo propertyTitle={"Player Class"} propertyValue={data.playerClass} />
                            <CardBackInfo propertyTitle={"Card Race"} propertyValue={data.race} />
                            <CardBackInfo propertyTitle={"Card Rarity"} propertyValue={data.rarity} />
                            <CardBackInfo propertyTitle={"Card Type"} propertyValue={data.type} />
                            <CardBackInfo propertyTitle={"Card Set"} propertyValue={data.cardSet} />
                            <CardBackInfo propertyTitle={"Health"} propertyValue={data.health} />
                            <CardBackInfo propertyTitle={"Attack"} propertyValue={data.attack} />
                            <CardBackInfo propertyTitle={"Is Collectible ?"} propertyValue={data.collectible === undefined ? undefined : (data.collectible ? 'yes' : 'no') } />
                            <CardBackInfo propertyTitle={"How To Get Card ?"} propertyValue={data.howToGet} /> 
                            <CardBackInfo propertyTitle={"Artist"} propertyValue={data.} />                               

                            */