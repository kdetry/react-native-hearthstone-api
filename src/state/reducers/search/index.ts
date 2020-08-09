import { SEARCH_RESULTS, SEARCH_START } from 'state/actions/search';
import { SearchCardsResponse } from 'services/card/getBySearch';
import { CardItem } from 'transferobjects/card/CardItem';

type SearchActionType = {
    type: string;
    results: SearchCardsResponse;
};

export const searchReducer = function (state = [], action: SearchActionType) {
    switch (action.type) {
        case SEARCH_RESULTS:
            return {
                isLoading: false,
                result: action.results,
            };
        case SEARCH_START: 
            return {
                isLoading: true
            }
        default:
            return state;
    }
};
