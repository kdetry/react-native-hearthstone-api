import React from 'react';
import {
    FlatList,
    Alert,
    View,
    SafeAreaView,
    ActivityIndicator,
} from 'react-native';
import CardArea from 'screens/common/cardarea';
import { connect } from 'react-redux';
import { SearchCardsResponse } from 'services/card/getBySearch';
import { GeneralError } from 'transferobjects/GeneralError';
import { homeStyle } from 'screens/home/homeStyle';
import { ErrorView } from 'screens/common/errorarea';

type Props = {
    isLoading: boolean | undefined;
    result: SearchCardsResponse | undefined;
};

class SearchResults extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
    }

    static options() {
        return {
            topBar: {
                visible: true,
                title: {
                    text: 'Search',
                }
            }
        }
    }
    
    render(): JSX.Element {
        if (this.props.isLoading)
            return (
                <SafeAreaView style={homeStyle.loadingSafearea}>
                    <ActivityIndicator />
                </SafeAreaView>
            );

        if (this.props.result == undefined) return <View></View>;

        if (this.props.result.error !== undefined)
        return <ErrorView errorInfo={this.props.result.error} />;

        return (
            <FlatList
                data={this.props.result.data}
                initialNumToRender={4}
                windowSize={6}
                onEndReachedThreshold={0.5}
                keyExtractor={(item, index) => `cardArea${item.cardId}`}
                renderItem={({ item, index }) => <CardArea data={item} />}
            />
        );
    }
}

const mapStateToProps = (state: any) => {    
    return {
        isLoading: state.searchReducer.isLoading,
        result: state.searchReducer.result,
    };
};

export default connect(mapStateToProps, null)(SearchResults);
