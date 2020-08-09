import { GeneralError } from 'transferobjects/GeneralError';
import { CardItem } from 'transferobjects/card/CardItem';
import { searchApiUrl, rapidApiHost, rapidApiKey } from 'services';
import { generalErrorTitle } from 'screens/appconstants';

export type SearchCardsResponse = {
    requestKey: string,
    data?: Array<CardItem>;
    error?: GeneralError;
};

export const getBySearch: Function = (
    term: string,
    requestKey: string
): Promise<SearchCardsResponse> => {
    return new Promise<SearchCardsResponse>((resolve, reject) => {
        fetch(searchApiUrl(term), {
            headers: {
                'x-rapidapi-host': rapidApiHost,
                'x-rapidapi-key': rapidApiKey,
            },
        })
        .then((x) => x.json())
        .then((data) => {
            resolve({
                requestKey: requestKey,
                data: data,
                error: undefined
            });
        })
        .catch((e) => reject({
            requestKey: requestKey,
            data: undefined,
            error: {
                title: generalErrorTitle,
                body: e
            }
        }))
    });
};
