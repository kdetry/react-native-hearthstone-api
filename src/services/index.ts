const apiRoot: string = 'https://omgvamp-hearthstone-v1.p.rapidapi.com/';
export const rapidApiHost: string = 'omgvamp-hearthstone-v1.p.rapidapi.com';
export const rapidApiKey = 'a80414cc2fmsh646cde0709c4e1dp11ba5bjsnc5d603b7ad77';
export const cardsApiUrl = () => `${apiRoot}cards`;
export const searchApiUrl = (query: string) => `${apiRoot}cards/search/${query}`;
