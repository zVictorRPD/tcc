const today = new Date().getTime();
const dates = {
    _1: new Date(2023, 7, 28),
    _2: new Date(2023, 11, 23),
    _3: new Date(2024, 1, 26),
    _4: new Date(2024, 5, 29),
    _5: new Date(2024, 7, 5),
    _6: new Date(2024, 11, 7),
};

const hourTransform = 1000 * 3600;
const dayTransform = hourTransform * 24;

export const academicCalendarDates: ICalendarAcademicDate[] = [
    {
        name: "Início de 2023.2",
        date: dates._1,
        daysLeft: Math.floor((dates._1.getTime() - today) / dayTransform),
        hoursLeft: Math.floor(
            ((dates._1.getTime() - today) % dayTransform) / hourTransform
        ),
    },
    {
        name: "Fim de 2023.2",
        date: dates._2,
        daysLeft: Math.floor((dates._2.getTime() - today) / dayTransform),
        hoursLeft: Math.floor(
            ((dates._2.getTime() - today) % dayTransform) / hourTransform
        ),
    },
    {
        name: "Início de 2024.1",
        date: dates._3,
        daysLeft: Math.floor((dates._3.getTime() - today) / dayTransform),
        hoursLeft: Math.floor(
            ((dates._3.getTime() - today) % dayTransform) / hourTransform
        ),
    },
    {
        name: "Fim de 2024.1",
        date: dates._4,
        daysLeft: Math.floor((dates._4.getTime() - today) / dayTransform),
        hoursLeft: Math.floor(
            ((dates._4.getTime() - today) % dayTransform) / hourTransform
        ),
    },
    {
        name: "Início de 2024.2",
        date: dates._5,
        daysLeft: Math.floor((dates._5.getTime() - today) / dayTransform),
        hoursLeft: Math.floor(
            ((dates._5.getTime() - today) % dayTransform) / hourTransform
        ),
    },
    {
        name: "Fim de 2024.2",
        date: dates._6,
        daysLeft: Math.floor((dates._6.getTime() - today) / dayTransform),
        hoursLeft: Math.floor(
            ((dates._6.getTime() - today) % dayTransform) / hourTransform
        ),
    },
];
