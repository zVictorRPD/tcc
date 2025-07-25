const today = new Date().getTime();
const dates = {
    _1: new Date(2025, 2, 10),
    _2: new Date(2025, 6, 12),
    _3: new Date(2025, 7, 11),
    _4: new Date(2025, 11, 13),
};

const hourTransform = 1000 * 3600;
const dayTransform = hourTransform * 24;

export const academicCalendarDates: ICalendarAcademicDate[] = [
    {
        name: "Início de 2025.1",
        date: dates._1,
        daysLeft: Math.floor((dates._1.getTime() - today) / dayTransform),
        hoursLeft: Math.floor(
            ((dates._1.getTime() - today) % dayTransform) / hourTransform
        ),
    },
    {
        name: "Fim de 2025.1",
        date: dates._2,
        daysLeft: Math.floor((dates._2.getTime() - today) / dayTransform),
        hoursLeft: Math.floor(
            ((dates._2.getTime() - today) % dayTransform) / hourTransform
        ),
    },
    {
        name: "Início de 2025.2",
        date: dates._3,
        daysLeft: Math.floor((dates._3.getTime() - today) / dayTransform),
        hoursLeft: Math.floor(
            ((dates._3.getTime() - today) % dayTransform) / hourTransform
        ),
    },
    {
        name: "Fim de 2025.2",
        date: dates._4,
        daysLeft: Math.floor((dates._4.getTime() - today) / dayTransform),
        hoursLeft: Math.floor(
            ((dates._4.getTime() - today) % dayTransform) / hourTransform
        ),
    },
];
