
const abreviations:any = {
    "BACHARELADO": "Bach.",
    "LICENCIATURA": "Lic.",
    "TECNÓLOGO": "Tec.",
    "SEROPÉDICA": "Sero.",
    "NOVA IGUAÇU": "N.I.",
    "PRESENCIAL": "Pres.",
    "À DISTÂNCIA": "EAD",
    "ADMINISTRAÇÃO": "Adm.",
    "CIÊNCIA": "C.",
    "CIÊNCIAS": "C.",
    "ENGENHARIA": "Eng.",
    "PORTUGUÊS/ESPANHOL/LITERATURAS": "P/E/L",
    "PORTUGUÊS/INGLÊS/LITERATURA": "P/I/L",
    "PORTUGUÊS/LITERATURAS": "P/L",
};

export function abbreviateCourseName(courseName: string) {
    // const words = courseName.split(" ");
    // const abreviatedWords = words.map((word) => {
    //     if (abreviations[word]) return abreviations[word];
    //     return word;
    // });
    // return toCapitalize(abreviatedWords.join(" "));
    return courseName;
}