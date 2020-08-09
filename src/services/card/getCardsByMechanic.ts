import { MechanicItem } from 'transferobjects/card/MechanicItem';
import { getCardsWithMechanics } from 'services/card/getAllCards';
import { CardItem } from 'transferobjects/card/CardItem';

export type CardsByMechanicResponse = {};

export const getCardsByMechanic: CallableFunction = (
    mechanicName: string,
): CardsByMechanicResponse => {
    let cardsWithMechanics: Array<CardItem> = getCardsWithMechanics();
    return cardsWithMechanics.filter((item: CardItem) => {
        let filterResult: boolean = false;
        item.mechanics.forEach((mechanic: MechanicItem) => {
            if (mechanic.name === mechanicName) filterResult = true;
        });
        return filterResult;
    });
};
