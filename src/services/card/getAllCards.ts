import { CardItem } from 'transferobjects/card/CardItem';
import { rapidApiHost, rapidApiKey, cardsApiUrl } from 'services';
import { MechanicItem } from 'transferobjects/card/MechanicItem';
import { GeneralError } from 'transferobjects/GeneralError';
import { generalErrorTitle } from 'screens/appconstants';

export type AllCardsResponse = {
    uniqueMechanics?: Array<string>;
    error?: GeneralError
};

let cardsWithMechanics: Array<CardItem> = [];

export const getAllCards: Function = (): Promise<AllCardsResponse> => {
    return new Promise<AllCardsResponse>((resolve, reject) => {
        fetch(cardsApiUrl(), {
            headers: {
                'x-rapidapi-host': rapidApiHost,
                'x-rapidapi-key': rapidApiKey,
            },
        })
            .then((x) => x.json())
            .then((bulk: Object) =>
                Object.values(bulk).reduce((acc, val) => acc.concat(val), []),
            )
            .then((data: Array<CardItem>) =>
                data.filter((item: CardItem) =>
                    item.mechanics !== undefined ? true : false,
                ),
            )
            .then((filteredData: Array<CardItem>) => {
                cardsWithMechanics = filteredData;

                let uniqueMechanicsNames: Array<string> = getUniqueMechanicsFrom(filteredData);

                resolve({
                    uniqueMechanics: uniqueMechanicsNames,
                });
            })
            .catch((e) => reject({
                uniqueMechanics: undefined,
                error: {
                    title: generalErrorTitle,
                    body: e.toString()
                }
            }));
    });
};

const getUniqueMechanicsFrom = function(data: Array<CardItem>): Array<string> {
    let uniqueMechanicsNames: Array<string> = [];

    data.forEach((item: CardItem) => {
        item.mechanics.forEach((mechanic: MechanicItem) => {
            if (
                uniqueMechanicsNames.includes(mechanic.name) ===
                false
            ) {
                uniqueMechanicsNames.push(mechanic.name);
            }
        });
    });

    return uniqueMechanicsNames;
}

export const getCardsWithMechanics: Function = (): Array<CardItem> => {
    return cardsWithMechanics;
};
