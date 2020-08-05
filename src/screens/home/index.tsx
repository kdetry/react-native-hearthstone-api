import React from 'react';
import { Text, SafeAreaView, ActivityIndicator, FlatList } from 'react-native';
import { getAllCards, AllCardsResponse } from 'services/card/getAllCards';
import { homeStyle } from './homeStyle';

type Props = {};

type State = {
    mechanicNames?: Array<string>;
};

export default class HomeScreen extends React.Component<Props, State> {
    constructor(props: any) {
        super(props);
        this.state = {
            mechanicNames: undefined,
        };
    }

    componentDidMount(): void {
        getAllCards().then((result: AllCardsResponse) => {
            this.setState({
                mechanicNames: result.uniqueMechanics,
            });
        });
    }

    render(): JSX.Element {
        if (this.state.mechanicNames === undefined) {
            return (
                <SafeAreaView>
                    <ActivityIndicator></ActivityIndicator>
                </SafeAreaView>
            );
        }
        return (
            <SafeAreaView style={homeStyle.containerSafearea}>
                <FlatList
                    data={this.state.mechanicNames}
                    keyExtractor={(item, index) => `homemechanics${index}`}
                    renderItem={({ item, index }) => (
                        <Text style={homeStyle.listitemText} onPress={() => {}}>
                            {item}
                        </Text>
                    )}
                />
            </SafeAreaView>
        );
    }
}
