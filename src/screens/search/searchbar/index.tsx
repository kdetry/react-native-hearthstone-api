import React, { FunctionComponent } from 'react';
import { View, TextInput } from 'react-native';
import { generateRequestKey } from 'services/common/generateRequestKey';
import { connect } from 'react-redux';
import { searchStart, searchResults } from 'state/actions/search';
import { getBySearch, SearchCardsResponse } from 'services/card/getBySearch';
import { AppColors } from 'screens/appconstants';

type Props = {
    searchStart: Function;
    searchResults: Function;
};

type State = {
    inputValue: string;
};

class SearchBar extends React.Component<Props, State> {
    requestKey: string = '';
    __isMounted: boolean | undefined;
    constructor(props: Props) {
        super(props);
        this.state = {
            inputValue: '',
        };
    }

    componentDidMount() {
        this.__isMounted = true;
    }

    componentWillUnmount() {
        this.__isMounted = false;
    }

    promiseResponse = (result: SearchCardsResponse) => {        
        if (!this.__isMounted || (result.requestKey !== this.requestKey))
            return null;
        
        this.props.searchResults(result);
    };

    onChangeText = (term: string) => {
        this.requestKey = generateRequestKey();
        this.props.searchStart();
        this.setState({ inputValue: term });
        
        getBySearch(term, this.requestKey)
            .then(this.promiseResponse)
            .catch(this.promiseResponse);
    };

    render() {
        return (
            <View>
                <TextInput
                    value={this.state.inputValue}
                    placeholder="Search Term"
                    onChangeText={this.onChangeText}
                    style={{margin: 20, fontSize: 20, borderBottomWidth: 1, borderBottomColor: AppColors.listBorder}}
                />
            </View>
        );
    }
}
export default connect(null, { searchStart, searchResults })(SearchBar);
