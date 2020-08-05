import { CardItem } from 'transferobjects/card/CardItem';
import { cardsApi, rapidApiHost, rapidApiKey } from 'services';
import { MechanicItem } from 'transferobjects/card/MechanicItem';

export type AllCardsResponse = {
    data: Array<CardItem>;
    uniqueMechanics: Array<string>;
};

let cardsWithMechanics: Array<CardItem> = [];

export const getAllCards: Function = (): Promise<AllCardsResponse> => {
    return new Promise<AllCardsResponse>((resolve, reject) => {
        fetch(cardsApi(), {
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
                let uniqueMechanicsNames: Array<string> = [];

                cardsWithMechanics = filteredData;
                filteredData.forEach((item: CardItem) => {
                    item.mechanics.forEach((mechanic: MechanicItem) => {
                        if (
                            uniqueMechanicsNames.includes(mechanic.name) ===
                            false
                        ) {
                            uniqueMechanicsNames.push(mechanic.name);
                        }
                    });
                });

                resolve({
                    data: filteredData,
                    uniqueMechanics: uniqueMechanicsNames,
                });
            })
            .catch((e) => reject(e));
    });
};

export const getCardsWithMechanics: Function = (): Array<CardItem> => {
    return cardsWithMechanics;
};
