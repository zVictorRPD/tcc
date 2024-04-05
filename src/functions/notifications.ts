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
    {
        id: "6",
        title: "Grade curricular",
        description:
            "Agora é possível selecionar o período vigente da grade do seu cruso na hora de criar a grade curricular. Além disso, também é possível excluir a sua grade, para caso você queira começar do zero ou tenha trocado de curso. (Basta acessar no menu superior direito a funciondalidade 'Editar perfil')",
        date: "2023-08-26",
    },
    {
        id: "7",
        title: "Atualização do sistema",
        description: "Foi necessário realocar o banco de dados para outra plataforma, devido isso, pode ser que haja alguns bugs no sistema, caso encontre algum, por favor, entre em contato com o desenvolvedor",
        date: "2024-04-05",
    }
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
