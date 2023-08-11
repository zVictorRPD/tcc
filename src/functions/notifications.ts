const notifications: INotifications[] = [
    {
        id: "1",
        title: "Entre em contato",
        description:
            "Agora você pode entrar em contato com o desenvolvedor do sistema",
        date: "2023-03-18",
    },
    {
        id: "2",
        title: "Modo noturno",
        description: "Agora você pode ativar o modo noturno no menu superior",
        date: "2023-03-26",
    },
    {
        id: "3",
        title: "Calendário acadêmico",
        description:
            "Foi inserido o calendário acadêmico, nele é possível visualizar as datas de início e fim de cada período letivo, além dos dias restantes para a chegada de cada data",
        date: "2023-03-29",
    },
    {
        id: "4",
        title: "Ranking",
        description:
            "Foi inserido o ranking dos cursos, no qual é possível visualizar a posição de cada curso em relação ao número de alunos matriculados",
        date: "2023-06-12",
    },
    {
        id: "5",
        title: "Calendário acadêmico",
        description: "O calendário acadêmico foi atualizado",
        date: "2023-08-11",
    },
];

export const getNotifications = () => {
    const lastNotificationId = localStorage.getItem("lastNotificationRead");
    if (lastNotificationId) {
        return {
            notifications: notifications,
            newNotifications: notifications.filter(
                (notification) =>
                    parseInt(notification.id) > parseInt(lastNotificationId)
            ).length,
        };
    }
    return {
        notifications: notifications,
        newNotifications: notifications.length,
    };
};

export const sawNotifications = (id: string) => {
    localStorage.setItem("lastNotificationRead", id);
};

export const showDisclaimer = () => {
    const show_disclaimer = localStorage.getItem("show_disclaimer");
    if (!show_disclaimer) {
        localStorage.setItem("show_disclaimer", "false");
    }
    return show_disclaimer !== "false";
};
