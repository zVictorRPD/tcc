export const toCapitalize = (str: string) => {
    const wordsToIgnore = ['da', 'das', 'de', 'do', 'dos', 'e'];
    const words = str.toLowerCase().split(' ');
    const capitalizedWords = words.map((word) => {
        if (wordsToIgnore.includes(word)) {
            return word;
        }
        return word.charAt(0).toUpperCase() + word.slice(1);
    });
    return capitalizedWords.join(' ');
}   