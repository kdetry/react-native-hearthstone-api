import { MechanicItem } from './MechanicItem';

export type CardItem = {
    cardId: string;
    dbfId: string;
    name: string;
    cardSet: string;
    type: string;
    text: string;
    mechanics: Array<MechanicItem>;
    playerClass: string;
    rarity?: string;
    cost?: number;
    attack?: number;
    health?: number;
    flavor?: string;
    artist?: string;
    collectible?: true;
    race?: string;
    howToGet?: string;
    howToGetGold?: string;
    img?: string;
    imgGold?: string;
};

