//ABA DE CURSO  
export function getDoneWorkload(subjects: ISubject[], complementary: IComplementary[], useDoing: boolean, totalWorkload: IWorkload) {
    console.log(subjects);
    console.log(complementary);
    console.log(totalWorkload);
    
    const doneComplementary = complementary.reduce((acc, cur) => {
        if (cur.time > 0) return acc + cur.time;
        return acc;
    }, 0);
    const subjectsArray = useDoing ?
        Object.values(subjects).filter(subject => (subject.status === 'doing' || 'done'))
        : Object.values(subjects).filter(subject => subject.status === 'done');
    const normalSubjects = subjectsArray.filter(subject => !subject.isOptional);
    const doneObrigatory = normalSubjects.reduce((acc, cur: any) => {
        if (cur.time) return acc + cur.time;
        return acc;
    }, 0);
    const optionalSubjects = subjectsArray.filter(subject => subject.isOptional);
    const doneOptional = optionalSubjects.reduce((acc, cur: any) => {
        if (cur.time) return acc + cur.time;
        return acc;
    }, 0);
    
    const result = {
        complementary: doneComplementary > totalWorkload.complementary ? totalWorkload.complementary : doneComplementary,
        obrigatory: doneObrigatory > totalWorkload.obrigatory ? totalWorkload.obrigatory : doneObrigatory,
        optional: doneOptional > totalWorkload.optional ? totalWorkload.optional : doneOptional,
    }
    return {
        ...result,
        total: result.complementary + result.obrigatory + result.optional
    }
}