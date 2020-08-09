import { SearchCardsResponse } from "services/card/getBySearch";
//import { CardItem } from "transferobjects/card/CardItem";

export const SEARCH_RESULTS = 'SEARCH_RESULTS';
export const SEARCH_START = 'SEARCH_START';

export function searchResults(results: SearchCardsResponse) {    
    return {
        type: SEARCH_RESULTS,
        results,
    };
}

export function searchStart() {
    return {
        type: SEARCH_START
    }
}
