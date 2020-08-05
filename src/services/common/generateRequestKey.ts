export const generateRequestKey = (): string => {
    return Math.random().toString(36).substring(7);
};
