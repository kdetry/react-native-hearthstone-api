import React from 'react';
import { SafeAreaView, FlatList, View, TextInput } from 'react-native';
import CardArea from 'screens/common/cardarea';
import { getBySearch, SearchCardsResponse } from 'services/card/getBySearch';
import { generateRequestKey } from 'services/common/generateRequestKey';
import SearchBar from './searchbar'
import SearchResults from './searchresults'
import { TopbarKey } from 'screens/navigationkeys';
import { generateTopbarProperty } from 'services/common/generateTopbarProperty';

type Props = {};

export default class SearchScreen extends React.PureComponent<Props> {
    requestKey: string = '';
    constructor(props: Props) {
        super(props);
    }

    static options() {
        return {
            topBar: generateTopbarProperty("Search")
        }
    }

    render(): JSX.Element {
        return (
            <SafeAreaView>
                <SearchBar />
                <SearchResults isLoading={undefined} result={undefined}/>
            </SafeAreaView>
        );
    }
}
