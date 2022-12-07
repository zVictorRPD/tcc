export const toCapitalize = (str: string) => {
    const wordsToIgnore = ['da', 'das', 'de', 'do', 'dos', 'e', 'a', 'em', 'na', 'nas', 'no', 'nos', 'o', 'os', 'para', 'por', 'um', 'uma', 'uns', 'umas', 'à', 'às', 'I', 'II', 'III', 'IV', 'V'];
    const wordsToUpperCase = ['i', 'ii', 'iii', 'iv', 'v', 'i-a', 'ii-a', 'iii-a', 'iv-a', 'ea']
    const words = str.toLowerCase().split(' ');
    const capitalizedWords = words.map((word) => {
        if (wordsToIgnore.includes(word.replace(':', ''))) return word;
        if (wordsToUpperCase.includes(word.replace(':', ''))) return word.toUpperCase();
        return word.charAt(0).toUpperCase() + word.slice(1);
    });
    return capitalizedWords.join(' ');
}   