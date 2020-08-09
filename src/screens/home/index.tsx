import React from 'react';
import {
    Text,
    SafeAreaView,
    ActivityIndicator,
    FlatList,
    TouchableOpacity,
} from 'react-native';
import { getAllCards, AllCardsResponse } from 'services/card/getAllCards';
import { homeStyle } from './homeStyle';
import { Navigation } from 'react-native-navigation';
import { MechanicScreenKey, SearchButtonId, SearchScreenKey } from 'screens/navigationkeys';
import { AppColors } from 'screens/appconstants';
import { generateTopbarProperty } from 'services/common/generateTopbarProperty';
import { GeneralError } from 'transferobjects/GeneralError';
import { ErrorView } from 'screens/common/errorarea';

type Props = {
    componentId: string;
};

type State = {
    mechanicNames?: Array<string>;
    error?: GeneralError
};

export default class HomeScreen extends React.Component<Props, State> {

    __isMounted?: boolean;
    constructor(props: any) {
        super(props);
        this.state = {
            mechanicNames: undefined,
        };
        Navigation.events().bindComponent(this);
    }

    static options() {
        return {
            topBar: {
                rightButtons: [
                    {
                        id: SearchButtonId,
                        text: 'Search',
                    },
                ],
            }
        }
    }

    componentDidMount(): void {
        this.__isMounted = true;

        getAllCards()
        .then((result: AllCardsResponse) => {
            if(!this.__isMounted)
                return;
            
            this.setState({
                mechanicNames: result.uniqueMechanics,
            });
        })
        .catch((result: AllCardsResponse) => {
            this.setState({
                error: result.error
            })
        });
    }

    componentWillUnmount(): void {
        this.__isMounted = false;
    }
    navigationButtonPressed(eventParameters: { buttonId: string }) {
        if(eventParameters.buttonId === SearchButtonId){
            Navigation.push(this.props.componentId, {
                component: {
                    name: SearchScreenKey
                }
            })
        }
    }

    render(): JSX.Element {
        if (this.state.error !== undefined)
            return <ErrorView errorInfo={this.state.error} />;

        if (this.state.mechanicNames === undefined) {
            return (
                <SafeAreaView style={homeStyle.loadingSafearea}>
                    <ActivityIndicator color={AppColors.listBorder}></ActivityIndicator>
                </SafeAreaView>
            );
        }
        return (
            <SafeAreaView style={homeStyle.containerSafearea}>
                <FlatList
                    data={this.state.mechanicNames}
                    keyExtractor={(item, index) => `homemechanics${index}`}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity
                            style={homeStyle.listitemTouchable}
                            onPress={() => {
                                Navigation.push(this.props.componentId, {
                                    component: {
                                        name: MechanicScreenKey,
                                        passProps: {
                                            mechanicName: item,
                                        },
                                        options: {
                                            topBar: generateTopbarProperty(item)
                                        }
                                    },
                                });
                            }}>
                            <Text style={homeStyle.listitemText}>{item}</Text>
                        </TouchableOpacity>
                    )}
                />
            </SafeAreaView>
        );
    }
}
